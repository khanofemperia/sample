import {
  BasicDetailsOverlay,
  BasicDetailsButton,
} from "@/components/admin/EditProduct/BasicDetailsOverlay";
import DataChip from "@/elements/DataChip";
import { EditIcon } from "@/icons";
import { fetchData } from "@/libraries/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchData<ProductType | null>(
    `api/products/${params.id}0`
  );

  if (!product) {
    notFound();
  }

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
              <div>
                <h3 className="text-sm font-semibold mb-2">Category</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  Shoes
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Name</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  Trendy Outdoor Waterproof Anti Slip Durable Women's Rain
                  Boots, Solid Color Garden Shoes
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Slug</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  womens-rain-boots-waterproof-ankle-boots-96665
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Price</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  $29.99
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
                  <h3 className="text-sm font-semibold">Poster</h3>
                  <button className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray">
                    <EditIcon size={20} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="w-full max-w-[280px] rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://img.kwcdn.com/product/fancy/cea70fe7-e0e2-4c7b-b75c-817dac438fff.jpg?imageView2/2/w/800/q/70/format/webp"
                      alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                      width={280}
                      height={280}
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="border rounded-xl">
                <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
                  <h3 className="text-sm font-semibold">Images</h3>
                  <button className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray">
                    <EditIcon size={20} />
                  </button>
                </div>
                <div className="p-5 flex flex-wrap gap-2">
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://img.kwcdn.com/product/fancy/cea70fe7-e0e2-4c7b-b75c-817dac438fff.jpg?imageView2/2/w/800/q/70/format/webp"
                      alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                      width={210}
                      height={210}
                      priority
                    />
                  </div>
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://img.kwcdn.com/product/fancy/6049195d-f932-4973-8676-7463c4a0a984.jpg?imageView2/2/w/800/q/70/format/webp"
                      alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                      width={210}
                      height={210}
                      priority
                    />
                  </div>
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://img.kwcdn.com/product/fancy/c82abc4f-4598-4e06-9430-e0ba6e166ca7.jpg?imageView2/2/w/800/q/70/format/webp"
                      alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                      width={210}
                      height={210}
                      priority
                    />
                  </div>
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://img.kwcdn.com/product/fancy/b5b65d3f-7858-49b1-9378-688be8f870a9.jpg?imageView2/2/w/800/q/70/format/webp"
                      alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                      width={280}
                      height={280}
                      priority
                    />
                  </div>
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
            <div className="flex flex-col gap-5 p-5">
              <div className="border rounded-xl">
                <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
                  <h3 className="text-sm font-semibold">Sizes</h3>
                  <button className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray">
                    <EditIcon size={20} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="w-full max-w-[508px] flex flex-wrap gap-2 *:h-9 *:min-w-14 *:px-4 *:rounded-full *:flex *:items-center *:justify-center *:bg-lightgray">
                    <span>2</span>
                    <span>4</span>
                    <span>6</span>
                    <span>8/10</span>
                    <span>14</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-xl">
                <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
                  <h3 className="text-sm font-semibold">Colors</h3>
                  <button className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray">
                    <EditIcon size={20} />
                  </button>
                </div>
                <div className="p-5 flex flex-wrap gap-2">
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl border flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-full aspect-square">
                      <Image
                        src="https://img.kwcdn.com/product/fancy/cea70fe7-e0e2-4c7b-b75c-817dac438fff.jpg?imageView2/2/w/800/q/70/format/webp"
                        alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                        width={210}
                        height={210}
                        priority
                      />
                    </div>
                    <div className="w-max max-w-full h-9 px-3 border-t flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                      Beige
                    </div>
                  </div>
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl border flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-full aspect-square">
                      <Image
                        src="https://img.kwcdn.com/product/fancy/6049195d-f932-4973-8676-7463c4a0a984.jpg?imageView2/2/w/800/q/70/format/webp"
                        alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                        width={210}
                        height={210}
                        priority
                      />
                    </div>
                    <div className="w-max max-w-full h-9 px-3 border-t flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                      Camel
                    </div>
                  </div>
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl border flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-full aspect-square">
                      <Image
                        src="https://img.kwcdn.com/product/fancy/c82abc4f-4598-4e06-9430-e0ba6e166ca7.jpg?imageView2/2/w/800/q/70/format/webp"
                        alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                        width={210}
                        height={210}
                        priority
                      />
                    </div>
                    <div className="w-max max-w-full h-9 px-3 border-t flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                      Black
                    </div>
                  </div>
                  <div className="max-w-[148px] lg:max-w-[210px] w-[calc(50%-4px)] rounded-xl border flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-full aspect-square">
                      <Image
                        src="https://img.kwcdn.com/product/fancy/b5b65d3f-7858-49b1-9378-688be8f870a9.jpg?imageView2/2/w/800/q/70/format/webp"
                        alt="Trendy Outdoor Waterproof Anti Slip Durable Women's Rain Boots, Solid Color Garden Shoes"
                        width={210}
                        height={210}
                        priority
                      />
                    </div>
                    <div className="w-max max-w-full h-9 px-3 border-t flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                      Black & Red
                    </div>
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
              <button className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray">
                <EditIcon size={20} />
              </button>
            </div>
            <div className="p-5">
              <div className="bg-lightgray p-5 rounded-2xl">
                <div className="line-clamp-4">
                  <div>
                    <p>
                      <strong>Feeling Stressed? Overwhelmed?**</strong>
                    </p>
                  </div>
                  <div>
                    <br />
                  </div>
                  <div>
                    <p>
                      Are you a busy woman juggling a million things? Feeling
                      like life's one big to-do list?{" "}
                      <strong>We've all been there!</strong>
                    </p>
                  </div>
                  <div>
                    <br />
                  </div>
                  <div>
                    <p>
                      But what if there was a way to find{" "}
                      <strong>inner peace, heal your relationships,</strong> and
                      even <strong>get fit,</strong> all in one amazing class?
                      Introducing <strong>Therapeutic Yoga</strong> with yours
                      truly, Tara!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Choose whether your product is a work-in-progress (draft) or ready
            to be seen (published), and decide if you want shoppers to see it
            (visible) or keep it private (hidden).
          </p>
          <div className="w-full max-w-[400px] shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Settings</h2>
              <button className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray">
                <EditIcon size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-5 p-5">
              <div>
                <h3 className="font-semibold text-sm mb-2">Status</h3>
                <DataChip value="published" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Visibility</h3>
                <DataChip value="visible" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <BasicDetailsOverlay data={{category, name, slug, price}} /> */}
    </>
  );
}
