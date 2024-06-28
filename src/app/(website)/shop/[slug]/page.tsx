import Options from "@/components/website/Product/Options";
import Upsell from "@/components/website/Product/Upsell";
import ImageCarousel from "@/components/website/Product/ImageCarousel";
import styles from "./styles.module.css";
import {
  CheckmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@/icons";
import Images from "@/components/website/Product/Images";
import Image from "next/image";

function getProduct(): ProductType {
  return {
    id: "",
    category: "",
    name: "",
    slug: "",
    price: "",
    mainImage: "",
    images: null,
    colors: null,
    sizes: null,
    description: null,
    visibility: "",
    createdAt: "",
    updatedAt: "",
  };
}

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const isValidSlug = (input: string): boolean => {
    const regex = /^[a-zA-Z0-9-]+-\d{5}$/;
    return regex.test(input);
  };

  if (!isValidSlug(params.slug)) {
    return <div>404 - page not found</div>;
  }

  const product = getProduct();
  const { id, name, price, description, colors, sizes } = product;
  const images = [product.mainImage, ...(product.images ?? [])];

  return (
    <>
      <main className="w-[1080px] mx-auto py-16">
        <div className="flex gap-5">
          <div className="flex">
            <div
              className={`${styles.custom_scrollbar} apply-custom-scrollbar min-w-[56px] w-[62px] max-h-[380px] overflow-x-hidden overflow-y-visible flex flex-col gap-2 mr-2`}
            >
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
              <div className="w-[56px] h-[56px] relative min-h-[56px] min-w-[56px] rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={56}
                  height={56}
                  priority={true}
                />
                <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
              </div>
            </div>
            <div className="w-[580px] h-full flex flex-col gap-5">
              <div className="w-full aspect-square relative flex items-center justify-center bg-lightgray overflow-hidden rounded-3xl [box-shadow:0px_1.6px_3.6px_rgb(0,_0,_0,_0.4),_0px_0px_2.9px_rgb(0,_0,_0,_0.1)]">
                <Image
                  src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                  alt="High Waisted Running Shorts"
                  width={580}
                  height={580}
                  priority={true}
                />
              </div>
            </div>
          </div>
          <div className="w-[400px] pt-5">
            <p className="mt-[-6px] text-sm text-gray">
              High Waisted Running Shorts
            </p>
            <div className="mt-2 flex items-center gap-1">
              <div className="flex gap-[1px]">
                <StarIcon
                  className="stroke-[#fbbe1f] fill-yellow-400"
                  size={20}
                />
                <StarIcon
                  className="stroke-[#fbbe1f] fill-yellow-400"
                  size={20}
                />
                <StarIcon
                  className="stroke-[#fbbe1f] fill-yellow-400"
                  size={20}
                />
                <StarIcon
                  className="stroke-[#fbbe1f] fill-yellow-400"
                  size={20}
                />
                <StarIcon
                  className="stroke-[#fbbe1f] fill-yellow-400"
                  size={20}
                />
              </div>
              <div className="text-[#008a00] font-medium">
                18,640+ Happy Customers
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <p className="text-lg leading-[26px]">
                  <strong className="font-bold text-lg leading-[26px]">
                    Struggling with uncomfortable shorts during workouts?
                  </strong>{" "}
                  Say no more, our shorts guarantee{" "}
                  <strong>
                    <em className="text-lg leading-[26px]">
                      comfort and style
                    </em>
                  </strong>{" "}
                  for every activity!
                </p>
                <ul className="text-sm list-inside *:leading-[25px]">
                  <li className="flex items-center gap-2">
                    <CheckmarkIcon className="fill-custom-green" size={19} />
                    <span>Quick-dry fabric for cool comfort.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckmarkIcon className="fill-custom-green" size={19} />
                    <span>Double layer design for better movement.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckmarkIcon className="fill-custom-green" size={19} />
                    <span>Zipper pocket to secure your phone.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckmarkIcon className="fill-custom-green" size={19} />
                    <span>Ideal for running, gym, and casual wear.</span>
                  </li>
                </ul>
              </div>
              <div>
                <button className="h-8 border px-4 rounded-full flex items-center justify-center gap-[2px] bg-white">
                  <span className="text-sm font-medium">
                    Select Color & Size
                  </span>
                  <ChevronRightIcon className="-mr-[7px]" size={20} />
                </button>
              </div>
            </div>
            <div
              className={`${styles.custom_border} mt-6 py-4 px-6 w-max rounded-md bg-white`}
            >
              <div className="w-full">
                <div>
                  <h2 className="font-black text-center text-[21px] text-custom-red leading-6 [letter-spacing:-1px] [word-spacing:2px] [text-shadow:#707070_0px_1px_0px] w-[248px] mx-auto">
                    UPGRADE MY ORDER
                  </h2>
                  <div className="mt-1 text-center font-medium text-gray">
                    <span className="font-bold text-[#008a00]">$137.99</span>{" "}
                    (Save 58% - was{" "}
                    <span className="line-through font-medium text-gray">
                      $189.99
                    </span>
                    )
                  </div>
                </div>
                <div className="mt-2 h-[210px] aspect-square mx-auto overflow-hidden">
                  <Image
                    src="https://i.pinimg.com/564x/ab/d7/1b/abd71b557fc77916f1570da50c0325a8.jpg"
                    alt="Upgrade my order"
                    width={240}
                    height={240}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
