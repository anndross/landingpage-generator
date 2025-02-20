"use client";

import { useLayouts } from "../LayoutsContext";
import { Preview } from "./Preview";

export function List() {
  const { layouts } = useLayouts();

  return (
    <div className="p-16 w-full h-full grid grid-cols-4 gap-10 justify-items-center">
      {layouts.map((layout) => {
        return <Preview key={layout.id} layout={layout} />;
      })}
    </div>
  );
}
