"use client";

import { HamburgerMenuIcon } from "@/icons";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { NewProductButton } from "../NewProduct";
import { useNavbarMenuStore } from "@/zustand/admin/navbarMenuStore";

export default function Menu() {
  const { navbarMenuVisible, setNavbarMenu } = useNavbarMenuStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (navbarMenuVisible && !target.closest(".menu")) {
        setNavbarMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navbarMenuVisible, setNavbarMenu]);

  return (
    <div className="menu relative h-10 rounded-full">
      <button
        onClick={() => setNavbarMenu(!navbarMenuVisible)}
        className="w-10 h-10 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray-dimmed"
      >
        <HamburgerMenuIcon size={24} />
      </button>
      <div
        className={clsx("w-44 absolute top-[44px] -right-1 z-10", {
          hidden: !navbarMenuVisible,
          block: navbarMenuVisible,
        })}
      >
        <div className="overflow-hidden h-full w-full py-[5px] flex flex-col gap-0 rounded-xl shadow-thick-bottom bg-white">
          <NewProductButton />
          <div className="h-[1px] my-[5px] bg-[#e5e7eb]"></div>
          <Link
            href="#"
            className="h-9 w-[calc(100%-10px)] mx-auto px-4 rounded-md flex items-center cursor-pointer transition duration-300 ease-in-out active:bg-lightgray"
          >
            Storefront
          </Link>
          <Link
            href="#"
            className="h-9 w-[calc(100%-10px)] mx-auto px-4 rounded-md flex items-center cursor-pointer transition duration-300 ease-in-out active:bg-lightgray"
          >
            Products
          </Link>
          <Link
            href="#"
            className="h-9 w-[calc(100%-10px)] mx-auto px-4 rounded-md flex items-center cursor-pointer transition duration-300 ease-in-out active:bg-lightgray"
          >
            Upsells
          </Link>
          <div className="h-[1px] my-[5px] bg-[#e5e7eb]"></div>
          <Link
            href="#"
            className="h-9 w-[calc(100%-10px)] mx-auto px-4 rounded-md flex items-center cursor-pointer transition duration-300 ease-in-out active:bg-lightgray"
          >
            Public website
          </Link>
          <Link
            href="#"
            className="h-9 w-[calc(100%-10px)] mx-auto px-4 rounded-md flex items-center cursor-pointer transition duration-300 ease-in-out active:bg-lightgray"
          >
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}
