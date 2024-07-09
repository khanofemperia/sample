"use client";

import Overlay from "@/ui/Overlay";
import Image from "next/image";
import { ChevronRightIcon, CloseIcon } from "@/icons";
import { useOverlayStore } from "@/zustand/website/overlayStore";
import { productInternationalSizes } from "@/libraries/utils";
import { useAlertStore } from "@/zustand/website/alertStore";
import { useEffect, useState, useTransition } from "react";
import styles from "./styles.module.css";

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
    <div className="w-full md:w-max">
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
  const { showOverlay, hideOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.productDetails.name,
    overlayName: state.pages.productDetails.overlays.sizeChart.name,
  }));

  return (
    <div className="w-full md:w-max">
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
          className="w-full min-w-52 pl-3 pr-8 py-2 mt-2 rounded-lg relative cursor-pointer bg-lightgray"
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
    <div className="border w-full max-w-[max-content] rounded overflow-y-hidden overflow-x-visible custom-x-scrollbar">
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

export function OptionsButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.productDetails.name,
    overlayName: state.pages.productDetails.overlays.options.name,
  }));

  return (
    <button
      onClick={() => showOverlay({ pageName, overlayName })}
      className="h-8 w-max px-4 rounded-full flex items-center justify-center gap-[2px] ease-in-out duration-300 transition bg-lightgray active:bg-lightgray-dimmed lg:hover:bg-lightgray-dimmed"
    >
      <span className="text-sm font-medium">Select Color & Size</span>
      <ChevronRightIcon className="-mr-[7px]" size={20} />
    </button>
  );
}

export default function OptionsOverlay({
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
  const [hoveredImage, setHoveredImage] = useState("");
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
  const { hideOverlay, showOverlay } = useOverlayStore();

  const {
    pageName,
    sizeChartOverlayName,
    isSizeChartOverlayVisible,
    optionsOverlayName,
    isOptionsOverlayVisible,
  } = useOverlayStore((state) => ({
    pageName: state.pages.productDetails.name,
    sizeChartOverlayName: state.pages.productDetails.overlays.sizeChart.name,
    isSizeChartOverlayVisible:
      state.pages.productDetails.overlays.sizeChart.isVisible,
    optionsOverlayName: state.pages.productDetails.overlays.options.name,
    isOptionsOverlayVisible:
      state.pages.productDetails.overlays.options.isVisible,
  }));

  useEffect(() => {
    if (isSizeChartOverlayVisible || isOptionsOverlayVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isSizeChartOverlayVisible, isOptionsOverlayVisible]);

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
      {isOptionsOverlayVisible && (
        <Overlay>
          <div className="w-full h-full relative min-[650px]:px-5 min-[650px]:flex min-[650px]:items-center min-[650px]:justify-center">
            <div className="min-[650px]:hidden w-full h-[calc(100%-120px)] absolute bottom-0 rounded-t-2xl overflow-hidden bg-white">
              <div className="h-full flex flex-col">
                <div className="h-[calc(100%-72px)] w-full flex flex-col">
                  <div className="h-full w-full">
                    <div className="w-full flex items-center justify-end px-5 py-3">
                      <button
                        onClick={() => {
                          hideOverlay({
                            pageName,
                            overlayName: optionsOverlayName,
                          });
                        }}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                      >
                        <CloseIcon size={18} />
                      </button>
                    </div>
                    <div className="w-full">
                      <div className="w-full h-[180px]">
                        <div className="px-5 h-full w-full max-w-full overflow-y-hidden overflow-x-visible invisible-scrollbar">
                          <div className="h-full w-max flex gap-2">
                            <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                            <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                            <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                            <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                            <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-5 py-2 flex flex-col gap-[5px]">
                        <p className="line-clamp-1 text-sm text-gray">
                          High Waisted Running Shorts
                        </p>
                        <span className="font-bold">$49.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-hidden overflow-y-visible invisible-scrollbar">
                    <div className="flex flex-col gap-8 px-5 pt-4 pb-3">
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
                        {isSizeChartOverlayVisible && productInfo.sizeChart && (
                          <Overlay>
                            <div className="w-full h-[calc(100%-60px)] rounded-t-2xl absolute bottom-0 overflow-hidden bg-white">
                              <div className="flex items-center justify-center pt-5 pb-2">
                                <h2 className="font-semibold">
                                  Product measurements
                                </h2>
                                <button
                                  onClick={() => {
                                    hideOverlay({
                                      pageName,
                                      overlayName: sizeChartOverlayName,
                                    });
                                    showOverlay({
                                      pageName,
                                      overlayName: optionsOverlayName,
                                    });
                                  }}
                                  className="h-7 w-7 rounded-full absolute right-5 flex items-center justify-center transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                                  type="button"
                                >
                                  <CloseIcon size={18} />
                                </button>
                              </div>
                              <div className="w-full h-[calc(100%-52px)] px-5 pt-2 pb-[240px] invisible-scrollbar overflow-x-hidden overflow-y-visible">
                                <div className="w-full max-w-[620px] mx-auto flex flex-col gap-6 mt-6">
                                  <div>
                                    <h3 className="font-semibold mb-4">
                                      Inches
                                    </h3>
                                    <SizeChartTable
                                      sizeChart={productInfo.sizeChart}
                                      unit="in"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-4">
                                      Centimeters
                                    </h3>
                                    <SizeChartTable
                                      sizeChart={productInfo.sizeChart}
                                      unit="cm"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-4">
                                      International size conversions
                                    </h3>
                                    <div className="border w-full max-w-[max-content] rounded overflow-y-hidden overflow-x-visible custom-x-scrollbar">
                                      <table className="w-max bg-white">
                                        <thead className="h-10 border-b">
                                          <tr>
                                            {Object.keys(
                                              productInternationalSizes
                                            ).map((sizeType, index) => (
                                              <th
                                                key={index}
                                                className={`px-5 text-nowrap text-sm ${
                                                  index ===
                                                  Object.keys(
                                                    productInternationalSizes
                                                  ).length -
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
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {productInternationalSizes.Size.map(
                                            (_, sizeIndex) => (
                                              <tr
                                                key={sizeIndex}
                                                className={`h-10 ${
                                                  sizeIndex !==
                                                  productInternationalSizes.Size
                                                    .length -
                                                    1
                                                    ? "border-b"
                                                    : ""
                                                }`}
                                              >
                                                {Object.keys(
                                                  productInternationalSizes
                                                ).map((sizeType, index) => (
                                                  <td
                                                    key={index}
                                                    className={`text-center px-5 w-[100px] ${
                                                      index === 0
                                                        ? "sticky left-0 bg-neutral-100 border-r text-sm"
                                                        : index ===
                                                          Object.keys(
                                                            productInternationalSizes
                                                          ).length -
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
                                                ))}
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Overlay>
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
                  </div>
                </div>
                <div className="h-[72px] pt-2 pb-5 px-[6px] min-[350px]:px-2 bg-white">
                  <div className="max-w-[650px] mx-auto flex gap-[6px] min-[350px]:gap-2">
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
            <div className="hidden min-[650px]:block w-full h-[calc(100vh-200px)] rounded-md p-8 bg-white">
              <div className="w-full h-full overflow-x-hidden overflow-y-visible invisible-scrollbar flex gap-5 items-start justify-start relative">
                <div className="sticky top-0 max-w-[650px] flex flex-col gap-16">
                  <div className="flex w-full select-none">
                    <div
                      className={`${styles.custom_scrollbar} apply-custom-scrollbar min-w-[52px] max-w-[52px] max-h-[380px] overflow-x-hidden overflow-y-visible flex flex-col gap-2 mr-2`}
                    >
                      {productInfo.images.map((image, index) => (
                        <div
                          onMouseEnter={() => setHoveredImage(image)}
                          key={index}
                          className="w-[46px] h-[46px] relative min-h-[46px] min-w-[46px] rounded-md flex items-center justify-center overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={productInfo.name}
                            width={56}
                            height={68}
                            priority={true}
                          />
                          <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out duration-200 transition hover:bg-custom-amber/30"></div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full max-w-[580px] h-full flex flex-col gap-5">
                      <div className="w-full aspect-square relative flex items-center justify-center bg-lightgray overflow-hidden rounded-3xl [box-shadow:0px_1.6px_3.6px_rgb(0,_0,_0,_0.4),_0px_0px_2.9px_rgb(0,_0,_0,_0.1)]">
                        <Image
                          src={hoveredImage || productInfo.images[0]}
                          alt={productInfo.name}
                          width={510}
                          height={510}
                          priority={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 min-w-[200px] w-[200px] min-[896px]:min-w-[400px] min-[896px]:w-[400px]">
                  <div>
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-sm text-gray">
                        High Waisted Running Shorts
                      </p>
                      <span className="font-bold">$49.99</span>
                    </div>
                    <div className="flex flex-col gap-8 pt-4 pb-3">
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
                        {isSizeChartOverlayVisible && productInfo.sizeChart && (
                          <Overlay>
                            <div className="w-full h-[calc(100%-60px)] rounded-t-2xl absolute bottom-0 overflow-hidden bg-white">
                              <div className="flex items-center justify-center pt-5 pb-2">
                                <h2 className="font-semibold">
                                  Product measurements
                                </h2>
                                <button
                                  onClick={() => {
                                    hideOverlay({
                                      pageName,
                                      overlayName: sizeChartOverlayName,
                                    });
                                    showOverlay({
                                      pageName,
                                      overlayName: optionsOverlayName,
                                    });
                                  }}
                                  className="h-7 w-7 rounded-full absolute right-5 flex items-center justify-center transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                                  type="button"
                                >
                                  <CloseIcon size={18} />
                                </button>
                              </div>
                              <div className="w-full h-[calc(100%-52px)] px-5 pt-2 pb-[240px] invisible-scrollbar overflow-x-hidden overflow-y-visible">
                                <div className="w-full max-w-[620px] mx-auto flex flex-col gap-6 mt-6">
                                  <div>
                                    <h3 className="font-semibold mb-4">
                                      Inches
                                    </h3>
                                    <SizeChartTable
                                      sizeChart={productInfo.sizeChart}
                                      unit="in"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-4">
                                      Centimeters
                                    </h3>
                                    <SizeChartTable
                                      sizeChart={productInfo.sizeChart}
                                      unit="cm"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-4">
                                      International size conversions
                                    </h3>
                                    <div className="border w-full max-w-[max-content] rounded overflow-y-hidden overflow-x-visible custom-x-scrollbar">
                                      <table className="w-max bg-white">
                                        <thead className="h-10 border-b">
                                          <tr>
                                            {Object.keys(
                                              productInternationalSizes
                                            ).map((sizeType, index) => (
                                              <th
                                                key={index}
                                                className={`px-5 text-nowrap text-sm ${
                                                  index ===
                                                  Object.keys(
                                                    productInternationalSizes
                                                  ).length -
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
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {productInternationalSizes.Size.map(
                                            (_, sizeIndex) => (
                                              <tr
                                                key={sizeIndex}
                                                className={`h-10 ${
                                                  sizeIndex !==
                                                  productInternationalSizes.Size
                                                    .length -
                                                    1
                                                    ? "border-b"
                                                    : ""
                                                }`}
                                              >
                                                {Object.keys(
                                                  productInternationalSizes
                                                ).map((sizeType, index) => (
                                                  <td
                                                    key={index}
                                                    className={`text-center px-5 w-[100px] ${
                                                      index === 0
                                                        ? "sticky left-0 bg-neutral-100 border-r text-sm"
                                                        : index ===
                                                          Object.keys(
                                                            productInternationalSizes
                                                          ).length -
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
                                                ))}
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Overlay>
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
                  </div>
                  <div className="sticky left-0 right-0 bottom-0 z-10 mt-5 pt-1 shadow-[0_-12px_16px_2px_white] bg-white">
                    <div className="flex flex-col gap-2">
                      <button className="font-semibold w-full h-12 min-[896px]:h-12  rounded-full ease-in-out duration-150 transition border border-[rgb(150,150,150)] hover:border-[rgb(80,80,80)] active:border-[rgb(150,150,150)] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.16)]">
                        Add to Cart
                      </button>
                      <button className="inline-block text-center align-middle h-12 min-[896px]:h-12 w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                        Yes, Let's Upgrade
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
}
