"use client";

import "./styles.css";
import "suneditor/dist/css/suneditor.min.css";

import AlertMessage from "@/components/shared/AlertMessage";
import { useState, useEffect, useRef } from "react";
import Spinner from "@/elements/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, CloseIcon, EditIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/elements/Overlay";
import UpdateProductAction from "@/actions/update-product";
import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

type DataType = {
  id: string;
  description: string | null;
};

export function DescriptionButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editProduct.name,
    overlayName: state.pages.editProduct.overlays.description.name,
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

export function DescriptionOverlay({ data }: { data: DataType }) {
  const [description, setDescription] = useState<string>(
    data.description || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [editorContent, setEditorContent] = useState("");

  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editProduct.name,
      overlayName: state.pages.editProduct.overlays.description.name,
      isOverlayVisible: state.pages.editProduct.overlays.description.isVisible,
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
      const message = await UpdateProductAction({
        id: data.id,
        description: editorContent,
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

  const toggleEditor = (mode: string) => {
    setIsReadOnly(mode === "reading");

    const editor = document.querySelector(".sun-editor");

    if (editor) {
      editor.classList.toggle("editing-mode", mode === "editing");
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] overflow-hidden md:overflow-visible rounded-t-3xl bg-white md:w-[320px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <div className="w-full">
              <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                <div className="relative flex justify-center items-center w-full h-7">
                  <h2 className="font-semibold text-lg">Product description</h2>
                  <button
                    onClick={() => {
                      hideOverlay({ pageName, overlayName });
                      setDescription(data.description || "");
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
                    setDescription(data.description || "");
                  }}
                  type="button"
                  className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
                >
                  <ArrowLeftIcon className="fill-custom-blue" size={18} />
                  <span className="font-semibold text-sm text-custom-blue">
                    Product description
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
              <div className="editor-container w-full p-5">
                <div className="flex items-center w-max mb-[6px] rounded-full">
                  <button
                    onClick={() => toggleEditor("reading")}
                    className={clsx(
                      "border-l border-y h-[25px] px-2 pr-[6px] text-sm font-bold text-gray flex items-center justify-center rounded-tl-full rounded-bl-full",
                      {
                        "bg-lightgray cursor-context-menu": isReadOnly,
                      }
                    )}
                  >
                    Read-only
                  </button>
                  <div
                    className={`h-[25px] w-[1px] ${
                      isReadOnly ? "bg-[#e5e7eb]" : "bg-custom-blue"
                    }`}
                  ></div>
                  <button
                    onClick={() => toggleEditor("editing")}
                    className={clsx(
                      "border-r border-y h-[25px] pr-2 pl-[6px] text-sm font-bold flex items-center justify-center rounded-tr-full rounded-br-full",
                      {
                        "bg-custom-blue/15 text-custom-blue border-custom-blue cursor-context-menu":
                          !isReadOnly,
                        "text-gray border border-l-0": isReadOnly,
                      }
                    )}
                  >
                    Editing mode
                  </button>
                </div>
                <SunEditor
                  getSunEditorInstance={getSunEditorInstance}
                  placeholder="Start typing..."
                  hideToolbar={isReadOnly}
                  disable={isReadOnly}
                  setDefaultStyle="font-size: 16px; line-height: 24px;"
                  onChange={(content: string) => setEditorContent(content)}
                  setContents={description || ""}
                  setOptions={{
                    resizingBar: false,
                    showPathLabel: false,
                    buttonList: [
                      ["undo", "redo"],
                      ["formatBlock"],
                      ["bold", "underline", "italic", "strike", "removeFormat"],
                      ["outdent", "indent", "list"],
                      ["link", "image"],
                    ],
                    formats: ["p", "h2", "h3"],
                    icons: {
                      undo: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="26" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"></path></svg>`,
                      redo: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="26" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"></path></svg>`,
                    },
                  }}
                />
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
