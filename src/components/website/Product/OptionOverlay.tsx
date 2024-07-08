"use client";

import Overlay from "@/ui/Overlay";
import Image from "next/image";
import { ChevronRightIcon, CloseIcon } from "@/icons";
import { useOverlayStore } from "@/zustand/website/overlayStore";
import { productInternationalSizes } from "@/libraries/utils";
import { useAlertStore } from "@/zustand/website/alertStore";
import { useEffect, useState, useTransition } from "react";

type ColorType = {
  name: string;
  image: string;
};

type ProductColorsType = {
  colors: ColorType[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

type ProductSizeChartType = {
  sizeChart: SizeChartType;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

type SizeChartTableType = {
  sizeChart: SizeChartType;
  unit: "in" | "cm";
};

function ProductColors({
  colors,
  selectedColor,
  setSelectedColor,
}: ProductColorsType) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {colors.map(({ name, image }, index) => (
          <div
            onClick={() => setSelectedColor(name)}
            key={index}
            className={`relative w-[40px] h-[40px] flex items-center justify-center ${
              selectedColor === name &&
              "before:content-[''] before:h-12 before:w-12 before:absolute before:rounded-[6px] before:border before:border-custom-blue"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-lightgray border rounded">
              <Image src={image} alt={name} width={40} height={40} priority />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductSizeChart({
  sizeChart,
  selectedSize,
  setSelectedSize,
}: ProductSizeChartType) {
  const { showOverlay } = useOverlayStore();
  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.post.name,
    overlayName: state.pages.post.overlays.productSizeChart.name,
    isOverlayVisible: state.pages.post.overlays.productSizeChart.isVisible,
  }));

  return (
    <div>
      <div className="w-[285px] flex flex-wrap gap-[5px]">
        {sizeChart.entryLabels.map((size, index) => (
          <div key={index} className="relative cursor-pointer">
            <div
              onClick={() => setSelectedSize(size.name)}
              className={`font-medium border rounded-full relative px-4 h-7 flex items-center justify-center hover:border-black ${
                selectedSize === size.name &&
                "border-white hover:border-white before:border before:border-custom-blue before:content-[''] before:h-8 before:w-[calc(100%_+_8px)] before:absolute before:rounded-full"
              }`}
            >
              {size.name}
            </div>
          </div>
        ))}
      </div>
      {selectedSize && (
        <div
          onClick={() => showOverlay({ pageName, overlayName })}
          className="bg-lightgray pl-3 pr-8 py-2 mt-2 rounded-lg relative cursor-pointer"
        >
          <div>
            {sizeChart.entryLabels.find((label) => label.name === selectedSize)
              ?.index !== undefined &&
              sizeChart.sizes[
                sizeChart.entryLabels.find(
                  (label) => label.name === selectedSize
                )!.index - 1
              ].measurements && (
                <ul className="text-sm max-w-[300px] flex flex-col gap-1">
                  {sizeChart.columns
                    .filter(
                      (column) =>
                        // Exclude "Size" column and specified measurements
                        column.name !== "Size" &&
                        !["US", "EU", "UK", "NZ", "AU", "DE"].includes(
                          column.name
                        )
                    )
                    .sort((a, b) => a.index - b.index)
                    .map((column) => (
                      <li key={column.name} className="text-nowrap">
                        <span className="text-sm text-gray">{`${column.name}: `}</span>
                        <span className="text-sm font-semibold">
                          {`${
                            sizeChart.sizes[
                              sizeChart.entryLabels.find(
                                (label) => label.name === selectedSize
                              )!.index - 1
                            ].measurements[column.name]?.in
                          }in`}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
          </div>
          <ChevronRightIcon
            className="absolute top-[7px] right-[4px] stroke-neutral-400"
            size={22}
          />
        </div>
      )}
    </div>
  );
}

function SizeChartTable({ sizeChart, unit }: SizeChartTableType) {
  return (
    <div className="border w-full rounded overflow-y-hidden overflow-x-visible invisible-scrollbar">
      <table className="w-max bg-white">
        <thead className="h-10 border-b">
          <tr>
            {sizeChart.columns.map((column, index) => (
              <th
                key={index}
                className={`px-5 text-nowrap text-sm ${
                  index === sizeChart.columns.length - 1 ? "" : "border-r"
                } ${index === 0 ? "sticky left-0 bg-neutral-100" : ""}`}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeChart.sizes.map((entry, entryIndex) => (
            <tr
              key={entryIndex}
              className={`h-10 ${
                entryIndex === sizeChart.sizes.length - 1 ? "" : "border-b"
              }`}
            >
              <td className="text-sm text-center border-r w-[100px] sticky left-0 bg-neutral-100">
                {entry.size}
              </td>
              {sizeChart.columns.slice(1).map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className={`text-center w-[100px] ${
                    columnIndex === sizeChart.columns.length - 2
                      ? ""
                      : "border-r"
                  }`}
                >
                  {unit === "in"
                    ? entry.measurements[
                        column.name as keyof typeof entry.measurements
                      ]?.in
                    : entry.measurements[
                        column.name as keyof typeof entry.measurements
                      ]?.cm}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function OptionOverlay({
  cartInfo,
  productInfo,
}: {
  cartInfo: {
    isInCart: boolean;
    productInCart: {
      id: string;
      color: string;
      size: string;
    } | null;
  };
  productInfo: {
    id: string;
    price: string;
    colors: ColorType[] | null;
    sizeChart: SizeChartType | null;
  };
}) {
  return (
    <Overlay>
      <div className="w-full h-full relative">
        <div className="w-full h-[calc(100%-140px)] absolute bottom-0 rounded-t-2xl overflow-hidden bg-white">
          <div className="h-full flex flex-col">
            <div className="h-[calc(100%-72px)] w-full flex flex-col">
              <div className="h-full w-full">
                <div className="w-full flex items-center justify-end px-2 py-1">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center ease-in-out duration-300 transition active:bg-lightgray">
                    <CloseIcon size={22} />
                  </button>
                </div>
                <div className="w-full">
                  <div className="w-full h-[180px]">
                    <div className="h-full w-full max-w-full overflow-y-hidden overflow-x-visible invisible-scrollbar px-4">
                      <div className="h-full w-max flex gap-2">
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 pt-2 flex flex-col gap-1">
                    <p className="line-clamp-1 text-sm text-gray">
                      High Waisted Running Shorts
                    </p>
                    <span className="font-bold">$49.99</span>
                  </div>
                </div>
              </div>
              <div className="h-full w-full overflow-x-hidden overflow-y-visible invisible-scrollbar">
                {/* <div className="flex flex-col gap-8">
                  <ProductOptions
                    cartInfo={{
                      isInCart,
                      productInCart,
                    }}
                    productInfo={{
                      id,
                      price,
                      colors,
                      sizeChart: sizes,
                    }}
                  />
                </div> */}
              </div>
            </div>
            <div className="h-[72px] pt-2 pb-5 px-[6px] min-[350px]:px-2 bg-white">
              <div className="max-w-[580px] mx-auto flex gap-[6px] min-[350px]:gap-2">
                <button className="leading-5 text-[13px] min-[340px]:text-sm font-semibold w-full h-[44px] rounded-full ease-in-out duration-150 transition border border-[rgb(150,150,150)] hover:border-[rgb(80,80,80)] active:border-[rgb(150,150,150)] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.16)]">
                  Add to Cart
                </button>
                <button className="leading-5 text-[13px] min-[340px]:text-sm inline-block text-center align-middle h-[44px] w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                  Yes, Let's Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
