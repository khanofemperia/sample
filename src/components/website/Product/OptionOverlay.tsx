"use client";

import { CloseIcon } from "@/icons";
import Overlay from "@/ui/Overlay";

export default function OptionOverlay() {
  return (
    <Overlay>
      <div className="w-full h-full relative">
        <div className="w-full h-[calc(100%-140px)] absolute bottom-0 rounded-t-2xl overflow-hidden bg-white">
          <div className="h-full flex flex-col">
            <div className="h-full w-full flex flex-col">
              <div className="h-full w-full">
                <div className="w-full flex items-center justify-end px-2 py-1">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center ease-in-out duration-300 transition active:bg-lightgray">
                    <CloseIcon size={22} />
                  </button>
                </div>
                <div className="w-full">
                  <div className="w-full h-[180px]">
                    <div className="h-full w-full max-w-full overflow-y-hidden overflow-x-visible invisible-scrollbar px-4">
                      <div className="h-full w-max flex gap-2">
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                        <div className="bg-lightgray min-w-[180px] max-w-[180px]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 pt-2 pb-1 flex flex-col gap-1">
                    <p className="line-clamp-1 text-sm text-gray">
                      High Waisted Running Shorts
                    </p>
                    <span className="font-bold">$49.99</span>
                  </div>
                </div>
              </div>
              <div className="h-full w-full overflow-x-hidden overflow-y-visible bg-pink-200"></div>
            </div>
            <div className="h-[72px] pt-2 pb-5 px-[6px] min-[350px]:px-2 bg-white">
              <div className="max-w-[580px] mx-auto flex gap-[6px] min-[350px]:gap-2">
                <button className="leading-5 text-[13px] min-[340px]:text-sm font-semibold w-full h-[44px] rounded-full ease-in-out duration-150 transition border border-[rgb(150,150,150)] hover:border-[rgb(80,80,80)] active:border-[rgb(150,150,150)] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.16)]">
                  Add to Cart
                </button>
                <button className="leading-5 text-[13px] min-[340px]:text-sm inline-block text-center align-middle h-[44px] w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                  Yes, Let's Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
