import Image from "next/image";
import Link from "next/link";

export default function PromotionalBanner({
  collection,
}: {
  collection: CollectionType;
}) {
  return (
    <div className="w-full max-w-[968px] mx-auto py-[1px] pl-4 pr-3">
      <Link href="#">
        <div className="w-full h-max rounded-2xl p-[10px] relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:rounded-2xl before:transition before:duration-300 before:ease-in-out active:before:shadow-thick-bottom lg:hover:before:shadow-thick-bottom">
          <div className="w-full flex items-center justify-center rounded-xl overflow-hidden">
            <div className="block md:hidden">
              <Image
                src="/images/testing/bedroom-mobile.png"
                alt="Shop bedroom"
                width={1000}
                height={1000}
                priority
              />
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/testing/bedroom-desktop.png"
                alt="Shop bedroom"
                width={1000}
                height={1000}
                priority
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
