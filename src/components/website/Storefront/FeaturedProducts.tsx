import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { QuickviewButton } from "./Quickview";

export default function FeaturedProducts({
  collection,
}: {
  collection: CollectionType;
}) {

  return (
    <>
      <div className="w-full max-w-[968px] mx-auto mb-2 md:mb-4 pl-[26px] pr-[22px] flex items-center justify-between md:justify-normal gap-4">
        <h2 className="font-semibold line-clamp-3 md:text-2xl">
          Belle Jolie Lipstick - She "Marks" Her Man with Here Lips
        </h2>
        <Link
          href="#"
          className="text-sm rounded-full px-3 h-8 text-nowrap flex items-center justify-center transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed lg:hover:bg-lightgray-dimmed"
        >
          See more
        </Link>
      </div>
      <div className="relative mx-auto w-full max-w-[968px]">
        <div className="invisible-scrollbar scroll-px-4 snap-x snap-mandatory w-full max-w-full pb-2 overflow-x-scroll md:overflow-hidden flex gap-[2px] py-[1px] px-4">
          {collection.products
            .slice(0, 3)
            .map(
              (
                {
                  id,
                  name,
                  mainImage,
                  price,
                  slug,
                  images,
                  description,
                  colors,
                  sizes,
                }: ProductType,
                index
              ) => (
                <div
                  key={index}
                  className="min-w-[244px] w-[244px] h-[308px] max-h-[376px] md:min-w-[33.333333%] md:w-[33.333333%] md:h-[calc(33.33vw+54px)] snap-always snap-center rounded-2xl select-none relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:rounded-2xl before:transition before:duration-300 before:ease-in-out active:before:shadow-thick-bottom lg:hover:before:shadow-thick-bottom"
                >
                  <Link
                    href="#"
                    target="_blank"
                    className="w-[224px] h-[224px] md:w-[calc(33.33vw-30px)] md:h-[calc(33.33vw-30px)] max-w-[292px] max-h-[292px] cursor-pointer aspect-square z-[1] absolute top-[10px] left-[10px] right-[10px] bg-gray rounded-xl flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={mainImage}
                      alt={name}
                      width={1000}
                      height={1000}
                      priority={true}
                    />
                  </Link>
                  <ProductCard product={{ id, name, slug, price }} />
                  <QuickviewButton
                    product={{
                      id,
                      name,
                      price,
                      mainImage,
                      images,
                      description,
                      colors,
                      sizes,
                      slug,
                    }}
                  />
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}
