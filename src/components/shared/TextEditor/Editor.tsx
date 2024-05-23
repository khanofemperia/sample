"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import ClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import useLexicalEditable from "@lexical/react/useLexicalEditable";

import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TwitterPlugin from "./plugins/TwitterPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import ContentEditable from "./ui/ContentEditable";
import Placeholder from "./ui/Placeholder";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, EditorState } from "lexical";

type OnChangePluginType = {
  onChange: (editorState: EditorState) => void;
}

function OnChangePlugin({ onChange }: OnChangePluginType): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export default function Editor(): JSX.Element {
  const isEditable = useLexicalEditable();
  const text = "Enter some rich text...";
  const placeholder = <Placeholder>{text}</Placeholder>;
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [editorState, setEditorState] = useState<string | undefined>();

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = window.matchMedia(
        "(max-width: 1025px)"
      ).matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  const [editor] = useLexicalComposerContext();

  const saveToDatabase = async () => {
    const editorState = editor.getEditorState();
    const editorStateJSON = JSON.stringify(editorState.toJSON());
    
    console.log("Saving editor state...");
    console.log(editorStateJSON);
  };

  return (
    <>
      <button
        onClick={saveToDatabase}
        className="bg-custom-blue text-white h-9 px-3 rounded-full mb-2 flex items-center justify-center"
      >
        Save
      </button>
      <div className="h-8 w-max mb-2 border rounded-full overflow-hidden flex">
        <button
          className="h-full pl-3 pr-2 font-semibold text-sm"
          onClick={() => editor.setEditable(false)}
        >
          Read-Only
        </button>
        <div className="h-full w-[1px] bg-[#e5e7eb]"></div>
        <button
          className="h-full pr-3 pl-2 font-semibold text-sm"
          onClick={() => editor.setEditable(true)}
        >
          Edit Mode
        </button>
      </div>
      <div className="border rounded-xl">
        {editor.isEditable() && (
          <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
        )}
        <div className="editor-container rounded-xl relative z-0 bg-white">
          <AutoFocusPlugin />
          <AutoEmbedPlugin />
          <HashtagPlugin />
          <AutoLinkPlugin />
          <HistoryPlugin />
          <RichTextPlugin
            contentEditable={
              <div className="editor resize-none relative" ref={onRef}>
                <ContentEditable />
              </div>
            }
            placeholder={placeholder}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <TablePlugin />
          {isClient && <TableCellResizer />}
          <ImagesPlugin />
          <LinkPlugin />
          <TwitterPlugin />
          <YouTubePlugin />
          <ClickableLinkPlugin disabled={isEditable} />
          {floatingAnchorElem && !isSmallWidthViewport && isClient && (
            <>
              <FloatingLinkEditorPlugin
                anchorElem={floatingAnchorElem}
                isLinkEditMode={isLinkEditMode}
                setIsLinkEditMode={setIsLinkEditMode}
              />
              <TableCellActionMenuPlugin
                anchorElem={floatingAnchorElem}
                cellMerge={true}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
