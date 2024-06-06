"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { capitalizeFirstLetter } from "@/libraries/utils";
import { useState, useEffect } from "react";
import Spinner from "@/ui/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, ChevronDownIcon, CloseIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/ui/Overlay";
import {
  RemoveProductAction,
  UpdateCollectionAction,
} from "@/actions/collections";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCollectionStore } from "@/zustand/admin/collectionStore";

export function RemoveProductButton({ id }: { id: string }) {
  const { showOverlay } = useOverlayStore();
  const setSelectedProduct = useCollectionStore(
    (state) => state.setSelectedProduct
  );

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editCollection.name,
    overlayName: state.pages.editCollection.overlays.removeProduct.name,
  }));

  const handleClick = () => {
    setSelectedProduct({ id });
    showOverlay({ pageName, overlayName });
  };

  return (
    <button
      onClick={handleClick}
      className="h-9 w-9 rounded-full flex items-center justify-center ease-in-out duration-300 transition active:bg-lightgray lg:hover:bg-lightgray"
    >
      <IoCloseCircleOutline size={24} />
    </button>
  );
}

export function RemoveProductOverlay({
  collectionId,
}: {
  collectionId: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { showOverlay, hideOverlay } = useOverlayStore();
  const { selectedProduct } = useCollectionStore((state) => ({
    selectedProduct: state.selectedProduct,
  }));

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editCollection.name,
      overlayName: state.pages.editCollection.overlays.removeProduct.name,
      isOverlayVisible:
        state.pages.editCollection.overlays.removeProduct.isVisible,
    })
  );

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
      const message = await RemoveProductAction({
        collectionId,
        productId: selectedProduct.id,
      });
      setAlertMessage(message);
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding product:", error);
      setAlertMessage("Failed to add product to the collection");
      setShowAlert(true);
    } finally {
      setLoading(false);
      hideOverlay({ pageName, overlayName });
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] overflow-hidden md:overflow-visible rounded-t-3xl bg-white md:w-[360px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <div className="p-5 w-full h-full">
              <h2 className="font-semibold mb-6">
                Removing product from this collection, confirm?
              </h2>
              <div className="w-full flex gap-2 justify-end">
                <button
                  onClick={() => hideOverlay({ pageName, overlayName })}
                  className="h-9 px-4 rounded-full ease-in-out duration-300 transition border active:bg-lightgray lg:hover:bg-lightgray"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  type="button"
                  disabled={loading}
                  className={clsx(
                    "relative h-9 w-max px-4 rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-custom-red",
                    {
                      "bg-opacity-50": loading,
                      "active:bg-custom-red-dimmed lg:hover:bg-custom-red-dimmed":
                        !loading,
                    }
                  )}
                >
                  {loading ? (
                    <div className="flex gap-1 items-center justify-center w-full h-full">
                      <Spinner />
                      <span className="text-white">Removing</span>
                    </div>
                  ) : (
                    <span className="text-white">Yes, remove</span>
                  )}
                </button>
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