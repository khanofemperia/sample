"use client";

import "./styles.css";

import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "./Editor";
import Nodes from "./nodes/TextEditorNodes";
import EditorTheme from "./Theme";

export default function TextEditor(): JSX.Element {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initialConfig = {
    namespace: "TextEditor",
    nodes: [...Nodes],
    onError: (error: Error) => {
      throw error;
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
