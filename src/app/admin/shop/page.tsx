import CollectionTable from "@/components/admin/Storefront/CollectionTable";
import { NewCollectionOverlay } from "@/components/admin/Storefront/NewCollection";
import {
  PageHeroButton,
  PageHeroOverlay,
} from "@/components/admin/Storefront/PageHero";
import { fetchData } from "@/libraries/utils";
import clsx from "clsx";

type PageHeroType = {
  id: string;
  image: string | null;
  title: string | null;
  url: string | null;
  visibility: string;
};

export default async function Storefront() {
  const collections = await fetchData<CollectionType[]>("/api/collections");
  const pageHero = await fetchData<PageHeroType>("/api/page-hero");
  return (
    <>
      <div className="mb-10 px-5 min-[1068px]:px-0">
        <h2 className="font-semibold text-lg mb-5">Elements</h2>
        <div className="w-full flex flex-wrap gap-2">
          <PageHeroButton />
          <button className="flex flex-col items-start w-full min-[560px]:w-[calc(100%/2-4px)] min-[824px]:w-64 rounded-xl p-5 relative cursor-pointer ease-in-out duration-300 transition shadow border border-transparent bg-white active:border-[#bfc5ce] lg:hover:border-[#bfc5ce]">
            <div className="w-full mb-4 flex items-center justify-between relative">
              <h2 className="text-left font-semibold text-sm">Categories</h2>
              <div
                className={clsx(
                  "relative w-10 h-5 rounded-full ease-in-out duration-200",
                  {
                    "bg-white border": false,
                    "bg-custom-blue border border-custom-blue": true,
                  }
                )}
              >
                <div
                  className={clsx(
                    "w-[10px] h-[10px] rounded-full ease-in-out duration-300 absolute [top:50%] [transform:translateY(-50%)]",
                    {
                      "left-[5px] bg-black": false,
                      "left-[23px] bg-white": true,
                    }
                  )}
                ></div>
              </div>
            </div>
            <p className="w-52 text-left text-gray text-xs leading-[18px]">
              Group similar products so they're easy to find: Dresses, Tops,
              Bottoms, and more.
            </p>
          </button>
          <button className="flex flex-col items-start w-full min-[560px]:w-[calc(100%/2-4px)] min-[824px]:w-64 rounded-xl p-5 relative cursor-pointer ease-in-out duration-300 transition shadow border border-transparent bg-white active:border-[#bfc5ce] lg:hover:border-[#bfc5ce]">
            <div className="w-full mb-4 flex items-center justify-between relative">
              <h2 className="text-left font-semibold text-sm">Shop now</h2>
              <div
                className={clsx(
                  "relative w-10 h-5 rounded-full ease-in-out duration-200",
                  {
                    "bg-white border": false,
                    "bg-custom-blue border border-custom-blue": true,
                  }
                )}
              >
                <div
                  className={clsx(
                    "w-[10px] h-[10px] rounded-full ease-in-out duration-300 absolute [top:50%] [transform:translateY(-50%)]",
                    {
                      "left-[5px] bg-black": false,
                      "left-[23px] bg-white": true,
                    }
                  )}
                ></div>
              </div>
            </div>
            <p className="w-52 text-left text-gray text-xs leading-[18px]">
              This is a treasure hunt - a mix of products from all categories.
              Users scroll, and the surprises roll in.
            </p>
          </button>
        </div>
      </div>
      <h2 className="font-semibold text-lg mb-5 px-5 min-[1068px]:px-0">
        Collections
      </h2>
      <CollectionTable collections={collections} />
      <NewCollectionOverlay />
      <PageHeroOverlay pageHero={pageHero} />
    </>
  );
}
