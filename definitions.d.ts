// Smaller, reusable types

type ImageType = {
  name: string;
  image: string;
};

type MeasurementType = {
  in: string;
  cm: string;
};

type DiscountType = {
  percentage: number;
  savings: number;
};

type UpsellItemType = {
  name: string;
  salePrice: number;
  price: number;
};

type UpsellType = {
  id: string;
  price: string;
  salePrice: string;
  mainImage: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
};

type HighlightsType = {
  headline: string;
  keyPoints: string[];
} | null;

type CampaignDurationType = {
  startDate: string;
  endDate: string;
};

type BannerImageType = {
  desktopImage: string;
  mobileImage: string;
};

// Main types

type CategoryType = {
  id: string;
  index: number;
  name: string;
  image: string;
  visibility: string;
};

type SizeChartColumnType = {
  index: number;
  name: string;
};

type SizeChartEntryLabelType = {
  index: number;
  name: string;
};

type SizeChartType = {
  columns: SizeChartColumnType[];
  entryLabels: SizeChartEntryLabelType[];
  sizes: {
    measurements: {
      [key: string]: MeasurementType;
    };
    size: string;
  }[];
};

type ProductType = {
  id: string;
  category: string;
  name: string;
  slug: string;
  price: string;
  mainImage: string;
  images: string[] | null;
  colors: ImageType[] | null;
  sizes: SizeChartType | null;
  upsell: UpsellType;
  description: string | null;
  highlights: HighlightsType;
  visibility: string;
  createdAt: string;
  updatedAt: string;
};

type CollectionType = {
  id: string;
  index: number;
  title: string;
  slug: string;
  campaignDuration: CampaignDurationType;
  collectionType: string;
  bannerImages?: BannerImageType;
  products: ProductType[];
  visibility: string;
  createdAt: string;
  updatedAt: string;
};

type ChipValueType = "draft" | "published" | "hidden";

type SettingType = {
  categorySection: {
    visibility: string;
  };
};

type UpsellVisibilityType = {
  id: string;
  price: string;
  salePrice: string;
  mainImage: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
};

type PageHeroImageType = {
  desktopImage: string;
  mobileImage: string;
};

type PageHeroType = {
  id: string;
  images: PageHeroImageType;
  title: string;
  destinationUrl: string;
  visibility: string;
};
