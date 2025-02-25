"use client";
import { Sortable } from "@/components/Sortable";
import { PreviewElement, useEditor } from "../../context";

export function Layout() {
  const { previewElements, setPreviewElements } = useEditor();

  return (
    <Sortable
      style={{ width: "100%", height: "100%" }}
      state={previewElements.children}
      setState={(newState) => {
        const id = `clone-${crypto.randomUUID()}`;

        const mappedNewState = newState.map((item, index) => ({
          ...item,
          id: item.id.toString()?.startsWith("clone-") ? item.id : id,
          indexPath: [index],
        }));

        setPreviewElements({
          ...previewElements,
          children: mappedNewState as PreviewElement[],
        });
      }}
      tag="main"
    />
  );
}
