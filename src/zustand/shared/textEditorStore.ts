import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type TextEditorStoreType = {
  editorStateJSON: string;
  setEditorStateJSON: (newEditorStateJSON: string) => void;
};

export const useTextEditorStore = createWithEqualityFn<TextEditorStoreType>(
  (set) => ({
    editorStateJSON: "",
    setEditorStateJSON: (newEditorStateJSON: string) =>
      set({ editorStateJSON: newEditorStateJSON }),
  }),
  shallow
);
