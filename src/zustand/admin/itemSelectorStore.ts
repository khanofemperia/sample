import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type SeletedItemType = {
  id: string;
  name?: string;
  index?: string;
};

type StoreType = {
  selectedItem: SeletedItemType;
  setSelectedItem: (item: SeletedItemType) => void;
};

export const useItemSelectorStore = createWithEqualityFn<StoreType>(
  (set) => ({
    selectedItem: { id: "", index: "", name: "" },
    setSelectedItem: (item) => {
      set({ selectedItem: item });
    },
  }),
  shallow
);
