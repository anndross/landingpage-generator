"use client";

import React, { useLayoutEffect } from "react";
import { PreviewCode } from "./PreviewCode";
import { EditorType, useEditorStore } from "../context";
import { PreviewHeader } from "./components/PreviewHeader";
import { HideComponent } from "@/components/HideComponent";
import { PreviewLayout } from "./PreviewLayout";

export interface PreviewProps {
  layout: EditorType["layout"];
}

export function Preview({ layout: layoutData }: PreviewProps) {
  const { setLayout, editorFunctions } = useEditorStore();

  useLayoutEffect(() => {
    if (layoutData) {
      setLayout(layoutData);
    }
    return () => {};
  }, [layoutData]);

  return (
    <div className="relative flex flex-col justify-between gap-2 h-full w-full pt-14">
      <PreviewHeader />

      <HideComponent
        className="w-full h-full overflow-y-auto"
        hide={editorFunctions.viewLayout}
      >
        <PreviewLayout />
      </HideComponent>

      <HideComponent
        className="w-full h-full"
        hide={!editorFunctions.viewLayout}
      >
        <PreviewCode />
      </HideComponent>
    </div>
  );
}
