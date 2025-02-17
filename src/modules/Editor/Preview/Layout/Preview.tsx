"use client";
import { Sortable } from "@/components/Sortable";
// import { getEditableComponent } from "@/mappedComponents/utils/getEditableComponent";
import { PreviewElement, useEditor } from "../../EditorContext";

export const Preview = ({}: { data: [] }) => {
  const { previewElements, setPreviewElements } = useEditor();

  return (
    <Sortable
      state={previewElements.children}
      setState={(newState) => {
        const id = `clone-${crypto.randomUUID()}`;

        const mappedNewState = newState.map((item, index) => ({
          ...item,
          id: item.id.toString()?.startsWith("clone-") ? item.id : id,
          indexPath: [index],
        }));

        setPreviewElements({ children: mappedNewState as PreviewElement[] });
      }}
      tag="main"
    />
  );
};
