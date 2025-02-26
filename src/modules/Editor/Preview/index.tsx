"use client";

import React, { useEffect, useRef } from "react";
import { PreviewCode } from "./PreviewCode";
import { EditableElement, useEditor } from "../context";
import { PreviewHeader } from "./components/PreviewHeader";
import { HideComponent } from "@/components/HideComponent";
import { PreviewLayout } from "./PreviewLayout";
import { Element } from "@/types/element";

export interface PreviewProps {
  layout: EditableElement & {
    children: Element[];
    name: string;
    id: string;
    type: "layout";
  };
}

export function Preview({ layout }: PreviewProps) {
  const { preview, useEditElement } = useEditor();

  useEffect(() => {
    useEditElement(layout);
  }, [layout]);

  return (
    <div className="relative flex flex-col justify-between gap-2 h-full w-[calc(100%-256px)] pt-14">
      <PreviewHeader />

      <HideComponent className="w-full h-full" hide={preview.type !== "layout"}>
        <PreviewLayout />
      </HideComponent>

      <HideComponent className="w-full h-full" hide={preview.type !== "code"}>
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
