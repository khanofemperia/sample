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
      <main className="w-[1080px] mx-auto py-16 flex flex-col gap-20">
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
          <div className="w-[410px] pt-5">
            <p className="mt-[-6px] text-sm text-gray">
              High Waisted Running Shorts
            </p>
            <div className="mt-2 flex items-center gap-1">
              <div className="flex gap-[2px]">
                <StarIcon
                  className="stroke-custom-amber fill-custom-amber"
                  size={17}
                />
                <StarIcon
                  className="stroke-custom-amber fill-custom-amber"
                  size={17}
                />
                <StarIcon
                  className="stroke-custom-amber fill-custom-amber"
                  size={17}
                />
                <StarIcon
                  className="stroke-custom-amber fill-custom-amber"
                  size={17}
                />
                <StarIcon
                  className="stroke-custom-amber fill-custom-amber"
                  size={17}
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
              <div className="flex flex-col gap-5">
                <div className="font-bold">$49.99</div>
                <button className="h-8 w-max px-4 rounded-full flex items-center justify-center gap-[2px] bg-lightgray">
                  <span className="text-sm font-medium">
                    Select Color & Size
                  </span>
                  <ChevronRightIcon className="-mr-[7px]" size={20} />
                </button>
              </div>
            </div>
            <div
              className={`${styles.custom_border} mt-7 py-4 px-6 w-max rounded-md bg-white`}
            >
              <div className="w-full">
                <div>
                  <h2 className="font-black text-center text-[21px] text-custom-red leading-6 [letter-spacing:-1px] [word-spacing:2px] [text-shadow:_1px_1px_1px_rgba(0,0,0,0.15)] w-[248px] mx-auto">
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
            <div className="mt-7 flex gap-3">
              <button className="w-full h-12 rounded-full border border-[rgb(150,150,150)] font-semibold">
                Add to Cart
              </button>
              <button className="inline-block text-center align-middle h-12 w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                Yes, Let's Upgrade
              </button>
            </div>
          </div>
        </div>
        <div className="w-full rounded-3xl px-8 py-10 bg-lightgray">
          <div className="w-[580px] mx-auto flex flex-col gap-7">
            <div className="text-[21px] font-bold max-w-[540px]">
              Shoes That Grow with Your Baby!
            </div>
            <div className="text-lg font-medium">
              Watching your little one take their{" "}
              <strong>first wobbly steps</strong> is a moment you'll cherish
              forever.
            </div>
            <div className="text-lg font-medium">
              As a mom myself, I know the excitement (and maybe a touch of
              worry!) when your baby starts exploring on their own.
            </div>
            <div className="text-lg font-medium">
              Wondering what makes our baby shoes so <strong>special?</strong>{" "}
              Here's what parents are saying:
            </div>
            <div className="text-lg font-medium">
              <strong>“No more buying new shoes every few weeks!”</strong>
            </div>
            <div className="text-lg font-medium">They're designed to last.</div>
            <div className="text-lg font-medium">
              Our secret?{" "}
              <strong>
                A soft, flexible sole that grows with your baby's feet.
              </strong>
            </div>
            <div className="text-lg font-medium">
              Imagine the comfort of <strong>soft socks</strong> on your own
              feet - that's what our shoes feel like!
            </div>
            <div className="text-lg font-medium">
              They're gentle on your baby's delicate toes and provide just the
              right amount of support for their wobbly ankles, promoting{" "}
              <strong>healthy foot development.</strong>
            </div>
            <div className="text-lg font-medium">
              Embrace the joy of those first steps...
            </div>
            <div className="text-lg font-medium">
              <strong>
                Choose comfort and support for your precious little one.
              </strong>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-max mx-auto mb-10 flex items-center gap-1">
            <div className="flex gap-[2px]">
              <StarIcon
                className="stroke-custom-amber fill-custom-amber"
                size={21}
              />
              <StarIcon
                className="stroke-custom-amber fill-custom-amber"
                size={21}
              />
              <StarIcon
                className="stroke-custom-amber fill-custom-amber"
                size={21}
              />
              <StarIcon
                className="stroke-custom-amber fill-custom-amber"
                size={21}
              />
              <StarIcon
                className="stroke-custom-amber fill-custom-amber"
                size={21}
              />
            </div>
            <div className="text-[#008a00] font-medium text-[21px]">
              18,640+ Happy Customers
            </div>
          </div>
          <div className="columns-3 gap-x-5 *:break-inside-avoid *:relative *:p-5 *:mb-5 *:rounded-xl *:bg-lightgray">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Lisa Anthony</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Husband loved it, mom approved!
                </h2>
                <p className="text-sm">
                  Even my conservative mom said I looked beautiful. Perfect fit
                  for my body shape.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Margaret Johnson</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Great for petites
                </h2>
                <p className="text-sm">
                  I'm short and this dress fits me perfectly without any
                  alterations. The length is just right and the fit is very
                  flattering. I wore it to a wedding and felt so elegant and
                  comfortable. The material is high quality, but it did fade
                  slightly after a few washes.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Sarah Williams</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Absolutely in love, but...
                </h2>
                <p className="text-sm">
                  This dress is like, perfect—fits great, super high quality. So
                  comfy and versatile, but it picked up way too much sand at the
                  beach.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Emily Davis</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Love the fabric
                </h2>
                <p className="text-sm">
                  The fabric is super soft and lightweight, really breathable
                  and comfy. Got tons of compliments at the barbecue! Just watch
                  out for static cling—keep some anti-static spray handy.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Ashley Rodriguez</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  These are so perfect for weddings
                </h2>
                <p className="text-sm">
                  Getting it on and off solo is a bit tricky due to the zipper.
                  It was perfect for the wedding, though!
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Jessica Thompson</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Perfect for curvy girls
                </h2>
                <p className="text-sm">
                  This dress hugs my curves perfectly and gives me such a cute
                  shape... It's usually hard to find dresses that really flatter
                  me, but this one does it so well! I feel super confident and
                  stylish whenever I wear it.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Amanda Wilson</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Worth every penny
                </h2>
                <p className="text-sm">
                  The fabric feels so comfy, and get this—my ex who dumped me
                  for some girl at my aunt's wedding started eyeing me. Can you
                  believe that? Ugh, I'm so mad...
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Melissa Martinez</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">Perfect length</h2>
                <p className="text-sm">
                  It hits just above the knee and is really flattering. Wore it
                  to a garden party and felt elegant and comfy. The fabric is
                  soft and doesn't wrinkle easily, which is a big plus!
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Nicole Anderson</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  My BFF is totally in love with it
                </h2>
                <p className="text-sm">
                  Girl, this dress is a must-have for when you wanna turn heads
                  and feel extra fabulous.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Christina Novak</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Definitely a statement piece
                </h2>
                <p className="text-sm">
                  The color of this dress is seriously stunning! I picked the
                  red, and it's just gorgeous. The fit is perfect and so
                  flattering. Wore it to a summer party and felt like everyone's
                  eyes were on me. It's totally a statement piece.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Danielle Chen</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  Fits perfectly, high-quality material
                </h2>
                <p className="text-sm">
                  The only issue is that it wrinkles easily, so be prepared to
                  iron it before heading out.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray">Rachel Goldstein</p>
                <div className="flex gap-[2px]">
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                  <StarIcon
                    className="stroke-custom-amber fill-custom-amber"
                    size={17}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-[23px]">
                  White's cute, but it's see-through
                </h2>
                <p className="text-sm">
                  Make sure you've got a slip handy, 'cause it's a bit
                  see-through. Otherwise, it's perfect for those sunny days and
                  casual outings!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full mt-[22px] p-5 rounded-3xl">
          <div>
            <p>
              <strong>
                Watching your little one take their first wobbly steps is a
                moment you'll cherish forever.
              </strong>{" "}
              Make sure they feel comfortable and supported with our specially
              designed baby shoes.
            </p>
          </div>
          <div>
            <br />
          </div>
          <div>
            <p>
              <strong>
                No more worrying about outgrowing shoes in a blink!
              </strong>{" "}
              Our innovative <strong>Grow-with-Me Design</strong> features a
              soft, flexible sole that adapts to your baby's growing feet,
              saving you time and money.
            </p>
          </div>
          <div>
            <br />
          </div>
          <div>
            <p>
              <strong>
                Imagine the feeling of soft socks on your own feet - that's what
                our shoes feel like!
              </strong>{" "}
              They're gentle on your baby's delicate toes and provide just the
              right amount of support for their wobbly ankles, promoting healthy
              foot development.
            </p>
          </div>
          <div>
            <br />
          </div>
          <div>
            <p>
              <strong>Embrace the joy of those first steps.</strong> Choose
              comfort and support for your precious little one.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
