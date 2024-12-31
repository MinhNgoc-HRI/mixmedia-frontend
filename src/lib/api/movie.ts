import { APIs } from "@/lib/api/config";
import { handleError } from "@/lib/api/handleError";
import request from "@/lib/api/request";
import { ApiResponse } from "@/lib/api/types";

export type IGetMovie = {
  page?: number;
  total?: number;
};

export interface OGetMovie {
  status: boolean;
  message: string;
  data: Movie[];
  total_items: number;
  current_page: number;
  total_pages: number;
}

export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  poster_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  created: string;
  modified: string;
  country: Country[];
  category: Category[];
  episodes: Episode[];
}

export interface Country {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Episode {
  server_name: string;
  server_data: ServerData[];
}

export interface ServerData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export const getMovies: (
  body: IGetMovie
) => Promise<ApiResponse<OGetMovie>> = async ({ page = 1, total = 20 }) => {
  try {
    const result = await request().get<ApiResponse<OGetMovie>>(
      `${APIs.GET_NEW_MOVIES}?page=${page}&total=${total}`
    );
    return {
      status: true,
      data: result?.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export type OGetCategories = {
  status: boolean;
  message: string;
  data: Category[];
};

export const getCategories: () => Promise<
  ApiResponse<OGetCategories>
> = async () => {
  try {
    const result = await request().get<ApiResponse<OGetCategories>>(
      `${APIs.GET_CATEGORIES}`
    );
    return {
      status: true,
      data: result?.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export type OGetCoutries = {
  status: boolean;
  message: string;
  data: Country[];
};

export const getCountries: () => Promise<
  ApiResponse<OGetCoutries>
> = async () => {
  try {
    const result = await request().get<ApiResponse<OGetCoutries>>(
      `${APIs.GET_COUNTRIES}`
    );
    return {
      status: true,
      data: result?.data,
    };
  } catch (error) {
    return handleError(error);
  }
};
