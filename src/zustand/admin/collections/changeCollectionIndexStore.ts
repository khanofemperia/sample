import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type SelectedCollectionType = {
  id: string;
  title?: string;
  index?: string;
};

type CollectionStoreType = {
  selectedCollection: SelectedCollectionType;
  setSelectedCollection: (collection: SelectedCollectionType) => void;
};

export const useChangeCollectionIndexStore =
  createWithEqualityFn<CollectionStoreType>(
    (set) => ({
      selectedCollection: {
        id: "",
        index: "",
        title: "",
      },
      setSelectedCollection: (collection) => {
        set({ selectedCollection: collection });
      },
    }),
    shallow
  );
