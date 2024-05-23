"use client";

import { capitalizeFirstLetter } from "@/libraries/utils";
import { useEffect, useState } from "react";
import Spinner from "@/elements/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, EditIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/elements/Overlay";
import UpdateProductAction from "@/actions/update-product";
import TextEditor from "@/components/shared/TextEditor";
import { useTextEditorStore } from "@/zustand/shared/textEditorStore";

export function DescriptionButton() {
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

export function DescriptionOverlay() {
  const { editorStateJSON } = useTextEditorStore();

  const handleSave = () => {
    console.log("Saving editor state...");
    console.log(editorStateJSON);
  };

  return (
    <Overlay>
      <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] overflow-hidden md:overflow-visible rounded-t-3xl bg-white md:w-[600px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
        <div className="w-full">
          <div className="hidden md:flex md:items-center md:justify-between py-2 pr-4 pl-2">
            <button
              type="button"
              className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
            >
              <ArrowLeftIcon className="fill-custom-blue" size={18} />
              <span className="font-semibold text-sm text-custom-blue">
                Product description
              </span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={clsx(
                "relative h-9 w-max px-4 rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-custom-blue"
              )}
            >
              <span className="text-white">Save</span>
            </button>
          </div>
          <div className="w-full p-5">
            <TextEditor />
          </div>
        </div>
      </div>
    </Overlay>
  );
}
