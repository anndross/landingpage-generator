"use client";
import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { ElementsType, useEditorStore } from "@/modules/Editor/store";
import { CodeConverter } from "@/services/editor/codeConverter";
import { Converter } from "@/services/editor/converter";

export function PreviewLayout() {
  const { layout, setLayout } = useEditorStore();

  const codeConverter = new Converter(layout);

  const styles = codeConverter.getVtexIoStyles();

  console.log("styless", styles);
  return (
    <>
      <style>{styles}</style>

      <Drawer
        style={{ width: "100%", height: "100%" }}
        className="landing-page"
        state={layout.children}
        setState={(newState) => {
          const id = `clone-${crypto.randomUUID()}`;

          const mappedNewState = newState.map((item, index) => ({
            ...item,
            id: item.id.toString()?.startsWith("clone-") ? item.id : id,
            indexPath: [index],
          }));

          setLayout({
            ...layout,
            type: "layout",
            children: mappedNewState as ElementsType[],
          });
        }}
        tag="main"
      />
    </>
  );
}
