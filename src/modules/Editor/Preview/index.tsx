"use client";

import React, { useEffect } from "react";
import { PreviewCode } from "./PreviewCode";
import { ElementsType, useEditorStore } from "../store";
import { PreviewHeader } from "./components/PreviewHeader";
import { HideComponent } from "@/components/HideComponent";
import { PreviewLayout } from "./PreviewLayout";
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
    layout,
    editorFunctions: { viewLayout, breakpoint },
    setLayout,
  } = useEditorStore();

  useEffect(() => {
    console.log("PREVIEW PAi", layoutData);
    if (layoutData) {
      setLayout(layoutData);
    }

    return () => {};
  }, [layoutData]);

  console.log("PREVIEW PAi layout estado", layout);
  return (
    <div className="relative flex flex-col justify-between gap-2 h-full w-full pt-14">
      <PreviewHeader />

      <HideComponent
        className="shadow-inner w-full h-full flex bg-zinc-100 justify-center items-center"
        hide={!viewLayout}
      >
        <div
          className={clsx({
            "bg-white duration-150": true,
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

// console.log("PreviewElements:::", previewElements);

// const isMountingRef = useRef(true);

// useEffect(() => {
//   setPreviewElements({ ...layout });
// }, [layout.id]);

// useEffect(() => {
//   const updatePreviewElementsOnDB = async () => {
//     await fetch(`/api/private/preview/update/${previewElements?.id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         style: previewElements?.style,
//         children: previewElements?.children,
//         name: previewElements?.name,
//       }),
//       headers: {
//         Authorization: "Bearer " + cookies.get("auth_token"),
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });
//   };

//   if (!isMountingRef.current) {
//     updatePreviewElementsOnDB();
//   } else {
//     isMountingRef.current = false;
//   }
// }, [previewElements]);
