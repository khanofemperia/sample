import Options from "@/components/website/Product/Options";
import Upsell from "@/components/website/Product/Upsell";
import ImageCarousel from "@/components/website/Product/ImageCarousel";
import styles from "./styles.module.css";
import {
  CartIcon,
  CheckmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  StarIcon,
} from "@/icons";
import Images from "@/components/website/Product/Images";
import Image from "next/image";
import StickyBar from "@/components/website/Product/StickyBar";
import Link from "next/link";
import clsx from "clsx";
import OptionOverlay, { OptionButton } from "@/components/website/Product/OptionOverlay";
import { cookies } from "next/headers";
import config from "@/libraries/config";

function getProduct(): ProductType {
  return {
    id: "05550",
    category: "Tops",
    name: "Elegant Semi-Sheer Solid Color Blouse - Durable, Easy-Care, & Versatile for All Seasons",
    slug: "elegant-semi-sheer-solid-color-blouse",
    price: "49.99",
    mainImage:
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp",
    images: [
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/5be9317ac12c41ae2b663a11b8ab6f9b.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/4ffde039b5cf007db0ac509219dbcc67.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    colors: [
      {
        name: "White",
        image:
          "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/4ffde039b5cf007db0ac509219dbcc67.jpg?imageView2/2/w/800/q/70/format/webp",
      },
      {
        name: "Black",
        image:
          "https://img.kwcdn.com/product/fancy/b6d66280-c933-4ffa-b117-4365e6667030.jpg?imageView2/2/w/800/q/70/format/webp",
      },
      {
        name: "Blue",
        image:
          "https://img.kwcdn.com/product/fancy/f9258448-8eb0-46ca-905e-3d636a6a3f9b.jpg?imageView2/2/w/800/q/70/format/webp",
      },
      {
        name: "Yellow",
        image:
          "https://img.kwcdn.com/product/fancy/2c8bb570-d2b0-41dd-a2e5-2f7633b4a2da.jpg?imageView2/2/w/800/q/70/format/webp",
      },
      {
        name: "Rose",
        image:
          "https://img.kwcdn.com/product/fancy/2dface62-6da5-412c-a5c6-f6cfa8b40376.jpg?imageView2/2/w/800/q/70/format/webp",
      },
    ],
    sizes: {
      columns: [
        {
          index: 1,
          name: "Size",
        },
        {
          index: 2,
          name: "US",
        },
        {
          index: 3,
          name: "Bust size",
        },
        {
          index: 4,
          name: "Clothing length",
        },
        {
          index: 5,
          name: "Sleeve length",
        },
        {
          index: 6,
          name: "Hem",
        },
      ],
      sizes: [
        {
          size: "S",
          measurements: {
            "Bust size": {
              in: "34.7",
              cm: "88.1",
            },
            US: {
              in: "4",
              cm: "4",
            },
            "Clothing length": {
              in: "25.6",
              cm: "65",
            },
            "Sleeve length": {
              in: "11",
              cm: "27.9",
            },
            Hem: {
              in: "41.8",
              cm: "106.2",
            },
          },
        },
        {
          size: "M",
          measurements: {
            "Bust size": {
              in: "36.2",
              cm: "91.9",
            },
            "Sleeve length": {
              in: "11.3",
              cm: "28.7",
            },
            Hem: {
              in: "43.3",
              cm: "110",
            },
            US: {
              in: "6",
              cm: "6",
            },
            "Clothing length": {
              in: "26",
              cm: "66",
            },
          },
        },
        {
          size: "L",
          measurements: {
            "Bust size": {
              in: "38.6",
              cm: "98",
            },
            US: {
              in: "8/10",
              cm: "8/10",
            },
            "Clothing length": {
              in: "26.6",
              cm: "67.6",
            },
            "Sleeve length": {
              in: "11.8",
              cm: "30",
            },
            Hem: {
              in: "45.7",
              cm: "116.1",
            },
          },
        },
        {
          size: "XL",
          measurements: {
            "Bust size": {
              in: "41",
              cm: "104.1",
            },
            US: {
              in: "12",
              cm: "12",
            },
            "Clothing length": {
              in: "27.2",
              cm: "69.1",
            },
            "Sleeve length": {
              in: "12.3",
              cm: "31.2",
            },
            Hem: {
              in: "48.1",
              cm: "122.2",
            },
          },
        },
        {
          size: "XXL",
          measurements: {
            "Bust size": {
              in: "43.3",
              cm: "110",
            },
            US: {
              in: "14",
              cm: "14",
            },
            "Clothing length": {
              in: "27.8",
              cm: "70.6",
            },
            "Sleeve length": {
              in: "12.8",
              cm: "32.5",
            },
            Hem: {
              in: "50.4",
              cm: "128",
            },
          },
        },
      ],
      entryLabels: [
        {
          index: 1,
          name: "S",
        },
        {
          index: 2,
          name: "M",
        },
        {
          index: 3,
          name: "L",
        },
        {
          index: 4,
          name: "XL",
        },
        {
          index: 5,
          name: "XXL",
        },
      ],
    },
    upsell: {
      id: "72704",
      mainImage:
        "https:i.pinimg.com/564x/ab/d7/1b/abd71b557fc77916f1570da50c0325a8.jpg",
      price: 137.99,
      discount: {
        percentage: 42,
        savings: 100.0,
      },
      items: [
        {
          name: "Shorts",
          salePrice: 67.99,
          price: 79.99,
        },
        {
          name: "Backpack",
          salePrice: 41.99,
          price: 59.99,
        },
        {
          name: "Sneakers",
          salePrice: 29.99,
          price: 69.99,
        },
        {
          name: "Hoodie",
          salePrice: 79.99,
          price: 109.99,
        },
      ],
    },
    highlights: {
      headline:
        "<p><b>Struggling with uncomfortable shorts during workouts?</b> Say no more, our shorts guarantee <b><i>comfort and style</i></b> for every activity!</p>",
      keyPoints: [
        "Quick-dry fabric for cool comfort.",
        "Double layer design for better movement.",
        "Zipper pocket to secure your phone.",
        "Ideal for running, gym, and casual wear.",
      ],
    },
    description: null,
    visibility: "PUBLISHED",
    createdAt: "2024-04-07 08:21:51",
    updatedAt: "2024-04-07 08:39:08",
  };
}

type ProductInCartProps = {
  id: string;
  color: string;
  size: string;
};

async function getCart() {
  const deviceIdentifier = cookies().get("device_identifier")?.value;

  if (!deviceIdentifier) return null;

  try {
    const response = await fetch(
      `${config.BASE_URL}/api/carts/${deviceIdentifier}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (Object.keys(data).length === 0) return null;

    return data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export default async function ProductDetails({
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

  const existingCart = await getCart();
  const isInCart = existingCart?.products.some(
    (product: any) => product.id === id
  );

  let productInCart;

  if (isInCart) {
    productInCart = existingCart.products.find(
      (p: ProductInCartProps) => p.id === id
    );
  }

  return (
    <>
      <nav className="hidden md:block w-full h-16 z-20 border-b bg-white">
        <div className="w-full max-w-[1080px] mx-auto py-2 px-5 min-[1120px]:px-0 relative flex gap-1 flex-col md:flex-row">
          <Link
            href="/"
            className="h-12 min-w-[168px] w-[168px] flex items-center"
          >
            <Image
              src="/images/logos/cherlygood_wordmark.svg"
              alt="Cherly Good"
              width={160}
              height={40}
              priority
            />
          </Link>
          <div className="w-full flex items-center justify-center overflow-hidden">
            <Link
              href="/shop"
              className="flex items-center gap-[10px] px-5 -ml-28 w-[70%] max-w-[580px] h-12 rounded-full ease-in-out transition duration-300 bg-[#e9eff6] active:bg-[#c4f8d6] lg:hover:bg-[#c4f8d6]"
            >
              <Image
                src="/images/other/waving_hand.webp"
                alt="Cherly Good"
                width={28}
                height={28}
                priority
              />
              <span className="min-[896px]:hidden font-medium text-gray">
                Browse the store
              </span>
              <span className="hidden min-[896px]:block font-medium text-gray">
                Click here to browse the store
              </span>
            </Link>
          </div>
          <Link
            href="/cart"
            className="h-12 min-w-12 w-12 rounded-full flex items-center justify-center ease-in-out transition duration-300 active:bg-lightgray lg:hover:bg-lightgray"
          >
            <CartIcon size={26} />
          </Link>
        </div>
      </nav>
      <main>
        <div className="md:hidden">
          <div className="w-full min-h-screen max-h-screen overflow-hidden flex flex-col">
            <div className="overflow-x-hidden h-[calc(100%-72px)]">
              <div className="w-full max-w-full relative select-none">
                <button
                  type="button"
                  className="h-9 w-9 bg-black/80 rounded-full flex items-center justify-center absolute top-4 left-5 z-10 transition duration-300 ease-in-out active:bg-black"
                >
                  <ChevronLeftIcon
                    className="stroke-white mr-[2px]"
                    size={22}
                  />
                </button>
                <ImageCarousel images={images} productName={name} />
              </div>
              <div className="max-w-[580px] mx-auto pb-12 pt-5 px-5">
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-gray">
                    High Waisted Running Shorts
                  </p>
                  <div className="flex flex-col gap-4">
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
                      <li className="flex items-start gap-2">
                        <CheckmarkIcon
                          className="fill-custom-green mt-[3px] -ml-[1px]"
                          size={19}
                        />
                        <span>Quick-dry fabric for cool comfort.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckmarkIcon
                          className="fill-custom-green mt-[3px] -ml-[1px]"
                          size={19}
                        />
                        <span>Double layer design for better movement.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckmarkIcon
                          className="fill-custom-green mt-[3px] -ml-[1px]"
                          size={19}
                        />
                        <span>Zipper pocket to secure your phone.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckmarkIcon
                          className="fill-custom-green mt-[3px] -ml-[1px]"
                          size={19}
                        />
                        <span>Ideal for running, gym, and casual wear.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="font-bold">$49.99</span>
                    <OptionButton />
                  </div>
                </div>
                <div
                  className={`${styles.custom_border} mt-7 pt-5 pb-[26px] px-6 w-max rounded-md select-none bg-white`}
                >
                  <div className="w-full">
                    <div>
                      <h2 className="font-black text-center text-[21px] text-custom-red leading-6 [letter-spacing:-1px] [word-spacing:2px] [text-shadow:_1px_1px_1px_rgba(0,0,0,0.15)] w-[248px] mx-auto">
                        UPGRADE MY ORDER
                      </h2>
                      <div className="mt-1 text-center font-medium text-custom-amber-dimmed">
                        $137.99 (42% Off)
                      </div>
                    </div>
                    <div className="mt-3 h-[210px] aspect-square mx-auto overflow-hidden">
                      <Image
                        src="https:i.pinimg.com/564x/ab/d7/1b/abd71b557fc77916f1570da50c0325a8.jpg"
                        alt="Upgrade my order"
                        width={240}
                        height={240}
                        priority
                      />
                    </div>
                    <div className="w-[200px] mx-auto mt-5 text-xs leading-6 [word-spacing:1px]">
                      <ul className="*:flex *:justify-between">
                        <li>
                          <p className="text-gray">Shorts</p>
                          <p>
                            <span className="font-semibold">$67.99</span>{" "}
                            <span className="line-through text-gray">
                              $79.99
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="text-gray">Backpack</p>
                          <p>
                            <span className="font-semibold">$41.99</span>{" "}
                            <span className="line-through text-gray">
                              $99.99
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="text-gray">Sneakers</p>
                          <p>
                            <span className="font-semibold">$29.99</span>{" "}
                            <span className="line-through text-gray">
                              $69.99
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="text-gray">Hoodie</p>
                          <p>
                            <span className="font-semibold">$79.99</span>{" "}
                            <span className="line-through text-gray">
                              $189.99
                            </span>
                          </p>
                        </li>
                        <li className="mt-2 h-7 flex items-center rounded bg-lightgray font-semibold">
                          <p className="mx-auto">You Save $100.00</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-12 flex flex-col gap-12">
                  <div>
                    <h2 className="text-[21px] leading-8 mb-4 font-bold">
                      The Next-Gen Blender
                    </h2>
                    <p className="leading-7">
                      BlendJet 2 serves up big blender power on the go. We
                      created the BlendJet 2 portable blender so you can make{" "}
                      <strong>anything you want, anywhere in the world</strong>{" "}
                      — from a mountaintop to your kitchen countertop. It's easy
                      and convenient to use at home, at work, outdoors, at the
                      gym, in the car, at the beach, on vacation or wherever the
                      day takes you.
                    </p>
                    <div>
                      <br />
                    </div>
                    <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center">
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
                    <h2 className="text-[21px] leading-8 mb-4 font-bold">
                      Patented TurboJet Technology
                    </h2>
                    <p className="leading-7">
                      Traditional blenders only use their blades to blend, but
                      we invented a new method that makes every other blender
                      obsolete. Our secret weapon? BlendJet 2's stainless steel
                      blades are offset from the center of the base, which
                      creates a tornado effect that blasts ingredients into the
                      back of the jar 275 times per second, resulting in{" "}
                      <strong>dramatically better blending.</strong>
                      This technology — combined with a more powerful motor and
                      doubled battery capacity — makes BlendJet 2{" "}
                      <strong>
                        five times more powerful than BlendJet One.
                      </strong>
                    </p>
                    <div>
                      <br />
                    </div>
                    <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center">
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
                    <h2 className="text-[21px] leading-8 mb-4 font-bold">
                      Perfect for Everything
                    </h2>
                    <p className="leading-7">
                      BlendJet 2 makes smoothie-bar-quality beverages,
                      silky-smooth protein shakes, top-shelf mixed drinks and
                      creamy frozen lattes, plus milkshakes, slushies, baby
                      food, dips, dressings, sauces,{" "}
                      <strong>and so much more.</strong> We'll send a new recipe
                      video straight to your inbox each week to inspire
                      creativity and ensure you get the most out of your
                      BlendJet 2.
                    </p>
                    <div>
                      <br />
                    </div>
                    <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center">
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
            </div>
            <div className="h-[72px] pt-2 pb-5 px-[6px] min-[350px]:px-2 bg-white">
              <div className="max-w-[580px] mx-auto flex gap-[6px] min-[350px]:gap-2">
                <button className="leading-5 text-[13px] min-[340px]:text-sm font-semibold w-full h-[44px] rounded-full ease-in-out duration-150 transition border border-[rgb(150,150,150)] hover:border-[rgb(80,80,80)] active:border-[rgb(150,150,150)] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.16)]">
                  Add to Cart
                </button>
                <button className="leading-5 text-[13px] min-[340px]:text-sm inline-block text-center align-middle h-[44px] w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                  Yes, Let's Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-full max-w-[1080px] mx-auto pt-5 pb-16 px-5 min-[1120px]:px-0 flex flex-col gap-16">
            <div className="flex gap-5 items-start justify-start relative">
              <div className="sticky top-5 max-w-[650px] flex flex-col gap-16">
                <Images images={images} productName={name} />
              </div>
              <div className="sticky top-5 pt-5 min-w-[340px] w-[340px] min-[896px]:min-w-[400px] min-[896px]:w-[400px]">
                <div>
                  <div className="flex flex-col gap-5">
                    <p className="text-sm text-gray">
                      High Waisted Running Shorts
                    </p>
                    <div className="flex flex-col gap-4">
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
                        <li className="flex items-start gap-2">
                          <CheckmarkIcon
                            className="fill-custom-green mt-[3px] -ml-[1px]"
                            size={19}
                          />
                          <span>Quick-dry fabric for cool comfort.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckmarkIcon
                            className="fill-custom-green mt-[3px] -ml-[1px]"
                            size={19}
                          />
                          <span>Double layer design for better movement.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckmarkIcon
                            className="fill-custom-green mt-[3px] -ml-[1px]"
                            size={19}
                          />
                          <span>Zipper pocket to secure your phone.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckmarkIcon
                            className="fill-custom-green mt-[3px] -ml-[1px]"
                            size={19}
                          />
                          <span>Ideal for running, gym, and casual wear.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="font-bold">$49.99</span>
                      <OptionButton />
                    </div>
                  </div>
                  <div
                    className={`${styles.custom_border} mt-7 pt-5 pb-[26px] px-6 w-max rounded-md select-none bg-white`}
                  >
                    <div className="w-full">
                      <div>
                        <h2 className="font-black text-center text-[21px] text-custom-red leading-6 [letter-spacing:-1px] [word-spacing:2px] [text-shadow:_1px_1px_1px_rgba(0,0,0,0.15)] w-[248px] mx-auto">
                          UPGRADE MY ORDER
                        </h2>
                        <div className="mt-1 text-center font-medium text-custom-amber-dimmed">
                          $137.99 (42% Off)
                        </div>
                      </div>
                      <div className="mt-3 h-[210px] aspect-square mx-auto overflow-hidden">
                        <Image
                          src="https://i.pinimg.com/564x/ab/d7/1b/abd71b557fc77916f1570da50c0325a8.jpg"
                          alt="Upgrade my order"
                          width={240}
                          height={240}
                          priority
                        />
                      </div>
                      <div className="w-[200px] mx-auto mt-5 text-xs leading-6 [word-spacing:1px]">
                        <ul className="*:flex *:justify-between">
                          <li>
                            <p className="text-gray">Shorts</p>
                            <p>
                              <span className="font-semibold">$67.99</span>{" "}
                              <span className="line-through text-gray">
                                $79.99
                              </span>
                            </p>
                          </li>
                          <li>
                            <p className="text-gray">Backpack</p>
                            <p>
                              <span className="font-semibold">$41.99</span>{" "}
                              <span className="line-through text-gray">
                                $99.99
                              </span>
                            </p>
                          </li>
                          <li>
                            <p className="text-gray">Sneakers</p>
                            <p>
                              <span className="font-semibold">$29.99</span>{" "}
                              <span className="line-through text-gray">
                                $69.99
                              </span>
                            </p>
                          </li>
                          <li>
                            <p className="text-gray">Hoodie</p>
                            <p>
                              <span className="font-semibold">$79.99</span>{" "}
                              <span className="line-through text-gray">
                                $189.99
                              </span>
                            </p>
                          </li>
                          <li className="mt-2 h-7 flex items-center rounded bg-lightgray font-semibold">
                            <p className="mx-auto">You Save $100.00</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sticky left-0 right-0 bottom-0 z-10 mt-6 pt-1 pb-5 shadow-[0_-12px_16px_2px_white] bg-white">
                  <div className="flex gap-2 min-[896px]:gap-3">
                    <button className="text-sm min-[896px]:text-base font-semibold w-full h-[44px] min-[896px]:h-12  rounded-full ease-in-out duration-150 transition border border-[rgb(150,150,150)] hover:border-[rgb(80,80,80)] active:border-[rgb(150,150,150)] active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.16)]">
                      Add to Cart
                    </button>
                    <button className="text-sm min-[896px]:text-base inline-block text-center align-middle h-[44px] min-[896px]:h-12 w-full border border-[rgba(0,0,0,0.1)_rgba(0,0,0,0.1)_rgba(0,0,0,0.25)] rounded-full ease-in-out duration-300 transition bg-custom-amber hover:bg-custom-amber-dimmed active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
                      Yes, Let's Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-[70px] mx-auto">
              <div className="w-[580px] flex flex-col gap-12">
                <div>
                  <h2 className="text-[21px] leading-6 mb-4 font-bold">
                    The Next-Gen Blender
                  </h2>
                  <p className="leading-7">
                    BlendJet 2 serves up big blender power on the go. We created
                    the BlendJet 2 portable blender so you can make{" "}
                    <strong>anything you want, anywhere in the world</strong> —
                    from a mountaintop to your kitchen countertop. It's easy and
                    convenient to use at home, at work, outdoors, at the gym, in
                    the car, at the beach, on vacation or wherever the day takes
                    you.
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
                  <h2 className="text-[21px] leading-6 mb-4 font-bold">
                    Patented TurboJet Technology
                  </h2>
                  <p className="leading-7">
                    Traditional blenders only use their blades to blend, but we
                    invented a new method that makes every other blender
                    obsolete. Our secret weapon? BlendJet 2's stainless steel
                    blades are offset from the center of the base, which creates
                    a tornado effect that blasts ingredients into the back of
                    the jar 275 times per second, resulting in{" "}
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
                  <h2 className="text-[21px] leading-6 mb-4 font-bold">
                    Perfect for Everything
                  </h2>
                  <p className="leading-7">
                    BlendJet 2 makes smoothie-bar-quality beverages,
                    silky-smooth protein shakes, top-shelf mixed drinks and
                    creamy frozen lattes, plus milkshakes, slushies, baby food,
                    dips, dressings, sauces, <strong>and so much more.</strong>{" "}
                    We'll send a new recipe video straight to your inbox each
                    week to inspire creativity and ensure you get the most out
                    of your BlendJet 2.
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
          </div>
        </div>
      </main>
      <StickyBar />
      <OptionOverlay
        cartInfo={{
          isInCart,
          productInCart,
        }}
        productInfo={{
          id,
          price,
          colors,
          sizeChart: sizes,
        }}
      />
    </>
  );
}
