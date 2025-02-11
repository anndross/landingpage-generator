"use client";
import React, { ReactNode, useState } from "react";
import { PreviewCode } from "./Code";
import clsx from "clsx";
import PreviewContext, { PreviewContextI, PreviewElement } from "./context";
import { PreviewDropdown } from "./components/PreviewDropdown";
import { EditToggle } from "./components/EditToggle";

interface PreviewProps {
  children: ReactNode;
}

export function Preview({ children }: PreviewProps) {
  const [previewElements, setPreviewElements] = useState<PreviewElement[]>([]);

  const [preview, setPreview] = useState<PreviewContextI["preview"]>({
    type: "layout",
    option: "desktop",
    canEdit: true,
  });

  function handleToggleCanEdit(state: boolean) {
    setPreview((prev) => ({
      ...prev,
      canEdit: state,
    }));
  }

  return (
    <PreviewContext.Provider
      value={{ previewElements, setPreviewElements, preview, setPreview }}
    >
      <div className="relative flex flex-col justify-between gap-2 h-full w-full pt-14">
        <div
          className={clsx({
            "flex items-center pt-1 px-4 justify-start gap-4 absolute w-full h-14 top-0 bg-transparent":
              true,
            "bg-[#f6f8fa]": preview.type === "code",
          })}
        >
          <PreviewDropdown />

          {preview.type === "layout" && (
            <EditToggle
              state={preview.canEdit}
              setState={handleToggleCanEdit}
            />
          )}
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
    </PreviewContext.Provider>
  );
}
