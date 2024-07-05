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
        <div className="flex gap-5 items-start justify-start relative">
          <div className="sticky top-16 w-[650px] flex flex-col gap-16">
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
          </div>
          <div className="sticky top-16 pt-5 w-[410px]">
            <div>
              <p className="mt-[-6px] text-sm text-gray">
                High Waisted Running Shorts
              </p>
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
                  <span className="font-bold">$49.99</span>
                  <button className="h-8 w-max px-4 rounded-full flex items-center justify-center gap-[2px] ease-in-out duration-300 transition bg-lightgray hover:bg-lightgray-dimmed">
                    <span className="text-sm font-medium">
                      Select Color & Size
                    </span>
                    <ChevronRightIcon className="-mr-[7px]" size={20} />
                  </button>
                </div>
              </div>
              <div
                className={`${styles.custom_border} mt-7 py-[22px] px-6 w-max rounded-md bg-white`}
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
            </div>
            <div className="sticky left-0 right-0 bottom-0 z-10 mt-6 pt-1 pb-5 shadow-[0_-12px_16px_2px_white] bg-white">
              <div className="flex gap-3">
                <button className="font-semibold w-full h-12 rounded-full ease-in-out duration-150 transition border border-[rgb(150,150,150)] hover:border-[rgb(80,80,80)] active:border-[rgb(150,150,150)] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.16)]">
                  Add to Cart
                </button>
                <button className="inline-block text-center align-middle h-12 w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                  Yes, Let's Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-[70px] mx-auto">
          <div className="w-[580px] flex flex-col gap-16">
            <div>
              <h2 className="text-[21px] leading-6 mb-5 font-bold">
                The Next-Gen Blender
              </h2>
              <p className="leading-7">
                BlendJet 2 serves up big blender power on the go. We created the
                BlendJet 2 portable blender so you can make{" "}
                <strong>anything you want, anywhere in the world</strong> — from
                a mountaintop to your kitchen countertop. It's easy and
                convenient to use at home, at work, outdoors, at the gym, in the
                car, at the beach, on vacation or wherever the day takes you.
              </p>
              <div>
                <br />
              </div>
              <div className="w-[500px] aspect-square rounded-3xl overflow-hidden flex items-center justify-center">
                <Image
                  src="https://i.pinimg.com/564x/8e/fe/b1/8efeb1b9afef852636be660f109fa802.jpg"
                  alt="Fruits"
                  width={580}
                  height={580}
                  priority={true}
                />
              </div>
            </div>
            <div>
              <h2 className="text-[21px] leading-6 mb-5 font-bold">
                Patented TurboJet Technology
              </h2>
              <p className="leading-7">
                Traditional blenders only use their blades to blend, but we
                invented a new method that makes every other blender obsolete.
                Our secret weapon? BlendJet 2's stainless steel blades are
                offset from the center of the base, which creates a tornado
                effect that blasts ingredients into the back of the jar 275
                times per second, resulting in{" "}
                <strong>dramatically better blending.</strong>
                This technology — combined with a more powerful motor and
                doubled battery capacity — makes BlendJet 2{" "}
                <strong>five times more powerful than BlendJet One.</strong>
              </p>
              <div>
                <br />
              </div>
              <div className="w-[500px] aspect-square rounded-3xl overflow-hidden flex items-center justify-center">
                <Image
                  src="https://i.pinimg.com/564x/53/be/0c/53be0c721aa59013e6251d64f54ea01d.jpg"
                  alt="Fruits"
                  width={580}
                  height={580}
                  priority={true}
                />
              </div>
            </div>
            <div>
              <h2 className="text-[21px] leading-6 mb-5 font-bold">
                Perfect for Everything
              </h2>
              <p className="leading-7">
                BlendJet 2 makes smoothie-bar-quality beverages, silky-smooth
                protein shakes, top-shelf mixed drinks and creamy frozen lattes,
                plus milkshakes, slushies, baby food, dips, dressings, sauces,{" "}
                <strong>and so much more.</strong> We'll send a new recipe video
                straight to your inbox each week to inspire creativity and
                ensure you get the most out of your BlendJet 2.
              </p>
              <div>
                <br />
              </div>
              <div className="w-[500px] aspect-square rounded-3xl overflow-hidden flex items-center justify-center">
                <Image
                  src="https://i.pinimg.com/564x/33/d3/9b/33d39bb6a10b39ebe4b96b6aa56d5b84.jpg"
                  alt="Fruits"
                  width={580}
                  height={580}
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="w-full py-4 fixed top-0 border-b bg-white">
        <div className="w-[1080px] h-16 mx-auto flex items-center justify-between">
          <div className="h-full flex gap-5">
            <div className="h-full aspect-square relative rounded-md flex items-center justify-center overflow-hidden bg-red-400">
              <Image
                src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp"
                alt="High Waisted Running Shorts"
                width={64}
                height={64}
                priority={true}
              />
              <div className="w-full h-full rounded-md absolute top-0 bottom-0 left-0 right-0 ease-in-out hover:bg-blue hover:bg-opacity-40 hover:duration-300 hover:ease-out"></div>
            </div>
            <div className="h-full flex gap-5 items-center">
              <span className="font-bold">$49.99</span>
              <button className="h-8 w-max px-4 rounded-full flex items-center justify-center gap-[2px] ease-in-out duration-300 transition bg-lightgray hover:bg-lightgray-dimmed">
                <span className="text-sm font-medium">Select Color & Size</span>
                <ChevronRightIcon className="-mr-[7px]" size={20} />
              </button>
            </div>
          </div>
          <div className="w-[410px] flex gap-3">
            <button className="font-semibold w-full h-12 rounded-full ease-in-out duration-150 transition border border-[rgb(150,150,150)] hover:border-[rgb(80,80,80)] active:border-[rgb(150,150,150)] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.16)]">
              Add to Cart
            </button>
            <div className="w-full h-12 relative">
              <button className="inline-block text-center align-middle h-12 w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                Yes, Let's Upgrade
              </button>
              <div className="absolute top-[58px] -right-3 py-[22px] px-6 rounded-xl shadow-dropdown bg-white || before:content-[''] before:w-[14px] before:h-[14px] before:bg-white before:rounded-tl-[2px] before:rotate-45 before:origin-top-left before:absolute before:-top-[10px] before:border-l before:border-t before:border-[#d9d9d9] before:right-24">
                <div className={`w-max rounded-md bg-white`}>
                  <div className="w-full">
                    <div>
                      <h2 className="font-black text-center text-[21px] text-custom-red leading-6 [letter-spacing:-1px] [word-spacing:2px] [text-shadow:_1px_1px_1px_rgba(0,0,0,0.15)] w-[248px] mx-auto">
                        UPGRADE MY ORDER
                      </h2>
                      <div className="mt-1 text-center font-medium text-gray">
                        <span className="font-bold text-[#008a00]">
                          $137.99
                        </span>{" "}
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
          </div>
        </div>
      </div>
    </>
  );
}
