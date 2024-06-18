"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { useState, useEffect } from "react";
import Spinner from "@/ui/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, CloseIcon, EditIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/ui/Overlay";
import { UpdateCollectionAction } from "@/actions/collections";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { isValidRemoteImage } from "@/libraries/utils";

export function BasicDetailsButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editCollection.name,
    overlayName: state.pages.editCollection.overlays.basicDetails.name,
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

export function BasicDetailsOverlay({
  data,
}: {
  data: {
    id: string;
    title: string;
    slug: string;
    image: string;
    collectionType: string;
  };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessageType, setAlertMessageType] = useState<AlertMessageType>(
    AlertMessageType.NEUTRAL
  );
  const [title, setTitle] = useState<string>(data.title);
  const [slug, setSlug] = useState<string>(data.slug);
  const [bannerImage, setBannerImage] = useState<string>(data.image);

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editCollection.name,
      overlayName: state.pages.editCollection.overlays.basicDetails.name,
      isOverlayVisible:
        state.pages.editCollection.overlays.basicDetails.isVisible,
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
    setAlertMessageType(AlertMessageType.NEUTRAL);
  };

  const onHideOverlay = () => {
    setLoading(false);
    hideOverlay({ pageName, overlayName });
    setTitle(data.title);
    setSlug(data.slug);
  };

  const handleSave = async () => {
    if (data.collectionType === "BANNER" && !bannerImage) {
      setAlertMessageType(AlertMessageType.ERROR);
      setAlertMessage("Provide banner image");
      setShowAlert(true);
    } else {
      setLoading(true);
      try {
        const result = await UpdateCollectionAction({
          id: data.id,
          title,
          slug,
          ...(bannerImage && { image: bannerImage }),
        });
        setAlertMessageType(result.type);
        setAlertMessage(result.message);
        setShowAlert(true);
      } catch (error) {
        console.error("Error updating collection:", error);
        setAlertMessageType(AlertMessageType.ERROR);
        setAlertMessage("Failed to update collection");
        setShowAlert(true);
      } finally {
        setLoading(false);
        onHideOverlay();
      }
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] rounded-t-3xl bg-white md:w-[500px] md:rounded-2xl md:shadow-lg md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <div className="w-full h-[calc(100vh-188px)] md:h-auto">
              <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                <div className="relative flex justify-center items-center w-full h-7">
                  <h2 className="font-semibold text-lg">Basic details</h2>
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
                  <ArrowLeftIcon
                    className="fill-custom-blue -ml-[2px]"
                    size={20}
                  />
                  <span className="font-semibold text-sm text-custom-blue">
                    Basic details
                  </span>
                </button>
                <button
                  onClick={handleSave}
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
              <div className="w-full h-full mt-[52px] md:mt-0 px-5 pt-5 pb-28 md:pb-10 flex flex-col gap-5 overflow-x-hidden overflow-y-visible invisible-scrollbar md:overflow-hidden">
                {data.collectionType === "BANNER" && (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="bannnerImage"
                      className="font-semibold text-sm"
                    >
                      Image
                    </label>
                    <div>
                      <div className="w-full border rounded-md overflow-hidden">
                        <div className="w-full min-h-[86px] flex items-center justify-center overflow-hidden">
                          {!bannerImage || !isValidRemoteImage(bannerImage) ? (
                            <CiImageOn className="fill-neutral-200" size={80} />
                          ) : (
                            <Image
                              src={bannerImage}
                              alt={title}
                              width={766}
                              height={308}
                              priority={true}
                            />
                          )}
                        </div>
                        <div className="w-full h-9 border-t overflow-hidden">
                          <input
                            type="text"
                            name="bannerImage"
                            placeholder="Paste image URL"
                            value={bannerImage}
                            onChange={(e) => setBannerImage(e.target.value)}
                            className="h-full w-full px-3 text-gray"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="font-semibold text-sm">
                    Title
                  </label>
                  <div className="w-full h-9 relative">
                    <input
                      type="text"
                      name="title"
                      placeholder={`Belle Jolie Lipstick - She "Marks" Her Man with Her Lips`}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-custom-blue"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="slug" className="font-semibold text-sm">
                    Slug
                  </label>
                  <div className="w-full h-9 relative">
                    <input
                      type="text"
                      name="slug"
                      placeholder="belle-jolie-lipstick-mark-your-man"
                      value={slug}
                      onChange={(e) => {
                        const sanitizedValue = e.target.value
                          .replace(/[^a-zA-Z0-9-]/g, "")
                          .toLowerCase();
                        setSlug(sanitizedValue);
                      }}
                      className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-custom-blue"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden w-full pb-5 pt-2 px-5 absolute bottom-0">
              <button
                onClick={handleSave}
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
          type={alertMessageType}
        />
      )}
    </>
  );
}
