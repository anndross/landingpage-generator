"use client";
import React, { useState } from "react";
import { LayoutPreview } from "./PreviewElements";
import { PreviewCode } from "./PreviewCode";
import clsx from "clsx";
import PreviewContext, { PreviewContextI, PreviewElements } from "./context";
import { PreviewSelect } from "./PreviewSelect";

export function Preview() {
  const [previewElements, setPreviewElements] = useState<
    PreviewElements[] | undefined
  >();

  const [preview, setPreview] = useState<PreviewContextI["preview"]>({
    type: "layout",
    option: "desktop",
  });

  return (
    <PreviewContext.Provider
      value={{ previewElements, setPreviewElements, preview, setPreview }}
    >
      <div className="relative flex flex-col justify-between gap-2 h-full w-full pt-14">
        <div
          className={clsx({
            "flex items-center px-4 justify-between absolute w-full h-14 top-0 bg-transparent":
              true,
            "bg-[#f6f8fa]": preview.type === "code",
          })}
        >
          <PreviewSelect />
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
          <LayoutPreview />
        </div>
      </div>
    </PreviewContext.Provider>
  );
}
