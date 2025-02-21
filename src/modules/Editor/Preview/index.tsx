"use client";
import React, { ReactNode, useEffect } from "react";
import { PreviewCode } from "./Code";
import clsx from "clsx";
import { PreviewDropdown } from "./components/PreviewDropdown";
import { EditToggle } from "./components/EditToggle";
import { Button } from "@/components/ui/button";
import { TbBinaryTree } from "react-icons/tb";
import { Tree } from "./Tree";
import { EditorContextI, useEditor } from "../EditorContext";
import { SaveButton } from "./components/SaveButton";
import { ClearPreview } from "./components/ClearPreview";

interface PreviewProps {
  layout: EditorContextI["previewElements"];
  children: ReactNode;
}

export function Preview({ layout, children }: PreviewProps) {
  const { preview, setPreview, setTree, setPreviewElements } = useEditor();

  useEffect(() => {
    if (layout) {
      console.log("Previeww", layout);

      setPreviewElements(layout);
    }
  }, [layout]);

  function handleToggleCanEdit(state: boolean) {
    setPreview({
      canEdit: state,
    });
  }

  return (
    <>
      <Tree />

      <div className="relative flex flex-col justify-between gap-2 h-full w-[calc(100%-256px)] pt-14">
        <div
          className={clsx({
            "flex items-center pt-1 px-4 justify-between gap-4 absolute w-full h-14 top-0 bg-transparent":
              true,
            "bg-[#f6f8fa]": preview.type === "code",
          })}
        >
          <div className="flex items-center justify-center gap-4">
            <PreviewDropdown />

            {preview.type === "layout" && (
              <EditToggle
                state={preview.canEdit}
                setState={handleToggleCanEdit}
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <ClearPreview />
            <SaveButton />
            <Button onClick={() => setTree(true)} variant="outline">
              <TbBinaryTree />
            </Button>
          </div>
        </div>
        <div
          className={clsx({
            "w-full h-full p-4 bg-[#f6f8fa]": true,
            hidden: preview.type !== "code",
          })}
        >
          <PreviewCode />
        </div>
        <div
          className={clsx({
            "w-full h-full": true,
            hidden: preview.type !== "layout",
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
}
