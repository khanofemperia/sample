type CategoryType = {
  id: string;
  index: number;
  name: string;
  image: string;
  visibility: string;
};

type SizeChartType = {
  columns: { index: number; name: string }[];
  entry_labels: { index: number; name: string }[];
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
  date_created: string;
  last_updated: string;
};

type CollectionType = {
  id: string;
  index: number;
  title: string;
  slug: string;
  campaign_duration: {
    start_date: string;
    end_date: string;
  };
  collection_type: string;
  image?: string;
  products: ProductType[];
  visibility: string;
  date_created: string;
  last_updated: string;
};

type ChipValueType = "draft" | "published" | "hidden";
