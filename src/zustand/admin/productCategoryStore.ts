import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type SelectedProductCategoryType = {
  id: string;
  name?: string;
  index?: string;
};

type ProductCategoryStoreType = {
  selectedProductCategory: SelectedProductCategoryType;
  setSelectedProductCategory: (category: SelectedProductCategoryType) => void;
  categories: ProductCategoryType[];
  setCategories: (categories: ProductCategoryType[]) => void;
};

export const useProductCategoryStore =
  createWithEqualityFn<ProductCategoryStoreType>(
    (set) => ({
      selectedProductCategory: { id: "", index: "0", name: "" },
      setSelectedProductCategory: (category) => {
        set({ selectedProductCategory: category });
      },
      categories: [],
      setCategories: (categories) => set({ categories }),
    }),
    shallow
  );
