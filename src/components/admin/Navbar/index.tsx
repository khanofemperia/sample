import Link from "next/link";
import Menu from "./Menu";
import PageNav from "./PageNav";

export default function Navbar() {
  return (
    <nav className="w-full h-14 fixed top-0 z-10 shadow-[0px_1px_2px_#DDDDDD] bg-lightgray">
      <div className="max-w-screen-lg w-full h-full pl-5 pr-[10px] mx-auto flex items-center justify-between">
        <div className="h-full flex items-center gap-5">
          <PageNav />
          <div className="hidden h-full lg:flex lg:gap-4 *:h-full *:flex *:items-center *:px-1 *:relative *:before:content-[''] *:before:w-full *:before:h-[1px] *:before:absolute *:before:bottom-[-1px] *:before:left-0 *:before:right-0">
            <Link href="#" className="before:bg-transparent text-gray">
              Storefront
            </Link>
            <Link href="#" className="before:bg-black font-medium">
              Products
            </Link>
            <Link href="#" className="before:bg-transparent text-gray">
              Upsells
            </Link>
          </div>
        </div>
        <div className="h-full flex items-center">
          <Menu />
        </div>
      </div>
    </nav>
  );
}
