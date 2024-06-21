"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";
import { capitalizeFirstLetter } from "@/libraries/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categories({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [distance, setDistance] = useState(0);
  const [isPrevButtonHidden, setIsPrevButtonHidden] = useState(true);
  const [isNextButtonHidden, setIsNextButtonHidden] = useState(false);
  const [maxCategoriesShown, setMaxCategoriesShown] = useState(2);
  const [categoryWidth, setCategoryWidth] = useState(110);

  const gapBetweenCategories = 16;

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setCategoryWidth(120);
      }

      if (screenWidth >= 900) {
        setMaxCategoriesShown(7);
      } else if (screenWidth >= 774) {
        setMaxCategoriesShown(6);
      } else if (screenWidth >= 648) {
        setMaxCategoriesShown(5);
      } else if (screenWidth >= 522) {
        setMaxCategoriesShown(4);
      } else if (screenWidth >= 396) {
        setMaxCategoriesShown(3);
      } else {
        setMaxCategoriesShown(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsPrevButtonHidden(distance === 0);

    const maxDistance =
      (categories.length - maxCategoriesShown) *
      (categoryWidth + gapBetweenCategories);
    setIsNextButtonHidden(distance <= -maxDistance);
  }, [distance, categories.length, maxCategoriesShown]);

  const handleNext = () => {
    const maxDistance =
      (categories.length - maxCategoriesShown) *
      (categoryWidth + gapBetweenCategories);
    if (distance > -maxDistance) {
      setDistance(distance - (categoryWidth + gapBetweenCategories));
    }
  };

  const handlePrev = () => {
    if (distance < 0) {
      setDistance(
        Math.min(0, distance + (categoryWidth + gapBetweenCategories))
      );
    }
  };

  return (
    <div className="relative mb-10 w-full max-w-[888px] lg:max-w-[942px] mx-auto">
      <div className="overflow-hidden">
        <div
          style={{ transform: `translateX(${distance}px)` }}
          className="w-max flex gap-4 p-1 transition duration-500 ease-in-out"
        >
          {categories
            .filter((category) => category.visibility === "PUBLISHED")
            .map(({ index, name, image }) => (
              <Link
                key={index}
                href="#"
                className="first:ml-4 lg:first:ml-0 flex flex-col gap-2 items-center rounded-xl p-[10px] ease-in-out duration-300 transition hover:shadow-[0px_0px_4px_rgba(0,0,0,0.35)]"
              >
                <div className="lg:hidden w-[90px] h-[90px] rounded-full shadow-[rgba(0,0,0,0.2)_0px_1px_3px_0px,_rgba(27,31,35,0.15)_0px_0px_0px_1px]">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center z-10">
                    <Image
                      src={`/images/categories/${image}`}
                      alt={name}
                      width={90}
                      height={90}
                      priority={true}
                    />
                  </div>
                </div>
                <div className="hidden lg:block w-[100px] h-[100px] rounded-full shadow-[rgba(0,0,0,0.2)_0px_1px_3px_0px,_rgba(27,31,35,0.15)_0px_0px_0px_1px]">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center z-10">
                    <Image
                      src={`/images/categories/${image}`}
                      alt={name}
                      width={100}
                      height={100}
                      priority={true}
                    />
                  </div>
                </div>
                <div className="text-xs font-medium">
                  {capitalizeFirstLetter(name)}
                </div>
              </Link>
            ))}
        </div>
      </div>
      {!isPrevButtonHidden && (
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full absolute left-4 lg:-left-3 top-[44px] bg-neutral-800 bg-opacity-75 flex items-center justify-center transition duration-300 ease-in-out active:bg-opacity-100 lg:hover:bg-opacity-100"
        >
          <ChevronLeftIcon className="stroke-white mr-[2px]" size={22} />
        </button>
      )}
      {!isNextButtonHidden && (
        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full absolute right-4 lg:-right-3 top-[44px] bg-neutral-800 bg-opacity-75 flex items-center justify-center transition duration-300 ease-in-out active:bg-opacity-100 lg:hover:bg-opacity-100"
        >
          <ChevronRightIcon className="stroke-white ml-[2px]" size={22} />
        </button>
      )}
    </div>
  );
}
