"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { capitalizeFirstLetter, isValidRemoteImage } from "@/libraries/utils";
import { FormEvent, useState, useEffect, useRef } from "react";
import Spinner from "@/elements/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
  MinusIcon,
} from "@/icons";
import clsx from "clsx";
import Image from "next/image";
import Overlay from "@/elements/Overlay";
import { HiOutlinePlus } from "react-icons/hi2";

type DataType = {
  category: string;
  name: string;
  slug: string;
  price: string;
  images: string[] | null;
};

export function ImagesButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editProduct.name,
    overlayName: state.pages.editProduct.overlays.images.name,
  }));

  return (
    <button
      onClick={() => showOverlay({ pageName, overlayName })}
      type="button"
      className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray lg:hover:bg-lightgray"
    >
      <EditIcon size={20} />
    </button>
  );
}

export function ImagesOverlay({ data }: { data: DataType }) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [images, setImages] = useState(data?.images ?? []);

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editProduct.name,
      overlayName: state.pages.editProduct.overlays.images.name,
      isOverlayVisible: state.pages.editProduct.overlays.images.isVisible,
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

  const onHideOverlay = () => {
    setLoading(false);
    hideOverlay({ pageName, overlayName });
    setImages(data?.images ?? []);
  };

  const hideAlertMessage = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const addImage = () => {
    const newEmptyImageBox = "";
    const updatedImages = [...images, newEmptyImageBox];
    setImages(updatedImages);
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    const updatedImageList = [...images];
    updatedImageList[index] = value;

    setImages(updatedImageList);
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] rounded-t-3xl overflow-hidden bg-white md:w-[500px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <div className="w-full h-[calc(100vh-188px)] md:h-auto">
              <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                <div className="relative flex justify-center items-center w-full h-7">
                  <h2 className="font-semibold text-lg">Images</h2>
                  <button
                    onClick={onHideOverlay}
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center absolute right-4 transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                  >
                    <CloseIcon size={18} />
                  </button>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:justify-between py-2 pr-4 pl-2">
                <button
                  onClick={onHideOverlay}
                  type="button"
                  className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
                >
                  <ArrowLeftIcon className="fill-custom-blue" size={18} />
                  <span className="font-semibold text-sm text-custom-blue">
                    Images
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={clsx(
                    "relative h-9 w-max px-4 rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-custom-blue",
                    {
                      "bg-opacity-50": loading,
                      "active:bg-custom-blue-dimmed": !loading,
                    }
                  )}
                >
                  {loading ? (
                    <div className="flex gap-1 items-center justify-center w-full h-full">
                      <Spinner />
                      <span className="text-white">Saving</span>
                    </div>
                  ) : (
                    <span className="text-white">Save</span>
                  )}
                </button>
              </div>
              <div className="w-full h-full mt-[52px] md:mt-0 p-5 pb-28 md:pb-10 flex flex-wrap gap-2 overflow-x-hidden overflow-y-visible invisible-scrollbar md:overflow-hidden">
                <button
                  onClick={addImage}
                  type="button"
                  className="transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed h-max w-[calc(50%-4px)] min-[425px]:w-[calc(33.333333%-6px)] rounded-md overflow-hidden"
                >
                  <div className="w-full aspect-square pt-9 flex flex-col items-center justify-center">
                    <HiOutlinePlus size={40} />
                  </div>
                  <div className="w-full h-9"></div>
                </button>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="h-max w-[calc(50%-4px)] min-[425px]:w-[calc(33.333333%-6px)] border rounded-md overflow-hidden"
                  >
                    <div className="w-full aspect-square relative overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        {image && isValidRemoteImage(image) && (
                          <Image
                            src={image} // https://i.pinimg.com/564x/71/5c/35/715c35df0db25fdee482c48e6aa797aa.jpg
                            alt=""
                            width={400}
                            height={400}
                            priority
                          />
                        )}
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="h-8 w-8 rounded-full flex items-center justify-center absolute top-2 right-2 transition duration-300 ease-in-out backdrop-blur border border-custom-red bg-custom-red/70 active:bg-custom-red"
                      >
                        <MinusIcon className="fill-white" size={20} />
                      </button>
                    </div>
                    <div className="w-full h-9 border-t">
                      <input
                        type="text"
                        className="w-full h-full px-3 text-gray"
                        placeholder="Image URL"
                        value={images[index] || ""}
                        onChange={(event) =>
                          handleImageInputChange(event, index)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:hidden w-full pb-5 pt-2 px-5 absolute bottom-0">
              <button
                type="submit"
                disabled={loading}
                className={clsx(
                  "relative h-12 w-full rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-custom-blue",
                  {
                    "bg-opacity-50": loading,
                    "active:bg-custom-blue-dimmed": !loading,
                  }
                )}
              >
                {loading ? (
                  <div className="flex gap-1 items-center justify-center w-full h-full">
                    <Spinner />
                    <span className="text-white">Saving</span>
                  </div>
                ) : (
                  <span className="text-white">Save</span>
                )}
              </button>
            </div>
          </div>
        </Overlay>
      )}
      {showAlert && (
        <AlertMessage
          message={alertMessage}
          hideAlertMessage={hideAlertMessage}
        />
      )}
    </>
  );
}
