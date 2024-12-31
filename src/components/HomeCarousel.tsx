"use client";

import React, { forwardRef, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { OGetMovie } from "@/lib/api/movie";
import Image from "next/image";
import Fade from "embla-carousel-fade";

export type HomeCarouselProps = {
  data: Omit<OGetMovie, "status" | "message">;
};
export type HomeCarouselRef = object;

const HomeCarousel = forwardRef<HomeCarouselRef, HomeCarouselProps>(
  function HomeCarousel(props, _ref) {
    const { data } = props;
    const convertType = useCallback((value?: string) => {
      if (value === "series") {
        return "Phim bộ";
      }
      if (value === "hoathinh") {
        return "Hoạt hình";
      }
      if (value === "single") {
        return "Phim lẻ";
      }
      return "Unknow";
    }, []);
    return (
      <Carousel
        orientation="horizontal"
        opts={{ loop: true, align: "center", containScroll: false }}
        plugins={[
          Autoplay({
            delay: 8000,
          }),
          Fade(),
        ]}
      >
        <CarouselContent className="aspect-video sm:w-full sm:h-[40rem]">
          {data?.data?.map((value, index) => {
            return (
              <CarouselItem key={value?._id + index}>
                <div className="relative flex justify-center flex-wrap">
                  {/* Lớp phủ đen với độ trong suốt */}
                  {/* <div
                    className="absolute inset-0 bg-center bg-cover sm:blur-2xl sm:brightness-50 "
                    style={{
                      backgroundImage: `url(${value?.thumb_url})`,
                    }}
                  /> */}
                  <div className="relative container flex flex-row  px-4 py-8 z-10 pt-40">
                    <div className="flex-col  bg-black/60 sm:bg-transparent rounded-lg sm:rounded-none p-4 sm:p-0">
                      <p className="text-foreground font-bold text-sm bg-main rounded-xl py-2 px-6 w-fit">
                        {convertType(value?.type)}
                      </p>
                      <h1 className="text-foreground font-bold mt-6 text-xl sm:text-5xl">
                        {value?.name}
                      </h1>
                      <p className="text-primary-text font-medium text-sm sm:text-xl mt-6">
                        {value?.content?.slice(0, 300)}
                      </p>
                      <p className="text-primary-text font-medium text-sm sm:text-xl mt-6">
                        {value?.content?.slice(0, 300)}
                      </p>
                      <p className="text-primary-text font-medium text-sm sm:text-xl mt-6">
                        {value?.content?.slice(0, 300)}
                      </p>
                    </div>
                    <div className="flex-1 aspect-video object-cover rounded-xl hidden sm:flex sm:flex-1 relative overflow-hidden">
                      <Image
                        fill
                        src={value?.thumb_url}
                        alt={value?.slug}
                        sizes="100%"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-xl" />
        <CarouselNext className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white text-xl" />
      </Carousel>
    );
  }
);

export default HomeCarousel;
