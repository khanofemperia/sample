"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";
import { capitalizeFirstLetter } from "@/libraries/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const INITIAL_CATEGORY_WIDTH = 110;
const LARGE_SCREEN_CATEGORY_WIDTH = 120;
const GAP_BETWEEN_CATEGORIES = 16;
const MINIMUM_CATEGORIES_FOR_NAVIGATION = 2;
const SCREEN_WIDTH_LARGE = 1024;
const SCREEN_WIDTH_THRESHOLD = 808;
const CATEGORIES_THRESHOLD = 6;
const SLICE_SIZE_INITIAL = 3;
const SLICE_SIZE_MAX = 10;
const WIDTH_THRESHOLD_INITIAL = 398;
const WIDTH_THRESHOLD_INCREMENT = 126;

export default function Categories({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [distance, setDistance] = useState(0);
  const [isPrevButtonHidden, setIsPrevButtonHidden] = useState(true);
  const [isNextButtonHidden, setIsNextButtonHidden] = useState(true);
  const [categoryWidth, setCategoryWidth] = useState(INITIAL_CATEGORY_WIDTH);
  const [shouldTransition, setShouldTransition] = useState(true);

  const carouselRef = useRef(null);

  const resetCarousel = (screenWidth: number) => {
    setShouldTransition(false);

    // Reset distance
    setDistance(0);

    // Reset button visibility
    setIsPrevButtonHidden(true);

    // Determine if next button should be hidden based on categories and screen width
    if (categories.length <= MINIMUM_CATEGORIES_FOR_NAVIGATION) {
      setIsNextButtonHidden(true);
    } else {
      let sliceSize = SLICE_SIZE_INITIAL;
      let widthThreshold = WIDTH_THRESHOLD_INITIAL;

      while (sliceSize <= SLICE_SIZE_MAX) {
        if (
          categories.slice(0, sliceSize).length >= sliceSize &&
          screenWidth < widthThreshold
        ) {
          setIsNextButtonHidden(false);
          break;
        }
        sliceSize++;
        widthThreshold += WIDTH_THRESHOLD_INCREMENT;
      }

      // If we've gone through all slice sizes and haven't set isNextButtonHidden to false
      if (sliceSize > SLICE_SIZE_MAX) {
        setIsNextButtonHidden(true);
      }
    }

    // Reset category width based on screen size
    if (screenWidth >= SCREEN_WIDTH_LARGE) {
      setCategoryWidth(LARGE_SCREEN_CATEGORY_WIDTH);
    } else {
      setCategoryWidth(INITIAL_CATEGORY_WIDTH);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      resetCarousel(screenWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [categories]);

  useEffect(() => {
    const maxDistance =
      (categories.length - 1) * (categoryWidth + GAP_BETWEEN_CATEGORIES);
    const screenWidth = window.innerWidth;
    let totalRemainingDistance = maxDistance;

    if (
      screenWidth >= SCREEN_WIDTH_THRESHOLD &&
      categories.length > CATEGORIES_THRESHOLD
    ) {
      totalRemainingDistance =
        (categories.length - CATEGORIES_THRESHOLD) *
        (categoryWidth + GAP_BETWEEN_CATEGORIES);
      setIsNextButtonHidden(distance <= -totalRemainingDistance);
    } else {
      const visibleWidth =
        categories.length * (categoryWidth + GAP_BETWEEN_CATEGORIES);
      setIsNextButtonHidden(visibleWidth + distance <= screenWidth);
    }

    setIsPrevButtonHidden(distance === 0);
  }, [distance, categories.length, categoryWidth]);

  const handleNext = () => {
    setShouldTransition(true);

    const maxDistance =
      (categories.length - 1) * (categoryWidth + GAP_BETWEEN_CATEGORIES);
    if (distance > -maxDistance) {
      setDistance(distance - (categoryWidth + GAP_BETWEEN_CATEGORIES));
    }
  };

  const handlePrev = () => {
    setShouldTransition(true);

    if (distance < 0) {
      setDistance(distance + (categoryWidth + GAP_BETWEEN_CATEGORIES));
    }
  };

  return (
    <div className="relative mb-10 w-full max-w-[808px] lg:max-w-[808px] mx-auto">
      <div className="overflow-hidden bg-red-300" ref={carouselRef}>
        <div
          style={{ transform: `translateX(${distance}px)` }}
          className={clsx("w-max flex gap-4 p-1 bg-lime-300", {
            "ease-in-out duration-300 transition": shouldTransition,
          })}
        >
          {categories.map(({ index, name, image }) => (
            <Link
              key={index}
              href="#"
              className="first:ml-4 lg:first:ml-0 flex flex-col gap-2 items-center rounded-xl p-[10px] ease-in-out duration-300 transition hover: shadow-[0px_0px_4px_rgba(0,0,0,0.35)]"
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
