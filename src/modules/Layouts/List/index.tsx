"use client";
import { Item } from "./Item";
import { useLayouts } from "@/modules/Layouts/LayoutsContext";

export function List() {
  const { layouts } = useLayouts();

  return (
    <div className="grid grid-cols-3 gap-8 py-10 ">
      {layouts?.map((layout) => {
        return <Item key={layout.id} layout={layout} />;
      })}
    </div>
  );
}
