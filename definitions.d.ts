type CategoryType = {
  id: string;
  index: number;
  name: string;
  image: string;
  visibility: string;
};

type SizeChartType = {
  columns: { index: number; name: string }[];
  entryLabels: { index: number; name: string }[];
  sizes: {
    measurements: {
      [key: string]: {
        in: string;
        cm: string;
      };
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
  poster: string;
  images: string[] | null;
  colors: { name: string; image: string }[] | null;
  sizes: SizeChartType | null;
  description: string | null;
  visibility: string;
  dateCreated: string;
  lastUpdated: string;
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
  products: ProductType[];
  visibility: string;
  dateCreated: string;
  lastUpdated: string;
};

type ChipValueType = "draft" | "published" | "hidden";

type SettingType = {
  categorySection: {
    visibility: string;
  };
};
