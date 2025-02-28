"use client";

import Link from "next/link";
import { Layout } from "@/modules/Layouts/LayoutsContext";
import { Edit } from "@/modules/Layouts/List/Item/Edit";
import { Delete } from "@/modules/Layouts/List/Item/Delete";

export interface ItemProps {
  layout: Layout;
}

export function Item({ layout }: ItemProps) {
  return (
    <div
      className="w-full h-56 flex flex-col rounded-lg cursor-pointer bg-white
        shadow-md border border-zinc-100 items-center p-2 relative"
    >
      <div className="flex gap-2  z-10 absolute top-1 right-1">
        <Edit layout={layout} />
        <Delete layout={layout} />
      </div>
      <Link className="w-full h-full" href={`/editor/${layout.id}`}>
        <span>{layout.name}</span>
      </Link>
    </div>
  );
}
