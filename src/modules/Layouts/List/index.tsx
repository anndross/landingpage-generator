"use client";
import { PreviewElement } from "@/modules/Editor/EditorContext";
import { Preview } from "./Preview";
import { useLayouts } from "../LayoutsContext";

interface ListProps {
  data: PreviewElement[];
}

export function List({ data }: ListProps) {
  const { layouts } = useLayouts();

  return (
    <div className="p-16 w-full h-full grid grid-cols-4 gap-10 justify-items-center">
      {layouts?.map((layout: any) => {
        return <Preview key={layout.id} layout={layout} />;
      })}
    </div>
  );
}
