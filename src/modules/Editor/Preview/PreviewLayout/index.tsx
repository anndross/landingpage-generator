"use client";
import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { ElementsType, useEditorStore } from "@/modules/Editor/store";
import { Converter } from "@/services/editor/converter";
import { styled } from "styled-components";

export function PreviewLayout() {
  const { layout, setLayout } = useEditorStore();

  const styles = new Converter(layout).getStyles();

  console.log("test", layout);

  return (
    <>
      <Drawer
        style={{ width: "100%", height: "100%" }}
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

            console.log("mappedNewState", mappedNewState);

            setLayout({
              ...layout,
              type: "layout",
              children: mappedNewState as ElementsType[],
            });
          }
        }}
        tag="main"
      />
    </>
  );
}
