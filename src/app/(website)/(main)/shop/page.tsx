import Image from "next/image";
import Link from "next/link";
import Categories from "@/components/website/Storefront/Categories";
import FeaturedProducts from "@/components/website/Storefront/FeaturedProducts";
import Banner from "@/components/website/Storefront/Banner";
import ProductCard from "@/components/website/Storefront/ProductCard";
import { QuickviewButton } from "@/components/website/Storefront/Quickview";
import { fetchData } from "@/libraries/utils";

type CollectionProductType = {
  id: string;
  name: string;
  category: string;
  slug: string;
  price: string;
  mainImage: string;
  images: string[] | null;
  colors: { name: string; image: string }[] | null;
  sizes: SizeChartType | null;
  description: string | null;
  status: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
  index: number;
};

type CollectionType = {
  id: string;
  index: number;
  title: string;
  slug: string;
  campaignDuration: {
    startDate: string;
    endDate: string;
  };
  collectionType: string;
  image?: string;
  products: CollectionProductType[];
  status: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
};

export default async function Shop() {
  const collections = await fetchData<CollectionType[]>({
    path: "/api/shop/collections",
    visibility: "PUBLISHED",
    fields: ["id", "slug", "title", "bannerImages", "products"],
  });

  const pageHero = await fetchData<PageHeroType>({
    path: "/api/shop/page-hero",
  });
  const categories = await fetchData<CategoryType[]>({
    path: "/api/shop/categories",
  });

  return (
    <>
      <Link href={pageHero.destinationUrl} target="_blank" className="w-full">
        <div className="block md:hidden">
          <Image
            src={pageHero.images.mobileImage}
            alt={pageHero.title}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={2000}
            height={2000}
            priority
          />
        </div>
        <div className="hidden md:block">
          <Image
            src={pageHero.images.desktopImage}
            alt={pageHero.title}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={1440}
            height={360}
            priority
          />
        </div>
      </Link>
      <div className="w-full pt-8">
        <Categories categories={categories} />
        <div className="flex flex-col gap-10">
          {collections.map((collection, index) => {
            switch (collection.collectionType) {
              case "FEATURED":
                if (collection.products && collection.products.length >= 3) {
                  return (
                    <div key={index}>
                      <FeaturedProducts collection={collection} />
                    </div>
                  );
                }
                return null;
              case "BANNER":
                if (collection.products && collection.products.length > 0) {
                  return (
                    <div key={index}>
                      <Banner collection={collection} />
                    </div>
                  );
                }
                return null;
              default:
                return null;
            }
          })}
        </div>
        {/* <div className="mt-10 w-full max-w-[968px] mx-auto">
          <h2 className="font-semibold line-clamp-3 md:text-2xl mb-2 pl-[26px] pr-[22px]">
            Shop now
          </h2>
          <div className="pl-4 pr-3">
            <div className="w-full flex flex-wrap">
              {recommendedProducts.map(
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
                  },
                  index
                ) => (
                  <div
                    key={index}
                    className="min-w-[50%] w-[50%] h-[calc(50vw+50px)] max-h-[376px] min-[516px]:min-w-[33.333333%] min-[516px]:w-[33.333333%] min-[516px]:h-[calc(33.33vw+56px)] rounded-2xl select-none relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:rounded-2xl before:transition before:duration-300 before:ease-in-out active:before:shadow-thick-bottom lg:hover:before:shadow-thick-bottom"
                  >
                    <Link
                      href="#"
                      target="_blank"
                      className="w-[calc(50vw-34px)] h-[calc(50vw-34px)] min-[516px]:w-[calc(33.33vw-30px)] min-[516px]:h-[calc(33.33vw-30px)] max-w-[292px] max-h-[292px] cursor-pointer aspect-square z-[1] absolute top-[10px] left-[10px] right-[10px] bg-gray rounded-xl flex items-center justify-center overflow-hidden"
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
            <a
              className="h-10 w-max px-8 mx-auto mt-6 rounded-full flex items-center justify-center relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:border before:border-black before:rounded-full before:transition before:duration-100 before:ease-in-out active:before:scale-105 lg:hover:before:scale-105"
              href="#"
            >
              See more
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}
