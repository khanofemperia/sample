"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";

type ProductImagesType = {
  images: string[];
  name: string;
};

export default function Images({
  images,
  name,
}: ProductImagesType) {
  const [hoveredImage, setHoveredImage] = useState("");

  return (
    <div className="flex w-full">
      <div
        className={`${styles.custom_scrollbar} apply-custom-scrollbar min-w-[56px] max-h-[380px] overflow-x-hidden overflow-y-visible flex flex-col gap-2 mr-4`}
      >
        {images.map((image, index) => (
          <div
            onMouseEnter={() => setHoveredImage(image)}
            key={index}
            className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden"
          >
            <Image
              src={image}
              alt={name}
              width={56}
              height={68}
              priority={true}
            />
            <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
          </div>
        ))}
      </div>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-full max-w-[510px] aspect-square relative flex items-center justify-center bg-lightgray overflow-hidden rounded-[24px] [box-shadow:0px_1.6px_3.6px_rgb(0,_0,_0,_0.4),_0px_0px_2.9px_rgb(0,_0,_0,_0.1)]">
          <Image
            src={hoveredImage || images[0]}
            alt={name}
            width={510}
            height={510}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
