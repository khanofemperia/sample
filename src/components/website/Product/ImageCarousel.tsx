"use client";

import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageCarouselType = {
  images: string[];
  productName: string;
};

export default function ImageCarousel({
  images,
  productName,
}: ImageCarouselType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setCurrentIndex(current),
    arrows: false,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`${productName} ${index + 1}`}
              width={1000}
              height={1000}
              priority={true}
            />
          </div>
        ))}
      </Slider>
      <div className="flex items-center justify-center absolute bottom-4 right-5 bg-black/80 text-white px-3 h-8 rounded-full transition duration-300 ease-in-out">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
}
