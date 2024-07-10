"use client";

import Image from "next/image";
import { ChevronRightIcon } from "@/icons";
import { useOverlayStore } from "@/zustand/website/overlayStore";
import { useEffect, useState } from "react";

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

function ProductColors({
  colors,
  selectedColor,
  setSelectedColor,
}: ProductColorsType) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        {colors.map(({ name, image }, index) => (
          <div
            onClick={() => setSelectedColor(name)}
            key={index}
            className={`relative w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:before:content-[''] hover:before:h-12 hover:before:w-12 hover:before:absolute hover:before:rounded-[6px] hover:before:border hover:before:border-black ${
              selectedColor === name &&
              "before:content-[''] before:h-12 before:w-12 before:absolute before:rounded-[6px] before:border before:border-custom-blue hover:before:!border-custom-blue"
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
    pageName: state.pages.productDetails.name,
    overlayName: state.pages.productDetails.overlays.sizeChart.name,
  }));

  return (
    <div className="w-full">
      <div className="w-full max-w-[298px] flex flex-wrap gap-[10px]">
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
          onClick={() => {
            showOverlay({ pageName, overlayName });
          }}
          className="w-full py-3 pl-[14px] pr-8 mt-2 rounded-lg relative cursor-pointer bg-lightgray"
        >
          <div>
            {sizeChart.entryLabels.find((label) => label.name === selectedSize)
              ?.index !== undefined &&
              sizeChart.sizes[
                sizeChart.entryLabels.find(
                  (label) => label.name === selectedSize
                )!.index - 1
              ].measurements && (
                <ul className="leading-3 max-w-[calc(100%-20px)] flex flex-row flex-wrap gap-2">
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
                        <span className="text-xs text-gray">{`${column.name}: `}</span>
                        <span className="text-xs font-semibold">
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
            className="absolute top-[50%] -translate-y-1/2 right-[6px] stroke-neutral-400"
            size={22}
          />
        </div>
      )}
    </div>
  );
}

export default function ProductOptions({
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
    name: string;
    price: string;
    images: string[];
    colors: ColorType[] | null;
    sizeChart: SizeChartType | null;
  };
}) {
  const [selectedColor, setSelectedColor] = useState(
    cartInfo.productInCart?.color ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    cartInfo.productInCart?.size ?? ""
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (
        isDropdownVisible &&
        !target.closest(".dropdown-container") &&
        !target.closest(".overlay")
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <>
      <div className="dropdown-container w-max rounded-full relative">
        <button
          onClick={() => setDropdownVisible((prev) => !prev)}
          className="h-8 w-max px-4 rounded-full flex items-center justify-center gap-[2px] ease-in-out duration-300 transition bg-lightgray active:bg-lightgray-dimmed lg:hover:bg-lightgray-dimmed"
        >
          <span className="text-sm font-medium">Select Color & Size</span>
          <ChevronRightIcon className="-mr-[7px]" size={20} />
        </button>
        {isDropdownVisible && (
          <div className="w-max min-w-[238px] max-w-[334px] absolute top-[42px] left-0 p-5 rounded-xl shadow-dropdown bg-white before:content-[''] before:w-[14px] before:h-[14px] before:bg-white before:rounded-tl-[2px] before:rotate-45 before:origin-top-left before:absolute before:-top-[10px] before:border-l before:border-t before:border-[#d9d9d9] before:left-16 min-[840px]:before:right-24">
            <>
              {productInfo.colors &&
                productInfo.colors?.length > 0 &&
                productInfo.sizeChart &&
                productInfo.sizeChart.entryLabels?.length > 0 && (
                  <div className="flex flex-col gap-4 select-none">
                    <ProductColors
                      colors={productInfo.colors}
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                    />
                    <ProductSizeChart
                      sizeChart={productInfo.sizeChart}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                    />
                  </div>
                )}
              {productInfo.colors &&
                productInfo.colors?.length > 0 &&
                !productInfo.sizeChart && (
                  <ProductColors
                    colors={productInfo.colors}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                )}
              {productInfo.colors?.length === 0 &&
                productInfo.sizeChart &&
                productInfo.sizeChart.entryLabels?.length > 0 && (
                  <ProductSizeChart
                    sizeChart={productInfo.sizeChart}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                  />
                )}

              {/*

                  {cartInfo.isInCart || response?.success ? (
                    <ViewCartButton />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleAddToCart}
                        type="button"
                        className={`rounded-full flex items-center justify-center px-3 h-12 min-h-12 w-[320px] relative font-semibold text-white bg-[#484848] ease-in-out hover:duration-300 hover:ease-out hover:bg-black ${
                          isPending ? "cursor-context-menu opacity-50" : ""
                        }`}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <SpinnerWhite size={28} />
                        ) : (
                          `Add to Cart - $${formatThousands(productInfo.price)}`
                        )}
                      </button>
                    </div>
                  )}
                  
                  */}
            </>
          </div>
        )}
      </div>
    </>
  );
}
