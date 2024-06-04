"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { capitalizeFirstLetter } from "@/libraries/utils";
import { useState, useEffect } from "react";
import Spinner from "@/ui/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import {
  ArrowLeftIcon,
  ChangeIndexIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
  PlusIcon,
} from "@/icons";
import clsx from "clsx";
import Overlay from "@/ui/Overlay";
import { UpdateCollectionAction } from "@/actions/collections";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

export function ProductListButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editCollection.name,
    overlayName: state.pages.editCollection.overlays.productList.name,
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

export function ProductListOverlay({
  data,
}: {
  data: {
    id: string;
    visibility: string;
  };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editCollection.name,
      overlayName: state.pages.editCollection.overlays.productList.name,
      isOverlayVisible:
        state.pages.editCollection.overlays.productList.isVisible,
    })
  );

  useEffect(() => {
    if (isOverlayVisible || showAlert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      if (!isOverlayVisible && !showAlert) {
        document.body.style.overflow = "visible";
      }
    };
  }, [isOverlayVisible, showAlert]);

  const hideAlertMessage = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const onHideOverlay = () => {
    setLoading(false);
    hideOverlay({ pageName, overlayName });
  };

  const handleSave = async () => {
    setLoading(true);

    // try {
    //   const message = await UpdateCollectionAction({
    //     id: data.id,
    //     visibility: selectedVisibility,
    //   });
    //   setAlertMessage(message);
    //   setShowAlert(true);
    // } catch (error) {
    //   console.error(error);
    //   setAlertMessage("Failed to update collection");
    //   setShowAlert(true);
    // } finally {
    //   setLoading(false);
    //   onHideOverlay();
    // }
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="md:mx-auto md:mt-20 md:mb-[50vh] md:px-5 lg:p-0">
            <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] mx-auto overflow-hidden md:overflow-visible rounded-t-3xl bg-white md:w-full md:max-w-max md:rounded-2xl md:shadow md:h-max md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
              <div className="w-full">
                <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                  <div className="relative flex justify-center items-center w-full h-7">
                    <h2 className="font-semibold text-lg">Products</h2>
                    <button
                      onClick={() => {
                        hideOverlay({ pageName, overlayName });
                      }}
                      type="button"
                      className="w-7 h-7 rounded-full flex items-center justify-center absolute right-4 transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                    >
                      <CloseIcon size={18} />
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:justify-between py-2 pr-4 pl-2">
                  <button
                    onClick={() => {
                      hideOverlay({ pageName, overlayName });
                    }}
                    type="button"
                    className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
                  >
                    <ArrowLeftIcon
                      className="fill-custom-blue -ml-[2px]"
                      size={20}
                    />
                    <span className="font-semibold text-sm text-custom-blue">
                      Products
                    </span>
                  </button>
                </div>
                <div className="w-full h-full mt-[52px] md:mt-0 px-5 pt-5 pb-28 md:pb-10 flex flex-col gap-2 overflow-x-hidden overflow-y-visible invisible-scrollbar md:overflow-hidden">
                  <div className="w-full flex gap-2 items-center justify-between">
                    <div className="flex rounded-full bg-lightgray *:h-9 *:rounded-full *:flex *:items-center *:justify-center *:font-semibold *:text-sm *:ease-in-out *:duration-300 *:transition">
                      <button className="px-3 pl-[14px] h-9 hover:bg-lightgray-dimmed rounded-full text-custom-blue">
                        View all (48)
                      </button>
                      <button className="px-3 h-9 hover:bg-lightgray-dimmed rounded-full text-gray hover:text-black">
                        Published (41)
                      </button>
                      <button className="px-3 pr-[14px] h-9 hover:bg-lightgray-dimmed rounded-full text-gray hover:text-black">
                        Inactive (7)
                      </button>
                    </div>
                    <div className="h-9 rounded-full overflow-hidden flex items-center border shadow-sm">
                      <input
                        type="text"
                        placeholder="Paste ID (#12345)"
                        className="h-full w-40 w-44s pl-4 bg-transparent"
                      />
                      <div className="h-full flex items-center justify-center">
                        <button className="w-11 h-9 rounded-full flex items-center justify-center ease-in-out duration-300 transition active:bg-lightgray lg:hover:bg-lightgray">
                          <PlusIcon size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full py-3 border rounded-xl bg-white">
                    <div className="h-full">
                      <div className="h-full overflow-auto custom-x-scrollbar">
                        <table className="w-full text-sm">
                          <thead className="border-y bg-neutral-100">
                            <tr className="h-10 *:font-semibold *:text-gray">
                              <td className="text-center border-r">#</td>
                              <td className="pl-3 border-r">Poster</td>
                              <td className="pl-3 border-r">Name</td>
                              <td className="pl-3 border-r">Price</td>
                              <td className="pl-3 border-r">Visibility</td>
                              <td className="pl-3"></td>
                            </tr>
                          </thead>
                          <tbody className="*:h-[98px] *:border-b">
                            <tr className="h-[98px]">
                              <td className="w-14 min-w-14 text-center font-medium border-r">
                                1
                              </td>
                              <td className="p-3 w-[120px] min-w-[120px] border-r">
                                <div className="aspect-square w-full overflow-hidden bg-white">
                                  <Image
                                    src="https://i.pinimg.com/736x/e5/93/ed/e593ed7abfc547e9818c303510246ebb.jpg"
                                    alt="Product"
                                    width={216}
                                    height={216}
                                    priority
                                  />
                                </div>
                              </td>
                              <td className="px-3 w-[200px] min-w-[200px] border-r">
                                <p className="line-clamp-3">
                                  Women's Retro Cherry Coke Graphic Tee
                                </p>
                              </td>
                              <td className="px-3 w-[100px] min-w-[100px] border-r">
                                <p>$34.99</p>
                              </td>
                              <td className="px-3 w-[100px] min-w-[100px] border-r">
                                <p className="px-3 rounded-full h-6 w-max flex gap-1 items-center bg-custom-green/10 border border-custom-green/15 text-custom-green">
                                  Published
                                </p>
                              </td>
                              <td className="px-3 w-[200px] min-w-[200px]">
                                <div className="flex items-center justify-center">
                                  <button className="h-9 w-9 rounded-full flex items-center justify-center ease-in-out duration-300 transition active:bg-lightgray">
                                    <EditIcon size={20} />
                                  </button>
                                  <button className="h-9 w-9 rounded-full flex items-center justify-center ease-in-out duration-300 transition active:bg-lightgray">
                                    <ChangeIndexIcon size={18} />
                                  </button>
                                  <button className="h-9 w-9 rounded-full flex items-center justify-center ease-in-out duration-300 transition active:bg-lightgray">
                                    <IoCloseCircleOutline className="stroke-grays" size={24} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
