import DataChip from "@/ui/DataChip";
import { capitalizeFirstLetter, fetchData } from "@/libraries/utils";
import { notFound } from "next/navigation";
import {
  VisibilityButton,
  VisibilityOverlay,
} from "@/components/admin/Storefront/EditCollection/VisibilityOverlay";
import { HiOutlineBan, HiOutlineClock } from "react-icons/hi";
import { IoHourglassOutline } from "react-icons/io5";
import clsx from "clsx";
import { ChevronRightIcon } from "@/icons";
import {
  CampaignDurationButton,
  CampaignDurationOverlay,
} from "@/components/admin/Storefront/EditCollection/CampaignDurationOverlay";
import {
  BasicDetailsButton,
  BasicDetailsOverlay,
} from "@/components/admin/Storefront/EditCollection/BasicDetailsOverlay";
import Link from "next/link";
import Image from "next/image";
import { ProductListButton, ProductListOverlay } from "@/components/admin/Storefront/EditCollection/ProductListOverlay";

export default async function EditCollection({
  params,
}: {
  params: { slug: string };
}) {
  const CAMPAIGN_STATUS_ENDED = "Ended";
  const CAMPAIGN_STATUS_UPCOMING = "Upcoming";
  const CAMPAIGN_STATUS_ACTIVE = "Active";

  const collectionId = params.slug.split("-").pop();
  const data = await fetchData<CollectionType | null>(
    `api/collections/${collectionId}`
  );

  if (!data) {
    notFound();
  }

  const { id, campaign_duration, collection_type, title, slug, visibility } =
    data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getCampaignStatus = (startDate: string, endDate: string): string => {
    const currentDate = new Date();
    const campaignStartDate = new Date(startDate);
    const campaignEndDate = new Date(endDate);

    campaignStartDate.setUTCHours(0, 0, 0, 0);
    campaignEndDate.setUTCHours(0, 0, 0, 0);

    if (currentDate.getTime() > campaignEndDate.getTime()) {
      return CAMPAIGN_STATUS_ENDED;
    } else if (currentDate.getTime() < campaignStartDate.getTime()) {
      return CAMPAIGN_STATUS_UPCOMING;
    } else {
      return CAMPAIGN_STATUS_ACTIVE;
    }
  };

  return (
    <>
      <div className="max-w-[768px] flex flex-col gap-10 px-5">
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Keep track of your campaign. Upcoming, Active, or Ended. This helps
            you plan your marketing effectively and make adjustments as needed
            for maximum impact.
          </p>
          <div className="w-full max-w-[400px] shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Campaign duration</h2>
              <CampaignDurationButton />
            </div>
            <div className="p-5 pt-4 text-sm">
              <div className="flex items-center gap-1">
                {getCampaignStatus(
                  campaign_duration.start_date,
                  campaign_duration.end_date
                ) === CAMPAIGN_STATUS_UPCOMING && (
                  <IoHourglassOutline
                    className="stroke-custom-gold fill-custom-gold"
                    size={18}
                  />
                )}
                {getCampaignStatus(
                  campaign_duration.start_date,
                  campaign_duration.end_date
                ) === CAMPAIGN_STATUS_ACTIVE && (
                  <HiOutlineClock className="stroke-custom-green" size={18} />
                )}
                {getCampaignStatus(
                  campaign_duration.start_date,
                  campaign_duration.end_date
                ) === CAMPAIGN_STATUS_ENDED && (
                  <HiOutlineBan className="stroke-custom-red" size={18} />
                )}
                <span
                  className={clsx("italic", {
                    "text-custom-gold":
                      getCampaignStatus(
                        campaign_duration.start_date,
                        campaign_duration.end_date
                      ) === CAMPAIGN_STATUS_UPCOMING,
                    "text-custom-green":
                      getCampaignStatus(
                        campaign_duration.start_date,
                        campaign_duration.end_date
                      ) === CAMPAIGN_STATUS_ACTIVE,
                    "text-custom-red":
                      getCampaignStatus(
                        campaign_duration.start_date,
                        campaign_duration.end_date
                      ) === CAMPAIGN_STATUS_ENDED,
                  })}
                >
                  {getCampaignStatus(
                    campaign_duration.start_date,
                    campaign_duration.end_date
                  )}
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-1 h-max">
                <div className="flex gap-2 items-center">
                  <div
                    className={clsx(
                      "px-3 rounded-full h-6 w-max flex gap-1 items-center",
                      {
                        "bg-custom-green/10 border border-custom-green/15":
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_ACTIVE,
                        "bg-lightgray border border-[#6c6c6c]/15":
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_ENDED ||
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_UPCOMING,
                      }
                    )}
                  >
                    <span className="text-gray">Launch date</span>
                    <ChevronRightIcon className="stroke-gray" size={16} />
                    <span
                      className={clsx({
                        "text-custom-green":
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_ACTIVE,
                      })}
                    >
                      {formatDate(campaign_duration.start_date)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    className={clsx(
                      "px-3 rounded-full h-6 w-max flex gap-1 items-center",
                      {
                        "bg-custom-red/10 border border-custom-red/15":
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_ENDED,
                        "bg-lightgray border border-[#6c6c6c]/15":
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_ACTIVE ||
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_UPCOMING,
                      }
                    )}
                  >
                    <span className="text-gray">End date</span>
                    <ChevronRightIcon className="stroke-gray" size={16} />
                    <span
                      className={clsx({
                        "text-custom-red":
                          getCampaignStatus(
                            campaign_duration.start_date,
                            campaign_duration.end_date
                          ) === CAMPAIGN_STATUS_ENDED,
                      })}
                    >
                      {formatDate(campaign_duration.end_date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Create a title that sticks in people's minds. Make it enticing
            enough to make them stop and pay attention. Finally, reinforce it
            with a short, keyword-rich slug (3-5 words).
          </p>
          <div className="w-full shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Basic details</h2>
              <BasicDetailsButton />
            </div>
            <div className="flex flex-col gap-5 p-5 pt-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Title</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  {title}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Slug</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  {slug}-{id}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Type</h3>
                <div className="w-max max-w-full h-9 px-4 rounded-full bg-lightgray flex items-center text-nowrap overflow-x-visible overflow-y-hidden invisible-scrollbar">
                  {capitalizeFirstLetter(collection_type.toLowerCase())}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Choose whether the collection is a work-in-progress (draft) or ready
            to be seen (published), and decide if you want shoppers to see it or
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
        <div>
          <p className="text-sm mb-4 md:max-w-[85%]">
            Curate a selection that feels complete, with products that
            complement each other. Mix styles, colors, sizes, and prices so
            everyone finds something they love.
          </p>
          <div className="w-full shadow rounded-xl bg-white">
            <div className="w-full h-14 border-b flex items-center justify-between pl-5 pr-[10px]">
              <h2 className="font-semibold text-xl">Products (48)</h2>
              <ProductListButton />
            </div>
            <div className="p-5 flex flex-wrap justify-start">
              <Link
                href="#"
                className="aspect-square w-1/2 min-[425px]:w-[calc(100%/3)] md:w-[229px] pt-2 pb-[6px] px-5 select-none transition duration-200 ease-in-out active:bg-blue-100 lg:hover:bg-blue-100"
              >
                <div className="relative w-full h-full">
                  <div className="aspect-square w-full overflow-hidden shadow-[2px_2px_4px_#9E9E9E] bg-white">
                    <Image
                      src="https://i.pinimg.com/736x/e5/93/ed/e593ed7abfc547e9818c303510246ebb.jpg"
                      alt="Product"
                      width={216}
                      height={216}
                      priority
                    />
                  </div>
                  <div className="flex items-center justify-center absolute bottom-0 text-sm w-full">
                    <span>$34.99</span>
                  </div>
                </div>
              </Link>
              <Link
                href="#"
                className="aspect-square w-1/2 min-[425px]:w-[calc(100%/3)] md:w-[229px] pt-2 pb-[6px] px-5 select-none transition duration-200 ease-in-out active:bg-blue-100 lg:hover:bg-blue-100"
              >
                <div className="relative w-full h-full">
                  <div className="aspect-square w-full overflow-hidden shadow-[2px_2px_4px_#9E9E9E] bg-white">
                    <Image
                      src="https://i.pinimg.com/564x/a0/7b/11/a07b11962835ce26faef0d701f03ce83.jpg"
                      alt="Product"
                      width={216}
                      height={216}
                      priority
                    />
                  </div>
                  <div className="flex items-center justify-center absolute bottom-0 text-sm w-full">
                    <span>$34.99</span>
                  </div>
                </div>
              </Link>
              <Link
                href="#"
                className="aspect-square w-1/2 min-[425px]:w-[calc(100%/3)] md:w-[229px] pt-2 pb-[6px] px-5 select-none transition duration-200 ease-in-out active:bg-blue-100 lg:hover:bg-blue-100"
              >
                <div className="relative w-full h-full">
                  <div className="aspect-square w-full overflow-hidden shadow-[2px_2px_4px_#9E9E9E] bg-white">
                    <Image
                      src="https://i.pinimg.com/564x/34/fe/a4/34fea4694b9a5b4a112316ce66a62d32.jpg"
                      alt="Product"
                      width={216}
                      height={216}
                      priority
                    />
                  </div>
                  <div className="flex items-center justify-center absolute bottom-0 text-sm w-full">
                    <span>$34.99</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CampaignDurationOverlay data={{ id, campaign_duration }} />
      <BasicDetailsOverlay data={{ id, title, slug }} />
      <VisibilityOverlay data={{ id, visibility }} />
      <ProductListOverlay data={{ id, visibility }} />
    </>
  );
}
