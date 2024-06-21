import {
  BasicDetailsOverlay,
  BasicDetailsButton,
} from "@/components/admin/EditProduct/BasicDetailsOverlay";
import DataChip from "@/ui/DataChip";
import {
  fetchData,
  formatThousands,
  isValidRemoteImage,
} from "@/libraries/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import {
  MainImageButton,
  MainImageOverlay,
} from "@/components/admin/EditProduct/MainImageOverlay";
import {
  ImagesButton,
  ImagesOverlay,
} from "@/components/admin/EditProduct/ImagesOverlay";
import {
  VisibilityButton,
  VisibilityOverlay,
} from "@/components/admin/EditProduct/VisibilityOverlay";
import {
  SizeChartButton,
  SizeChartOverlay,
} from "@/components/admin/EditProduct/SizeChartOverlay";
import {
  ColorsButton,
  ColorsOverlay,
} from "@/components/admin/EditProduct/ColorsOverlay";
import {
  DescriptionButton,
  DescriptionOverlay,
} from "@/components/admin/EditProduct/DescriptionOverlay";
import IDCopyButton from "@/components/shared/IDCopyButton";

export default async function EditProduct({
  params,
}: {
  params: { slug: string };
}) {
  const productId = params.slug.split("-").pop();
  const data = await fetchData<ProductType | null>({path: `api/admin/products/${productId}`});

  if (!data) {
    notFound();
  }

  const {
    id,
    category,
    name,
    slug,
    price,
    mainImage,
    images,
    sizes,
    colors,
    description,
    visibility,
  } = data;

  return (
    <>
      <div className="max-w-[768px] flex flex-col gap-10 px-5">
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Important for SEO: a name that includes target keywords in the first
            four words, a short URL with three or four keywords, and prices that
            help your business grow while making customers feel they're getting
            a good deal.
          </p>
          <div className="w-full shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Basic details</h2>
              <BasicDetailsButton />
            </div>
            <div className="flex flex-col gap-5 p-5 pt-4">
              <IDCopyButton id={id} />
              <div>
                <h3 className="text-sm font-semibold mb-2">Category</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  {category}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Name</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  {name}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Slug</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  {slug}-{id}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Price</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  ${formatThousands(price)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Images that show off your product, helping people see its features
            and quality. They grab attention and let customers imagine owning
            it.
          </p>
          <div className="w-full shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Visuals</h2>
            </div>
            <div className="flex flex-col gap-5 p-5">
              <div className="border rounded-xl">
                <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
                  <h3 className="text-sm font-semibold">Main image</h3>
                  <MainImageButton />
                </div>
                <div className="p-5">
                  {!mainImage || !isValidRemoteImage(mainImage) ? (
                    <p className="italic text-gray">Nothing yet</p>
                  ) : (
                    <div className="w-full max-w-[280px] rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                      <Image
                        src={mainImage}
                        alt={name}
                        width={280}
                        height={280}
                        priority
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="border rounded-xl">
                <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
                  <h3 className="text-sm font-semibold">Images</h3>
                  <ImagesButton />
                </div>
                <div className="p-5 flex flex-wrap gap-2">
                  {!images ||
                  images.every((url) => !isValidRemoteImage(url)) ? (
                    <p className="italic text-gray">Nothing yet</p>
                  ) : (
                    images.map(
                      (url, index) =>
                        isValidRemoteImage(url) && (
                          <div
                            key={index}
                            className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] border rounded-xl aspect-square flex items-center justify-center overflow-hidden"
                          >
                            <Image
                              src={url}
                              alt={name}
                              width={210}
                              height={210}
                              priority
                            />
                          </div>
                        )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Products that come in different sizes make it easy for people to
            find what they're looking for. And with lots of colors available,
            everyone can show off their style and personality.
          </p>
          <div className="w-full shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Options</h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-5 *:border *:rounded-xl">
                <div>
                  <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
                    <h3 className="text-sm font-semibold">Sizes</h3>
                    <SizeChartButton />
                  </div>
                  <div className="p-5">
                    {sizes?.entryLabels.length ? (
                      <div className="w-full max-w-[508px] flex flex-wrap gap-2 *:h-9 *:min-w-14 *:px-4 *:rounded-full *:flex *:items-center *:justify-center *:bg-lightgray">
                        {sizes.entryLabels.map((size, index) => (
                          <span key={index}>{size.name}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="italic text-gray">Nothing yet</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
                    <h3 className="text-sm font-semibold">Colors</h3>
                    <ColorsButton />
                  </div>
                  <div className="p-5 flex flex-wrap gap-2">
                    {!colors ||
                    !colors.some((color) => isValidRemoteImage(color.image)) ? (
                      <p className="italic text-gray">Nothing yet</p>
                    ) : (
                      colors.map(
                        (color, index) =>
                          isValidRemoteImage(color.image) && (
                            <div
                              key={index}
                              className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl border flex flex-col items-center justify-center overflow-hidden"
                            >
                              <div className="w-full aspect-square overflow-hidden">
                                <Image
                                  src={color.image}
                                  alt={color.name}
                                  width={210}
                                  height={210}
                                  priority
                                />
                              </div>
                              <div className="w-full h-9 flex justify-center">
                                <div className="w-max max-w-full px-3 font-medium flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                                  {color.name}
                                </div>
                              </div>
                            </div>
                          )
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Tell your product's story! Describe the features and benefits that
            make customers love it. Highlight what makes it unique and how it
            solves problems or improves lives. Keep it clear and concise, using
            descriptive language to engage the reader.
          </p>
          <div className="w-full shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Product description</h2>
              <DescriptionButton />
            </div>
            <div className="p-5">
              {!description ? (
                <p className="italic text-gray">Nothing yet</p>
              ) : (
                <div className="bg-lightgray p-5 rounded-2xl">
                  <div
                    className={`${styles.description} line-clamp-5`}
                    dangerouslySetInnerHTML={{ __html: description || "" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Choose whether the product is a work-in-progress (draft) or ready to
            be seen (published), and decide if you want shoppers to see it or
            keep it private (hidden).
          </p>
          <div className="w-full max-w-[400px] shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Visibility</h2>
              <VisibilityButton />
            </div>
            <div className="p-5">
              <DataChip value={visibility as ChipValueType} />
            </div>
          </div>
        </div>
      </div>
      <BasicDetailsOverlay data={{ id, category, name, slug, price }} />
      <MainImageOverlay data={{ id, mainImage }} />
      <ImagesOverlay data={{ id, images }} />
      <ColorsOverlay data={{ id, colors }} />
      <SizeChartOverlay data={{ id, chart: sizes }} />
      <DescriptionOverlay data={{ id, description }} />
      <VisibilityOverlay data={{ id, visibility }} />
    </>
  );
}
