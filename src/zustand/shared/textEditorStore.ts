import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type TextEditorStoreType = {
  htmlString: string;
  setHtmlString: (newHtmlString: string) => void;
};

export const useTextEditorStore = createWithEqualityFn<TextEditorStoreType>(
  (set) => ({
    htmlString: "",
    setHtmlString: (newHtmlString: string) =>
      set({ htmlString: newHtmlString }),
  }),
  shallow
);
