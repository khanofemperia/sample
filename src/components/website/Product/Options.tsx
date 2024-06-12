"use client";

import Image from "next/image";
import {  ChevronRightIcon, CloseIcon } from "@/icons";
import { useOverlayStore } from "@/zustand/website/overlayStore";
import { productInternationalSizes } from "@/libraries/utils";
// import { AddToCartAction } from "@/actions/add-to-cart";
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
    price: string;
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
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<
    { success: boolean; message: string } | undefined
  >(undefined);

  const { showAlert } = useAlertStore();
  const { hideOverlay } = useOverlayStore();

  const { pageName, overlayName, isOverlayVisible } = useOverlayStore(
    (state) => ({
      pageName: state.pages.post.name,
      overlayName: state.pages.post.overlays.productSizeChart.name,
      isOverlayVisible: state.pages.post.overlays.productSizeChart.isVisible,
    })
  );

  useEffect(() => {
    if (isOverlayVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOverlayVisible]);

  const handleAddToCart = async () => {
    // if (!selectedColor || !selectedSize) {
    //   return showAlert(!selectedColor ? "Select a color" : "Select a size");
    // }
    // startTransition(async () => {
    //   const result = await AddToCartAction({
    //     id: productInfo.id,
    //     color: selectedColor,
    //     size: selectedSize,
    //   });
    //   setResponse(result);
    // });
  };

  useEffect(() => {
    if (response) {
      if (response.success === false) {
        showAlert("Error, refresh and try again");
      } else {
        console.log(cartInfo.isInCart);
        console.log(response.success);
        showAlert(response.message);
      }
    }
  }, [response]);

  return (
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
      {isOverlayVisible && productInfo.sizeChart && (
        <div className="custom-scrollbar overflow-x-hidden overflow-y-visible w-screen h-screen z-20 fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-black/60">
          <div className="w-full h-[calc(100%-60px)] rounded-t-2xl absolute bottom-0 overflow-hidden bg-white">
            <div className="flex items-center justify-center pt-5 pb-2">
              <h2 className="font-semibold">Product measurements</h2>
              <button
                onClick={() => hideOverlay({ pageName, overlayName })}
                className="h-7 w-7 rounded-full absolute right-5 flex items-center justify-center transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                type="button"
              >
                <CloseIcon size={18} />
              </button>
            </div>
            <div className="w-full h-[calc(100%-52px)] px-5 pt-2 pb-[240px] invisible-scrollbar overflow-x-hidden overflow-y-visible">
              <p className="text-sm text-gray max-w-[300px] w-full mx-auto text-center">
                Look for words like 'fitted,' 'loose,' and 'baggy' in the
                product description to better understand how the style will fit
                you.
              </p>
              <div className="flex flex-col gap-6 mt-6">
                <div>
                  <h3 className="font-semibold mb-4">Inches</h3>
                  <SizeChartTable sizeChart={productInfo.sizeChart} unit="in" />
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Centimeters</h3>
                  <SizeChartTable sizeChart={productInfo.sizeChart} unit="cm" />
                </div>
                <div>
                  <h3 className="font-semibold mb-4">
                    International size conversions
                  </h3>
                  <div className="border w-full rounded overflow-y-hidden overflow-x-visible invisible-scrollbar">
                    <table className="w-max bg-white">
                      <thead className="h-10 border-b">
                        <tr>
                          {Object.keys(productInternationalSizes).map(
                            (sizeType, index) => (
                              <th
                                key={index}
                                className={`px-5 text-nowrap text-sm ${
                                  index ===
                                  Object.keys(productInternationalSizes)
                                    .length -
                                    1
                                    ? ""
                                    : "border-r"
                                } ${
                                  index === 0
                                    ? "sticky left-0 bg-neutral-100"
                                    : ""
                                }`}
                              >
                                {sizeType}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {productInternationalSizes.Size.map((_, sizeIndex) => (
                          <tr
                            key={sizeIndex}
                            className={`h-10 ${
                              sizeIndex !==
                              productInternationalSizes.Size.length - 1
                                ? "border-b"
                                : ""
                            }`}
                          >
                            {Object.keys(productInternationalSizes).map(
                              (sizeType, index) => (
                                <td
                                  key={index}
                                  className={`text-center px-5 w-[100px] ${
                                    index === 0
                                      ? "sticky left-0 bg-neutral-100 border-r text-sm"
                                      : index ===
                                        Object.keys(productInternationalSizes)
                                          .length -
                                          1
                                      ? ""
                                      : "border-r"
                                  }`}
                                >
                                  {
                                    (
                                      productInternationalSizes as Record<
                                        string,
                                        string[]
                                      >
                                    )[sizeType][sizeIndex]
                                  }
                                </td>
                              )
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  );
}
