"use server";

import { TypeForm } from "@/app/dashbroad/crawl-phim/page";
import { logger } from "@/utils/logger";
import { Movie, Episode } from "@prisma/client";
import axios from "axios";
import pRetry from "async-retry";
import prisma from "@/lib/prisma";

function crawlEndPoint(value: string) {
  if (value === "ophim") {
    return process.env.OPHIM;
  }
  if (value === "kkphim") {
    return process.env.KKPHIM;
  } else {
    return process.env.OPHIM;
  }
}

export async function insertMovie(
  movieData: any,
  episodeData: Episode[]
): Promise<Movie> {
  const rs = await prisma.movie.upsert({
    where: { slug: "" },
    data: {
      tmdb: movieData?.tmdb || {},
      name: movieData?.name || "",
      slug: movieData?.slug || "",
      originName: movieData?.origin_name || "",
      content: movieData?.content || "",
      type: movieData?.type || "",
      status: movieData?.status || "",
      thumbUrl: movieData?.thumb_url || "",
      posterUrl: movieData?.poster_url || "",
      isCopyright: movieData?.is_copyright || false,
      trailerUrl: movieData?.trailer_url || "",
      time: movieData?.time || "",
      episodeCurrent: movieData?.episode_current || "",
      episodeTotal: movieData?.episode_total || "",
      quality: movieData?.quality || "",
      lang: movieData?.lang || "",
      notify: movieData?.notify || "",
      showtimes: movieData?.showtimes || "",
      year: movieData?.year || 0,
      view: movieData?.view || 0,
      actor: movieData?.actor || [],
      director: movieData?.director || [],
      chieurap: movieData?.chieurap || false,
      subDocquyen: movieData?.sub_docquyen || false,
      created: movieData?.created?.time || null,
      modified: movieData?.modified?.time || null,
    },
  });
  if (movieData?.category) {
    const categories = await Promise.all(
      movieData.category.map(async (cat: any) => {
        return prisma.category.upsert({
          where: { slug: cat.slug },
          update: { name: cat.name },
          create: { slug: cat.slug, name: cat.name },
        });
      })
    );

    // Liên kết movie với categories
    await prisma.movie.update({
      where: { slug: movieData.slug },
      data: {
        categories: {
          set: [],
          connect: categories.map((cat) => ({ id: cat.id })),
        },
      },
    });
  }

  // Xử lý quốc gia (countries)
  if (movieData?.country) {
    const countries = await Promise.all(
      movieData.country.map(async (country: any) => {
        return prisma.country.upsert({
          where: { slug: country.slug },
          update: { name: country.name },
          create: { slug: country.slug, name: country.name },
        });
      })
    );
  }

  // Xử lý tập phim (episodes)
  //   if (episodeData) {
  //     await Promise.all(
  //       episodeData.map(async (ep) => {
  //         await prisma.episode.upsert({
  //           where: {
  //             server_name_movieId: {
  //               server_name: ep.server_name,
  //               movieId: movie.id,
  //             },
  //           },
  //           update: {
  //             server_data: ep.server_data || "",
  //           },
  //           create: {
  //             movieId: movie.id,
  //             server_name: ep.server_name || "",
  //             server_data: ep.server_data || "",
  //           },
  //         });
  //       })
  //     );
  //   }

  return null;
}

async function fetchAndSaveMovie(slug: string, source: string) {
  if (!slug) {
    logger.warn(`Không có slug để gọi API.`);
    return; // Không có slug, không thực hiện gì cả
  }

  try {
    const response = await axios.get(`${crawlEndPoint(source)}/phim/${slug}`, {
      timeout: 30000,
    });
    if (response.data?.status === true && response.data?.movie) {
      const movie = response.data.movie;
      const episode = response.data.episodes;
      //   const rs = await this.insertMovie(movie, episode);
      logger.info(`=================================`);
      logger.info(`🚀 Đã lưu thành công phim ${rs.name} vào cơ sở dữ liệu.`);
      logger.info(`=================================`);
    } else {
      logger.info(`=================================`);
      logger.info("🚀 Không có dữ liệu phim để lưu.");
      logger.info(`=================================`);
    }
  } catch (error) {
    logger.error(`=================================`);
    logger.error(`🚀 Lỗi khi gọi API hoặc lưu dữ liệu phim: ${slug}`, error);
    logger.error(`=================================`);
  }
}

async function fetchMovies(
  page: number,
  source: string
): Promise<{
  movies: Movie[];
  pagination: { currentPage: number; totalPages: number };
} | null> {
  try {
    const response = await axios.get(
      `${crawlEndPoint(source)}/danh-sach/phim-moi-cap-nhat?page=${page}`,
      {
        timeout: 30000,
      }
    );

    // Lấy danh sách phim từ response
    const movies = response?.data?.items; // Giả định response.data chứa danh sách phim
    const pagination = {
      currentPage: response?.data?.pagination?.currentPage || 1,
      totalPages: response?.data?.pagination?.totalPages || 1,
    };
    if (movies && Array.isArray(movies)) {
      // Tạo mảng các promise
      const promises = movies?.map((movie) =>
        fetchAndSaveMovie(movie?.slug, source)
      );

      // Chờ tất cả các promise hoàn thành
      await Promise.all(promises);

      logger.info(`Đã lưu thành công ${movies.length} phim vào cơ sở dữ liệu.`);
      return { movies, pagination };
    } else {
      logger.info("Không có phim nào để lưu.");
      return null;
    }
    return {
      movies,
      pagination,
    };
  } catch (error) {
    logger.error("Lỗi khi gọi API để lấy danh sách phim:", error);
    return null;
  }
}

export const crawlPhimAction = async (data: TypeForm) => {
  let success = false;
  // Định nghĩa hàm crawl (fetchMovies) có retry

  try {
    logger.info("Cron job bắt đầu.");
    let currentPage = data.currentPage;
    let totalPages = data.totalPage === 0 ? 1 : data.totalPage;
    await pRetry(
      async () => {
        logger.info(`Lần thử fetchMovies, trang ${currentPage}`);
        do {
          try {
            const result = await fetchMovies(currentPage, data.source);
            if (result && result.pagination) {
              if (data.totalPage === 0) {
                totalPages = result.pagination.totalPages;
              } // Lấy tổng số trang
              currentPage++; // Tăng số trang lên 1
              logger.info(`Lấy thành công trang ${currentPage - 1}`);
            }
          } catch (error) {
            logger.error(`Lỗi khi gọi API: ${error}`);
          }
        } while (currentPage <= totalPages);
      },
      {
        forever: true,
        factor: 2,
        minTimeout: 20000,
        maxTimeout: 80000,
      }
    );

    logger.info("Cron job đã hoàn thành.");
    success = true;
  } catch (error) {
    logger.error("Cron job thất bại sau nhiều lần thử lại:", error);
  }
  if (!success) {
    logger.error("Cron job thất bại sau tất cả các lần thử lại.");
  }
};
