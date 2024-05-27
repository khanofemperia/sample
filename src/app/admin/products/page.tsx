import { NewProductOverlay } from "@/components/admin/NewProduct";
import { fetchData, formatThousands } from "@/libraries/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Products() {
  const products = await fetchData<ProductType[]>("/api/products", [
    "id",
    "poster",
    "name",
    "price",
  ]);

  return (
    <>
      <div className="mx-auto flex flex-wrap justify-start px-5 md:px-0 md:w-[762px] lg:w-[1016px]">
        {products.map(({ id, name, price, poster }, index) => (
          <Link
            key={index}
            href={`/admin/products/${id}`}
            className="aspect-square w-1/2 min-[425px]:w-[calc(100%/3)] md:w-[254px] pt-2 pb-[6px] px-5 select-none transition duration-200 ease-in-out active:bg-blue-100 lg:hover:bg-blue-100"
          >
            <div className="relative w-full h-full">
              <div className="aspect-square w-full shadow-[2px_2px_4px_#9E9E9E] bg-white">
                {poster && (
                  <Image
                    src={poster}
                    alt={name}
                    width={216}
                    height={216}
                    priority
                  />
                )}
              </div>
              <div className="flex items-center justify-center absolute bottom-0 text-sm w-full">
                <span>${formatThousands(price)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <NewProductOverlay />
    </>
  );
}
