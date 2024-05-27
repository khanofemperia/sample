"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { capitalizeFirstLetter } from "@/libraries/utils";
import { useState, useEffect } from "react";
import Spinner from "@/ui/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, ChevronDownIcon, CloseIcon, EditIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/ui/Overlay";
import UpdateProductAction from "@/actions/update-product";

type DataType = {
  id: string;
  status: string;
  visibility: string;
};

export function SettingsButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editProduct.name,
    overlayName: state.pages.editProduct.overlays.settings.name,
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

export function SettingsOverlay({ data }: { data: DataType }) {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isVisibilityDropdownOpen, setIsVisibilityDropdownOpen] =
    useState(false);
  const [selectedStatus, setSelectedStatus] = useState(data.status);
  const [selectedVisibility, setSelectedVisibility] = useState(data.visibility);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editProduct.name,
      overlayName: state.pages.editProduct.overlays.settings.name,
      isOverlayVisible: state.pages.editProduct.overlays.settings.isVisible,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (isStatusDropdownOpen && !target.closest(".status")) {
        setIsStatusDropdownOpen(false);
      }

      if (isVisibilityDropdownOpen && !target.closest(".visibility")) {
        setIsVisibilityDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isStatusDropdownOpen, isVisibilityDropdownOpen]);

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
      const message = await UpdateProductAction({
        id: data.id,
        status: selectedStatus,
        visibility: selectedVisibility,
      });
      setAlertMessage(message);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setAlertMessage("Failed to update product");
      setShowAlert(true);
    } finally {
      setLoading(false);
      onHideOverlay();
    }
  };

  const toggleStatusDropdown = () => {
    setIsVisibilityDropdownOpen(false);
    setIsStatusDropdownOpen((prevState) => !prevState);
  };

  const toggleVisibilityDropdown = () => {
    setIsStatusDropdownOpen(false);
    setIsVisibilityDropdownOpen((prevState) => !prevState);
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsStatusDropdownOpen(false);
  };

  const handleVisibilitySelect = (visibility: string) => {
    setSelectedVisibility(visibility);
    setIsVisibilityDropdownOpen(false);
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] overflow-hidden md:overflow-visible rounded-t-3xl bg-white md:w-[500px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <div className="w-full">
              <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                <div className="relative flex justify-center items-center w-full h-7">
                  <h2 className="font-semibold text-lg">Settings</h2>
                  <button
                    onClick={() => {
                      hideOverlay({ pageName, overlayName });
                      setSelectedStatus(data.status);
                      setSelectedVisibility(data.visibility);
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
                    setSelectedStatus(data.status);
                    setSelectedVisibility(data.visibility);
                  }}
                  type="button"
                  className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
                >
                  <ArrowLeftIcon className="fill-custom-blue" size={18} />
                  <span className="font-semibold text-sm text-custom-blue">
                    Settings
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
              <div className="w-full max-w-[425px] mx-auto h-full mt-[52px] md:m-0 p-5 pb-28 md:pb-10 flex flex-col md:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-sm">Status</h2>
                  <div className="status w-full md:w-max h-9 relative">
                    <button
                      onClick={toggleStatusDropdown}
                      type="button"
                      className="h-9 w-full md:w-max px-3 md:px-4 rounded-md md:rounded-full flex md:gap-2 items-center justify-between transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                    >
                      <span>{capitalizeFirstLetter(selectedStatus)}</span>
                      <ChevronDownIcon
                        className="-mr-[4px] stroke-gray"
                        size={20}
                      />
                    </button>
                    <div
                      className={clsx("w-full md:w-36 absolute top-10 z-10", {
                        hidden: !isStatusDropdownOpen,
                        block: isStatusDropdownOpen,
                      })}
                    >
                      <div className="overflow-hidden h-full max-h-[228px] overflow-x-hidden overflow-y-visible custom-scrollbar w-full py-[6px] flex flex-col gap-0 rounded-md shadow-dropdown bg-white">
                        <div
                          onClick={() => handleStatusSelect("Draft")}
                          className="w-full min-h-9 h-9 flex items-center px-[12px] cursor-context-menu transition duration-300 ease-in-out hover:bg-lightgray"
                        >
                          Draft
                        </div>
                        <div
                          onClick={() => handleStatusSelect("Published")}
                          className="w-full min-h-9 h-9 flex items-center px-[12px] cursor-context-menu transition duration-300 ease-in-out hover:bg-lightgray"
                        >
                          Published
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-sm">Visibility</h2>
                  <div className="visibility w-full md:w-max h-9 relative">
                    <button
                      onClick={toggleVisibilityDropdown}
                      type="button"
                      className="h-9 w-full md:w-max px-3 md:px-4 rounded-md md:rounded-full flex md:gap-2 items-center justify-between transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                    >
                      <span>{capitalizeFirstLetter(selectedVisibility)}</span>
                      <ChevronDownIcon
                        className="-mr-[4px] stroke-gray"
                        size={20}
                      />
                    </button>
                    <div
                      className={clsx("w-full md:w-36 absolute top-10 z-10", {
                        hidden: !isVisibilityDropdownOpen,
                        block: isVisibilityDropdownOpen,
                      })}
                    >
                      <div className="overflow-hidden h-full max-h-[228px] overflow-x-hidden overflow-y-visible custom-scrollbar w-full py-[6px] flex flex-col gap-0 rounded-md shadow-dropdown bg-white">
                        <div
                          onClick={() => handleVisibilitySelect("Hidden")}
                          className="w-full min-h-9 h-9 flex items-center px-[12px] cursor-context-menu transition duration-300 ease-in-out hover:bg-lightgray"
                        >
                          Hidden
                        </div>
                        <div
                          onClick={() => handleVisibilitySelect("Visible")}
                          className="w-full min-h-9 h-9 flex items-center px-[12px] cursor-context-menu transition duration-300 ease-in-out hover:bg-lightgray"
                        >
                          Visible
                        </div>
                      </div>
                    </div>
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
