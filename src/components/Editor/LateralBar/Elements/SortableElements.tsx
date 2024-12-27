"use client";
import { ReactSortable } from "react-sortablejs";
import { PreviewElements } from "../../context";
import { useState } from "react";
import { ModalEditor } from "./ModalEditor";

interface ElementsProps {
  data: PreviewElements[];
}

export function SortableElements({ data }: ElementsProps) {
  const [state, setState] = useState(data || []);

  return (
    <ReactSortable
      tag={"ul"}
      group={{
        name: "elements",
        pull: "clone",
        put: false,
      }}
      className="w-full h-full overflow-y-auto flex flex-col gap-2 my-6"
      sort
      list={state}
      setList={setState}
    >
      {data.map((item) => (
        <li
          className="flex select-none justify-between items-center w-full p-1 px-2 border shadow-sm rounded-lg"
          key={item._id}
        >
          <span className="w-full cursor-grab">{item.name}</span>

          <ModalEditor />
        </li>
      ))}
    </ReactSortable>
  );
}
