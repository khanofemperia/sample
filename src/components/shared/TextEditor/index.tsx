"use client";

import "./styles.css";

import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "./Editor";
import Nodes from "./nodes/TextEditorNodes";
import EditorTheme from "./Theme";
import { ExtendedTextNode } from "./plugins/ExtendedTextNode";
import { TextNode } from "lexical";

export default function TextEditor(): JSX.Element {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initialConfig = {
    namespace: "TextEditor",
    nodes: [
      ExtendedTextNode,
      {
        replace: TextNode,
        with: (node: TextNode) => new ExtendedTextNode(node.__text),
      },
      ...Nodes,
    ],
    onError: (error: Error) => {
      console.log("An error occured");
    },
    theme: EditorTheme,
    editable: true,
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
