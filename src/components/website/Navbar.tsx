"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CartIcon, SearchIcon } from "@/icons";

export default function Navbar() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [isNavbarHidden, setIsNavbarHidden] = useState(true);
  const searchRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollPosition = window.scrollY;
        const scrollDifference = currentScrollPosition - prevScrollPosition;

        if (scrollDifference > 0) {
          setIsScrollingUp(false);
        } else if (scrollDifference < 0) {
          setIsScrollingUp(true);
        }

        setPrevScrollPosition(currentScrollPosition);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollPosition]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!searchRef.current || !(event.target instanceof Node)) {
        return;
      }

      const targetNode = searchRef.current as Node;

      if (!targetNode.contains(event.target)) {
        setIsSearchVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isSearchVisible) {
      setIsNavbarHidden(true);
      setIsScrollingUp(true);
    }

    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  const toggleSearch = () => {
    setIsNavbarHidden(isSearchVisible);

    if (isSearchVisible) {
      setIsSearchVisible(false);
    } else {
      setIsSearchVisible(true);
    }
  };

  return (
    <>
      <nav
        className={clsx(
          "w-full max-h-[116px] md:max-h-16 z-20 fixed top-0 border-b transition duration-100 ease-in-out bg-white",
          {
            "-translate-y-full":
              !isScrollingUp && isNavbarHidden && prevScrollPosition >= 154,
          }
        )}
      >
        <div className="w-full max-w-5xl mx-auto px-6 py-2 relative flex gap-1 flex-col md:flex-row">
          <Link
            href="/"
            className="h-12 min-w-[168px] w-[168px] pl-2 flex items-center"
          >
            <Image
              src="/images/logos/cherlygood_wordmark.svg"
              alt="Cherly Good"
              width={160}
              height={40}
              priority
            />
          </Link>
          <div
            className={`w-full flex items-center justify-center md:pl-6 lg:pl-0 ${clsx(
              { hidden: !isSearchVisible }
            )}`}
          >
            <div
              ref={searchRef}
              className="w-full md:max-w-[580px] bg-white rounded-xl overflow-hidden shadow-[gray_0px_3px_2px_0px,_#E5E5E5_0px_0px_1px_1px]"
            >
              <div className="w-full md:max-w-[580px] h-[52px] border-b flex items-center px-4 gap-4">
                <div className="flex items-center justify-center">
                  <SearchIcon size={18} />
                </div>
                <div className="h-full w-full">
                  <input
                    ref={inputRef}
                    className="w-full h-full text-lg"
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="w-full md:max-w-[580px] rounded-b-xl p-2 pb-5">
                <div className="w-full max-w-[316px] flex flex-wrap gap-2 *:h-8 *:flex *:items-center *:px-3 *:rounded-full *:transition *:duration-300 *:ease-in-out *:bg-lightgray">
                  <Link
                    href="#"
                    className="active:bg-lightgray-dimmed active:underline lg:hover:bg-lightgray-dimmed lg:hover:underline"
                  >
                    dresses
                  </Link>
                  <Link
                    href="#"
                    className="active:bg-lightgray-dimmed active:underline lg:hover:bg-lightgray-dimmed lg:hover:underline"
                  >
                    jeans
                  </Link>
                  <Link
                    href="#"
                    className="active:bg-lightgray-dimmed active:underline lg:hover:bg-lightgray-dimmed lg:hover:underline"
                  >
                    tops
                  </Link>
                  <Link
                    href="#"
                    className="active:bg-lightgray-dimmed active:underline lg:hover:bg-lightgray-dimmed lg:hover:underline"
                  >
                    shirts
                  </Link>
                  <Link
                    href="#"
                    className="active:bg-lightgray-dimmed active:underline lg:hover:bg-lightgray-dimmed lg:hover:underline"
                  >
                    accessories
                  </Link>
                  <Link
                    href="#"
                    className="active:bg-lightgray-dimmed active:underline lg:hover:bg-lightgray-dimmed lg:hover:underline"
                  >
                    shoes
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-full ${clsx({ hidden: isSearchVisible })}`}>
            <div className="w-full flex items-center justify-center md:pl-6 lg:pl-0 overflow-hidden">
              <Link
                href="/shop"
                className="flex items-center gap-[10px] px-5 w-full md:max-w-[580px] h-12 rounded-full ease-in-out transition duration-300 bg-[#e9eff6] active:bg-[#c4f8d6] lg:hover:bg-[#c4f8d6]"
              >
                <Image
                  src="/images/other/waving_hand.webp"
                  alt="Cherly Good"
                  width={28}
                  height={28}
                  priority
                />
                <span className="lg:hidden font-medium text-gray">
                  Browse the store
                </span>
                <span className="hidden lg:block font-medium text-gray">
                  What's up! Click here to browse the store
                </span>
              </Link>
            </div>
          </div>
          <div className="absolute right-4 top-2 md:relative md:right-auto md:top-auto min-w-[160px] w-[160px] h-12 flex items-center justify-end *:h-12 *:w-12 *:rounded-full *:flex *:items-center *:justify-center *:ease-in-out *:transition *:duration-300">
            {!isSearchVisible && (
              <button
                onClick={toggleSearch}
                className="active:bg-lightgray lg:hover:bg-lightgray"
              >
                <SearchIcon size={26} />
              </button>
            )}
            <Link
              href="/cart"
              className="active:bg-lightgray lg:hover:bg-lightgray"
            >
              <CartIcon size={26} />
            </Link>
          </div>
        </div>
      </nav>
      {isSearchVisible && (
        <div className="w-full h-screen fixed top-0 z-50 bg-white bg-opacity-60 backdrop-blur-md transition duration-300 ease-in-out"></div>
      )}
    </>
  );
}
