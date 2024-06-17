import Image from "next/image";
import Link from "next/link";
import Categories from "@/components/website/Storefront/Categories";
import FeaturedProducts from "@/components/website/Storefront/FeaturedProducts";
import PromotionalBanner from "@/components/website/Storefront/PromotionalBanner";
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

/*

const collections = [
  {
    id: "65598",
    title: 'Belle Jolie Lipstick - She "Marks" Her Man with Her Lips',
    slug: "belle-jolie-lipstick-mark-your-man",
    updatedAt: "2024-06-15 06:43:56",
    campaignDuration: {
      startDate: "2024-06-15 22:48:12",
      endDate: "2024-06-20 22:48:12",
    },
    collectionType: "BANNER",
    index: 1,
    visibility: "DRAFT",
    createdAt: "2024-06-14 20:49:11",
    products: [[Object]],
    image:
      "https://firebasestorage.googleapis.com/v0/b/sample-f415e.appspot.com/o/images%2Fget-psyched.png?alt=media&token=161f1696-5edd-4430-97ba-10f4afe0ec7a",
  },
];

*/

function getCategories(): CategoryType[] {
  return [
    {
      id: "76098",
      index: 1,
      name: "Dresses",
      image: "dresses.png",
      visibility: "VISIBLE",
    },
    {
      id: "33940",
      index: 2,
      name: "Tops",
      image: "tops.png",
      visibility: "VISIBLE",
    },
    {
      id: "22684",
      index: 3,
      name: "Bottoms",
      image: "bottoms.png",
      visibility: "VISIBLE",
    },
    {
      id: "99634",
      index: 4,
      name: "Outerwear",
      image: "outerwear.png",
      visibility: "VISIBLE",
    },
    {
      id: "00102",
      index: 5,
      name: "Shoes",
      image: "shoes.png",
      visibility: "VISIBLE",
    },
    {
      id: "76545",
      index: 6,
      name: "Accessories",
      image: "accessories.png",
      visibility: "VISIBLE",
    },
    {
      id: "05463",
      index: 7,
      name: "Men",
      image: "men.png",
      visibility: "VISIBLE",
    },
    {
      id: "55734",
      index: 8,
      name: "Catch-All",
      image: "catch-all.png",
      visibility: "VISIBLE",
    },
  ];
}

function getRecommededProducts(): ProductType[] {
  return [
    {
      id: "67746",
      category: "Bottoms",
      name: "Women's Sleeveless Midi Dress: Summer Vacation Ball Gown Hem, Solid Elegant Casual Style, Easy-Care & Fitted",
      price: "56.63",
      description: null,
      mainImage:
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/4e883a3cc6cdb959438b4598f2406f44.jpg?imageView2/2/w/800/q/70/format/webp",
      images: [
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fc01d03bd81794d9f421e92013b7073c.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/3a05731dc4427c8d94c9f24789869521.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/0e13ed3444786ecd783b0f63f0a10af9.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/c34e9184d0aecb6fec4696f4de152005.jpg?imageView2/2/w/800/q/70/format/webp",
      ],
      visibility: "VISIBLE",
      colors: null,
      sizes: null,
      slug: "sleeveless-midi-dress",
      createdAt: "2024-04-07 09:17:42",
      updatedAt: "2024-04-07 09:29:47",
    },
    {
      id: "52222",
      category: "Bottoms",
      name: "Elegant Paisley Print Shirt - Sophisticated Lapel Collar, Woven Durability, Versatile Women's Styling for All Seasons",
      price: "9.99",
      description: null,
      mainImage:
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/dd4368fffa7a62a7f859e7b92338025a.jpg?imageView2/2/w/800/q/70/format/webp",
      images: [
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/9ba9be8afe9a97da152d8cc9e520148b.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fa3d2e65e2840c0dffda4c798c0010fe.jpg?imageView2/2/w/800/q/70/format/webp",
      ],
      visibility: "VISIBLE",
      colors: null,
      sizes: null,
      slug: "paisley-print-shirt-lapel-collar-womens-style",
      createdAt: "2024-04-07 07:35:21",
      updatedAt: "2024-04-07 08:17:15",
    },
    {
      id: "05550",
      category: "Bottoms",
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
      colors: null,
      sizes: null,
      slug: "elegant-semi-sheer-solid-color-blouse",
      createdAt: "2024-04-07 08:21:51",
      updatedAt: "2024-04-07 08:39:08",
    },
    {
      id: "58962",
      category: "Bottoms",
      name: "Versatile V-Neck Bodycon Cami Dress - Solid Color with Cross Detail, High Elasticity, Easy Care for All Seasons",
      price: "66.98",
      description: null,
      mainImage:
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/11efe65c6b3e6407bb1ce4da21e2c8f8.jpg?imageView2/2/w/800/q/70/format/webp",
      images: [
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d8d0fc85141cc282436215f379407f95.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8d78c24e6873ad971b3c6b3c1552648e.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/e943ba065f07377e97a42b6509aaf72a.jpg?imageView2/2/w/800/q/70/format/webp",
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/06d0334848894ef775162c1037052c30.jpg?imageView2/2/w/800/q/70/format/webp",
      ],
      visibility: "VISIBLE",
      colors: null,
      sizes: null,
      slug: "rose-bodycon-cami-dress-cross-detail",
      createdAt: "2024-04-07 09:38:32",
      updatedAt: "2024-04-07 09:58:15",
    },
  ];
}

export default async function Shop() {
  const collections = await fetchData<CollectionType[]>({
    path: "/api/collections",
    visibility: "PUBLISHED",
    fields: ["id", "slug", "title", "products"],
  });

  // const pageHero = await fetchData<PageHeroType>("/api/page-hero");
  // const categoriesDemo = await fetchData<CategoryType[]>("/api/categories");

  const categories = getCategories();
  const recommendedProducts = getRecommededProducts();

  return (
    <>
      <Link href="#" className="w-full">
        <div className="block md:hidden">
          <Image
            src="/images/testing/sale-mobile.png"
            alt="Hero image"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={1050}
            height={1400}
            priority
          />
        </div>
        <div className="hidden md:block">
          <Image
            src="/images/testing/sale-desktop.png"
            alt="Hero image"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={1050}
            height={1400}
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
                return (
                  <div key={index}>
                    <FeaturedProducts collection={collection} />
                  </div>
                );
              case "BANNER":
                return (
                  <div key={index}>
                    <PromotionalBanner collection={collection} />
                  </div>
                );
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
