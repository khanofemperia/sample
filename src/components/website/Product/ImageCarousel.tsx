"use client";

import Image from "next/image";
import { useState } from "react";

type ImageCarouselType = {
  images: string[];
  name: string;
};

export default function ImageCarousel({ images, name }: ImageCarouselType) {
  return (
    <>
      <div className="invisible-scrollbar snap-x snap-mandatory w-full max-w-full overflow-x-scroll flex gap-2">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`
              min-w-[calc(100vw-60px)] max-w-[calc(100vw-60px)] 
              min-[460px]:min-w-[calc(100vw-120px)] min-[460px]:max-w-[calc(100vw-120px)] 
              min-[520px]:min-w-[calc(100vw-180px)] min-[520px]:max-w-[calc(100vw-180px)] 
              min-[580px]:min-w-[calc(100vw-324px)] min-[580px]:max-w-[calc(100vw-324px)] 
              min-[640px]:min-w-[calc(100vw-354px)] min-[640px]:max-w-[calc(100vw-354px)] 
              min-[700px]:min-w-[calc(100vw-384px)] min-[700px]:max-w-[calc(100vw-384px)] 
              min-[760px]:min-w-[calc(100vw-414px)] min-[760px]:max-w-[calc(100vw-414px)] 
              aspect-square snap-always snap-start flex items-center justify-center overflow-hidden
            `}
          >
            <Image
              src={image}
              alt={name}
              width={1000}
              height={1000}
              priority={true}
            />
          </div>
        ))}
      </div>
    </>
  );
}
