"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { capitalizeFirstLetter } from "@/libraries/utils";
import { useState, useEffect } from "react";
import Spinner from "@/ui/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, ChevronDownIcon, CloseIcon, EditIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/ui/Overlay";
import { UpdateCollectionAction } from "@/actions/collections";

export function VisibilityButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editCollection.name,
    overlayName: state.pages.editCollection.overlays.visibility.name,
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

export function VisibilityOverlay({
  data,
}: {
  data: {
    id: string;
    visibility: string;
  };
}) {
  const DRAFT = "DRAFT";
  const PUBLISHED = "PUBLISHED";
  const HIDDEN = "HIDDEN";

  const [selectedVisibility, setSelectedVisibility] = useState(data.visibility);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editCollection.name,
      overlayName: state.pages.editCollection.overlays.visibility.name,
      isOverlayVisible:
        state.pages.editCollection.overlays.visibility.isVisible,
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

    try {
      const message = await UpdateCollectionAction({
        id: data.id,
        visibility: selectedVisibility,
      });
      setAlertMessage(message);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setAlertMessage("Error updating collection");
      setShowAlert(true);
    } finally {
      setLoading(false);
      onHideOverlay();
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] overflow-hidden md:overflow-visible rounded-t-3xl bg-white md:w-[360px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <div className="w-full">
              <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                <div className="relative flex justify-center items-center w-full h-7">
                  <h2 className="font-semibold text-lg">Visibility</h2>
                  <button
                    onClick={() => {
                      hideOverlay({ pageName, overlayName });
                      setSelectedVisibility(data.visibility.toUpperCase());
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
                    setSelectedVisibility(data.visibility.toUpperCase());
                  }}
                  type="button"
                  className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
                >
                  <ArrowLeftIcon
                    className="fill-custom-blue -ml-[2px]"
                    size={20}
                  />
                  <span className="font-semibold text-sm text-custom-blue">
                    Visibility
                  </span>
                </button>
                <button
                  onClick={handleSave}
                  type="button"
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
              <div className="w-max mx-auto mt-[52px] md:mt-0 p-5">
                <div className="w-44 flex flex-col rounded-xl border overflow-hidden">
                  <div className="p-2">
                    <button
                      onClick={() => setSelectedVisibility(DRAFT)}
                      className={clsx(
                        "h-9 w-full px-4 rounded-md flex items-center justify-between ease-out duration-300 transition active:bg-lightgray lg:hover:bg-lightgray",
                        { "bg-lightgray": selectedVisibility === DRAFT }
                      )}
                    >
                      <span>Draft</span>
                      <div
                        className={clsx(
                          "w-5 h-5 rounded-full bg-white",
                          { border: selectedVisibility !== DRAFT },
                          {
                            "border-4 border-custom-blue":
                              selectedVisibility === DRAFT,
                          }
                        )}
                      ></div>
                    </button>
                  </div>
                  <div className="border-t p-2">
                    <button
                      onClick={() => setSelectedVisibility(PUBLISHED)}
                      className={clsx(
                        "h-9 w-full px-4 rounded-md flex items-center justify-between ease-out duration-300 transition active:bg-lightgray lg:hover:bg-lightgray",
                        { "bg-lightgray": selectedVisibility === PUBLISHED }
                      )}
                    >
                      <span>Published</span>
                      <div
                        className={clsx(
                          "w-5 h-5 rounded-full bg-white",
                          { border: selectedVisibility !== PUBLISHED },
                          {
                            "border-4 border-custom-blue":
                              selectedVisibility === PUBLISHED,
                          }
                        )}
                      ></div>
                    </button>
                  </div>
                  <div className="border-t p-2">
                    <button
                      onClick={() => setSelectedVisibility(HIDDEN)}
                      className={clsx(
                        "h-9 w-full px-4 rounded-md flex items-center justify-between ease-out duration-300 transition active:bg-lightgray lg:hover:bg-lightgray",
                        { "bg-lightgray": selectedVisibility === HIDDEN }
                      )}
                    >
                      <span>Hidden</span>
                      <div
                        className={clsx(
                          "w-5 h-5 rounded-full bg-white",
                          { border: selectedVisibility !== HIDDEN },
                          {
                            "border-4 border-custom-blue":
                              selectedVisibility === HIDDEN,
                          }
                        )}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden w-full pb-5 pt-2 px-5 absolute bottom-0">
              <button
                onClick={handleSave}
                type="button"
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
