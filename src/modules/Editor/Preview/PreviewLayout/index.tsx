"use client";
import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { useEditorStore } from "@/modules/Editor/context";
import { Element } from "@/types/element";

export function PreviewLayout() {
  const { layout, setLayout } = useEditorStore();

  return (
    <>
      <div className="test">
        <Drawer
          // style={layout.style}
          className={layout.id}
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
              children: mappedNewState as Element[],
            });
          }}
          tag="main"
        />
      </div>
    </>
  );
}
