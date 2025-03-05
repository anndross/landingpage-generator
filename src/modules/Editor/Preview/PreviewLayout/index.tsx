"use client";
import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { ElementsType, useEditorStore } from "@/modules/Editor/store";

export function PreviewLayout() {
  const { layout, setLayout } = useEditorStore();
  console.log("PreviewLayout - Árvore completa:", layout);

  return (
    <Drawer
      style={{ width: "100%", height: "100%" }}
      className={layout.id}
      state={layout.children}
      setState={(newState) => {
        const id = `clone-${crypto.randomUUID()}`;

        const mappedNewState = newState.map((item, index) => ({
          ...item,
          id: item.id.toString()?.startsWith("clone-") ? item.id : id,
          indexPath: [index],
        }));

        console.log("PreviewLayout - Filhos direto da árvore:", mappedNewState);

        setLayout({
          ...layout,
          type: "layout",
          children: mappedNewState as ElementsType[],
        });
      }}
      tag="main"
    />
  );
}
