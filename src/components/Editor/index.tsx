"use client";
import { ReactNode, useState } from "react";
import { Preview } from "./Preview";
import EditorContext, { PreviewElements } from "./context";

export function Editor({ children }: { children: ReactNode }) {
  const [previewElements, setPreviewElements] = useState<PreviewElements[]>([]);

  return (
    <EditorContext.Provider value={{ previewElements, setPreviewElements }}>
      <main className="w-full h-screen flex items-center justify-left">
        {children}
        <Preview />
      </main>
    </EditorContext.Provider>
  );
}
