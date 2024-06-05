import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type SelectedProduct = {
  id: string;
  name?: string;
  index?: number;
};

type CollectionStoreProps = {
  selectedProduct: SelectedProduct;
  setSelectedProduct: (product: SelectedProduct) => void;
};

export const useCollectionStore = createWithEqualityFn<CollectionStoreProps>(
  (set) => ({
    selectedProduct: { id: "", index: 0, name: "" },
    setSelectedProduct: (product) => {
      set({ selectedProduct: product });
    },
  }),
  shallow
);
