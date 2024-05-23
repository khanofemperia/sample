"use client";

import "./styles.css";

import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "./Editor";
import Nodes from "./nodes/TextEditorNodes";
import EditorTheme from "./Theme";
import { useTextEditorStore } from "@/zustand/shared/textEditorStore";

const initialState =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

function isValidJSON(str: string | null | undefined): boolean {
  if (str === null || str === undefined) {
    return false;
  }

  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

export default function TextEditor(): JSX.Element {
  const [isClient, setIsClient] = useState(false);
  const { htmlString } = useTextEditorStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initialConfig = {
    editorState: isValidJSON(htmlString) ? htmlString : initialState,
    namespace: "TextEditor",
    nodes: [...Nodes],
    onError: (error: Error) => {
      console.log("An error occured");
    },
    theme: EditorTheme,
    editable: false,
  };

  if (!isClient) {
    return <></>;
  }

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-shell relative">
          <Editor />
        </div>
      </LexicalComposer>
    </div>
  );
}
