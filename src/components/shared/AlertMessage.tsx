"use client";

import { useRef, useEffect } from "react";

type AlertMessageType = {
  message: string;
  hideAlertMessage: () => void;
}

export default function AlertMessage({
  message,
  hideAlertMessage,
}: AlertMessageType) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element;
      const overlay = overlayRef.current;

      if (overlay?.contains(target) && overlay === target) {
        hideAlertMessage();
      }
    };
    
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      id="alert-message-overlay"
      className="flex justify-center py-20 w-screen h-screen overflow-x-hidden overflow-y-visible z-50 fixed top-0 bottom-0 left-0 right-0 bg-black/40 transition duration-300 ease-in-out"
    >
      <div
        id="message-container"
        className="absolute bottom-0 left-0 right-0 pt-3 pb-8 px-8 rounded-tl-3xl rounded-tr-3xl bg-black"
      >
        <div className="mx-auto text-white text-center max-w-[400px]">{message}</div>
      </div>
    </div>
  );
}
