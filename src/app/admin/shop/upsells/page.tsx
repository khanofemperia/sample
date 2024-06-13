import {
  NewUpsellEmptyGridButton,
  NewUpsellOverlay,
} from "@/components/admin/NewUpsell";
import { fetchData, formatThousands } from "@/libraries/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Upsells() {
  const upsells = await fetchData<UpsellType[]>("/api/upsells");

  return (
    <>
      <div className="mx-auto flex flex-wrap justify-start px-5 md:px-0 md:w-[762px] lg:w-[1016px]">
        {upsells.length > 0 ? (
          upsells.map(({ id, price, salePrice, poster }, index) => (
            <Link
              key={index}
              href={`/admin/shop/upsells/${id}`}
              className="aspect-square w-1/2 min-[425px]:w-[calc(100%/3)] md:w-[254px] pt-2 pb-[6px] px-5 select-none transition duration-200 ease-in-out active:bg-blue-100 lg:hover:bg-blue-100"
            >
              <div className="relative w-full h-full">
                <div className="aspect-square w-full overflow-hidden flex items-center justify-center shadow-[2px_2px_4px_#9E9E9E] bg-white">
                  {poster && (
                    <Image
                      src={poster}
                      alt="Upsell"
                      width={216}
                      height={216}
                      priority
                    />
                  )}
                </div>
                <div className="flex items-center justify-center absolute bottom-0 w-full">
                  <div className="flex gap-[6px] items-center justify-center text-sm w-max">
                    <span className="font-bold">${formatThousands(salePrice)}</span>
                    <span className="text-gray line-through">
                      ${formatThousands(price)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full flex justify-center">
            <div className="text-center">
              <h2 className="font-semibold text-lg mb-2">No upsells yet</h2>
              <p className="text-sm mb-4">
                Click the button below to create your first one
              </p>
              <NewUpsellEmptyGridButton />
            </div>
          </div>
        )}
      </div>
      <NewUpsellOverlay />
    </>
  );
}
