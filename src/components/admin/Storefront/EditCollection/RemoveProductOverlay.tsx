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
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] overflow-hidden md:overflow-visible rounded-t-3xl bg-white md:w-[500px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <button onClick={handleSave} className="h-9 px-3 rounded-full bg-custom-red">
              Remove
            </button>
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
