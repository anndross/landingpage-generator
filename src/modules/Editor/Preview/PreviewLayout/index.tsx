"use client";
import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { ElementsType, useEditorStore } from "@/modules/Editor/store";
import { Converter } from "@/services/editor/converter";
import { useInsertionEffect } from "react";

export function PreviewLayout() {
  const { layout, setLayout } = useEditorStore();

  useInsertionEffect(() => {
    const styles = new Converter(layout).getStyles();
    const styleTag = document.createElement("style");

    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, [layout]);

  console.log("layoutlayout", layout);

  return (
    <Drawer
      className="landing-page"
      state={layout.children}
      setState={(newState) => {
        if (JSON.stringify(newState) !== JSON.stringify(layout.children)) {
          const mappedNewState = newState.map((item) => ({
            ...item,
            id: item.id.toString()?.startsWith("clone-")
              ? item.id
              : `clone-${crypto.randomUUID()}`,
            index: [],
          }));

          setLayout({
            ...layout,
            type: "layout",
            children: mappedNewState as ElementsType[],
          });
        }
      }}
      tag="main"
    />
  );
}
