"use client";

import React, { useEffect } from "react";
import { PreviewCode } from "./preview-code";
import { ElementsType, useEditorStore } from "../store";
import { PreviewHeader } from "./components/PreviewHeader";
import { HideComponent } from "@/components/HideComponent";
import { PreviewLayout } from "./preview-layout";
import { Element } from "@/types/element";
import clsx from "clsx";

export interface PreviewProps {
  layout: ElementsType & {
    children: Element[];
    name: string;
    id: string;
    type: "layout";
  };
}

export function Preview({ layout: layoutData }: PreviewProps) {
  const {
    editorFunctions: { viewLayout, breakpoint },
    setLayout,
  } = useEditorStore();

  useEffect(() => {
    if (layoutData) {
      setLayout(layoutData);
    }

    return () => {};
  }, [layoutData]);

  return (
    <div className="relative flex flex-col justify-between gap-2 h-full w-full pt-14">
      <PreviewHeader />

      <HideComponent
        className="shadow-inner w-full h-full flex bg-zinc-100 justify-center items-center"
        hide={!viewLayout}
      >
        <div
          className={clsx({
            "preview-wrapper bg-white duration-150": true,
            "w-full h-full": breakpoint === "lg" || breakpoint === "all",
            "rounded-md h-[90%] border border-zinc-300 shadow-md":
              breakpoint === "md" || breakpoint === "sm",
            "w-[820px]": breakpoint === "md",
            "w-[375px]": breakpoint === "sm",
          })}
        >
          <PreviewLayout />
        </div>
      </HideComponent>

      <HideComponent className="w-full h-full" hide={viewLayout}>
        <PreviewCode />
      </HideComponent>
    </div>
  );
}
