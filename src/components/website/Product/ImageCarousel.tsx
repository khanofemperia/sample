"use client";

import Image from "next/image";
import { useState } from "react";

type ImageCarouselType = {
  images: string[];
  productName: string;
};

export default function ImageCarousel({ images, productName }: ImageCarouselType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = event.currentTarget.scrollLeft;
    const cardWidth = event.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div
        className="invisible-scrollbar snap-x snap-mandatory w-full max-w-full overflow-x-scroll flex gap-2"
        onScroll={handleScroll}
      >
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
              alt={productName}
              width={1000}
              height={1000}
              priority={true}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center absolute bottom-4 right-5 bg-black/80 text-white px-3 h-8 rounded-full transition duration-300 ease-in-out">
        {currentIndex + 1}/{images.length}
      </div>
    </>
  );
}
