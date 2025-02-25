"use client";
import { useEditor } from "@/modules/Editor/context";
import { Item } from "./Item";
import { Layout, useLayouts } from "@/modules/Layouts/LayoutsContext";

interface ListProps {
  data: Layout[];
}

export function List() {
  const { layouts } = useLayouts();

  return (
    <div className="p-16 w-full h-full grid grid-cols-4 gap-10 justify-items-center">
      {layouts?.map((layout: any) => {
        return <Item key={layout.id} layout={layout} />;
      })}
    </div>
  );
}
