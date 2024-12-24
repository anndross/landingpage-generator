"use client";
import { useState } from "react";
import { LateralBar } from "./LateralBar";
import { Preview } from "./Preview";
import EditorContext, { PreviewElements } from "./context";

export function Editor() {
  const [previewElements, setPreviewElements] = useState<PreviewElements[]>([]);

  return (
    <EditorContext.Provider value={{ previewElements, setPreviewElements }}>
      <main className="w-full h-screen flex items-center justify-left">
        <LateralBar />
        <Preview />
      </main>
    </EditorContext.Provider>
  );
}
