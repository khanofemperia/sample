import Options from "@/components/website/Product/Options";
import Upsell from "@/components/website/Product/Upsell";
import ImageCarousel from "@/components/website/Product/ImageCarousel";
import styles from "./styles.module.css";
import { ChevronLeftIcon } from "@/icons";
import Images from "@/components/website/Product/Images";

function getProduct(): ProductType {
  return {
    id: "05550",
    category: "Tops",
    name: "Elegant Semi-Sheer Solid Color Blouse - Durable, Easy-Care, & Versatile for All Seasons",
    price: "58.99",
    description:
      "<p><strong>Feeling Stressed? Overwhelmed?**</strong></p><p><br></p><p>Are you a busy woman juggling a million things? Feeling like life's one big to-do list?  <strong>We've all been there!</strong></p><p><br></p><p>But what if there was a way to find <strong>inner peace, heal your relationships,</strong> and even <strong>get fit,</strong> all in one amazing class? Introducing <strong>Therapeutic Yoga</strong> with yours truly, Tara!</p><p><br></p><p><strong>It's More Than Just Stretching!**</strong></p><p><br></p><p>Forget boring old gym routines! <strong>Therapeutic Yoga</strong> is a journey for your mind, body, and spirit. You'll <strong>de-stress, boost your energy levels,</strong> and <strong>improve your flexibility.</strong> Plus, you'll learn powerful breathing techniques that will help you navigate life's challenges with calm clarity. </p><p><br></p><p> And the best part? <strong>No experience is necessary!</strong> Whether you're a seasoned yogi or a complete beginner, <strong>Therapeutic Yoga</strong> is designed for <strong>every woman.</strong></p><p><br></p><p><strong>Find Your Inner Zen Today!**</strong></p><p><br></p><p>So, ditch the stress and embrace the <strong>peace within.</strong> Enroll in my <strong>Therapeutic Yoga</strong> class today!</p><p><br></p><p><strong>Because a happier, healthier you is just a downward-facing dog away!</strong><br></p>",
    mainImage:
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fbf522c1b1d84378bd9bda770affaa9a.jpg?imageView2/2/w/800/q/70/format/webp",
    images: [
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/5be9317ac12c41ae2b663a11b8ab6f9b.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/4ffde039b5cf007db0ac509219dbcc67.jpg?imageView2/2/w/800/q/70/format/webp",
    ],
    visibility: "VISIBLE",
    colors: [
      {
        image:
          "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/4ffde039b5cf007db0ac509219dbcc67.jpg?imageView2/2/w/800/q/70/format/webp",
        name: "White",
      },
      {
        name: "Black",
        image:
          "https://img.kwcdn.com/product/fancy/b6d66280-c933-4ffa-b117-4365e6667030.jpg?imageView2/2/w/800/q/70/format/webp",
      },
      {
        image:
          "https://img.kwcdn.com/product/fancy/f9258448-8eb0-46ca-905e-3d636a6a3f9b.jpg?imageView2/2/w/800/q/70/format/webp",
        name: "Blue",
      },
      {
        image:
          "https://img.kwcdn.com/product/fancy/2c8bb570-d2b0-41dd-a2e5-2f7633b4a2da.jpg?imageView2/2/w/800/q/70/format/webp",
        name: "Yellow",
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
          name: "Size",
          index: 1,
        },
        {
          index: 2,
          name: "US",
        },
        {
          name: "Bust size",
          index: 3,
        },
        {
          name: "Clothing length",
          index: 4,
        },
        {
          name: "Sleeve length",
          index: 5,
        },
        {
          index: 6,
          name: "Hem",
        },
      ],
      sizes: [
        {
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
              cm: "65",
              in: "25.6",
            },
            "Sleeve length": {
              cm: "27.9",
              in: "11",
            },
            Hem: {
              cm: "106.2",
              in: "41.8",
            },
          },
          size: "S",
        },
        {
          size: "M",
          measurements: {
            "Bust size": {
              cm: "91.9",
              in: "36.2",
            },
            "Sleeve length": {
              cm: "28.7",
              in: "11.3",
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
            "Sleeve length": {
              cm: "30",
              in: "11.8",
            },
            Hem: {
              cm: "116.1",
              in: "45.7",
            },
            "Clothing length": {
              in: "26.6",
              cm: "67.6",
            },
            "Bust size": {
              in: "38.6",
              cm: "98",
            },
            US: {
              in: "8/10",
              cm: "8/10",
            },
          },
        },
        {
          measurements: {
            "Sleeve length": {
              cm: "31.2",
              in: "12.3",
            },
            Hem: {
              cm: "122.2",
              in: "48.1",
            },
            US: {
              in: "12",
              cm: "12",
            },
            "Bust size": {
              cm: "104.1",
              in: "41",
            },
            "Clothing length": {
              cm: "69.1",
              in: "27.2",
            },
          },
          size: "XL",
        },
        {
          measurements: {
            "Clothing length": {
              cm: "70.6",
              in: "27.8",
            },
            Hem: {
              in: "50.4",
              cm: "128",
            },
            "Sleeve length": {
              in: "12.8",
              cm: "32.5",
            },
            US: {
              in: "14",
              cm: "14",
            },
            "Bust size": {
              cm: "110",
              in: "43.3",
            },
          },
          size: "XXL",
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
          name: "L",
          index: 3,
        },
        {
          index: 4,
          name: "XL",
        },
        {
          name: "XXL",
          index: 5,
        },
      ],
    },
    slug: "elegant-semi-sheer-solid-color-blouse",
    createdAt: "2024-04-07 08:21:51",
    updatedAt: "2024-04-07 08:39:08",
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
      <main>
        <div className="md:hidden">
          <div className="mb-24">
            <div className="w-full max-w-full relative">
              <button
                type="button"
                className="h-10 w-10 bg-black/80 rounded-full flex items-center justify-center absolute top-4 left-5 transition duration-300 ease-in-out active:bg-black"
              >
                <ChevronLeftIcon className="stroke-white mr-[2px]" size={26} />
              </button>
              <ImageCarousel images={images} name={name} />
            </div>
            <div className="mt-4 px-5 max-w-[587px] mx-auto">
              <p className="line-clamp-3 mb-5 max-w-[450px]">{name}</p>
              <Options
                cartInfo={{
                  isInCart: false,
                  productInCart: null,
                }}
                productInfo={{
                  id,
                  price,
                  colors,
                  sizeChart: sizes,
                }}
              />
              <Upsell />
              {description && (
                <div className="w-full mt-5 p-5 rounded-2xl bg-lightgray">
                  <div
                    id="product-description"
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: description || "" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center pb-6 pt-2 px-5 fixed bottom-0 left-0 right-0 bg-white">
            <button className="rounded-full w-full max-w-[564px] h-12 min-h-12 font-semibold text-white transition duration-300 ease-in-out bg-black hover:bg-neutral-900 active:bg-neutral-900">
              Add to Cart - $58.99
            </button>
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto px-5 hidden md:block">
          <div className="relative">
            <div className="flex flex-row gap-5 pt-5 mb-20 w-full">
              <div className="w-full max-w-[582px]">
                <Images images={images} name={name} />
                {description && (
                  <div className="w-full mt-5 p-5 rounded-2xl bg-lightgray">
                    <div
                      id="product-description"
                      className={styles.description}
                      dangerouslySetInnerHTML={{ __html: description || "" }}
                    />
                  </div>
                )}
              </div>
              <div className="min-w-[360px] w-[360px] pt-[18px]">
                <p className="mt-[-6px] pb-5">{name}</p>
                <Options
                  cartInfo={{
                    isInCart: false,
                    productInCart: null,
                  }}
                  productInfo={{
                    id,
                    price,
                    colors,
                    sizeChart: sizes,
                  }}
                />
                <Upsell />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
