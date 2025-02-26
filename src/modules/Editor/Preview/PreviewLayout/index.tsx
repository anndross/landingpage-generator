"use client";
import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { useEditor } from "@/modules/Editor/context";
import { Element } from "@/types/element";

export function PreviewLayout() {
  const { previewElements, setPreviewElements } = useEditor();

  return (
    <Drawer
      style={previewElements.style}
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
          children: mappedNewState as Element[],
        });
      }}
      tag="main"
    />
  );
}
