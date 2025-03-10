"use client";
import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { ElementsType, useEditorStore } from "@/modules/Editor/store";
import { Converter } from "@/services/editor/converter";

export function PreviewLayout() {
  const { layout, setLayout } = useEditorStore();

  const styles = new Converter(layout).getVtexIoStyles();

  console.log("layoutlayout", layout);

  return (
    <>
      <style>{styles}</style>

      <Drawer
        style={{ width: "100%", height: "100%" }}
        className="landing-page"
        state={layout.children}
        setState={(newState) => {
          const id = `clone-${crypto.randomUUID()}`;

          const mappedNewState = newState.map((item) => ({
            ...item,
            id: item.id.toString()?.startsWith("clone-") ? item.id : id,
            index: [],
          }));

          const handleUpate = () => {
            setLayout({
              ...layout,
              type: "layout",
              children: Array.isArray(mappedNewState)
                ? (mappedNewState as ElementsType[])
                : ([mappedNewState] as ElementsType[]),
            });
          };

          if (JSON.stringify(newState) !== JSON.stringify(layout.children)) {
            handleUpate();
          }
        }}
        tag="main"
      />
    </>
  );
}
