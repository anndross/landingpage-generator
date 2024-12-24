"use client";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { ModalEditor } from "./ModalEditor";

export function Sections() {
  const [state, setState] = useState<
    { id: number; name: string; type: string }[]
  >([
    { id: 1, name: "Texto", type: "text" },
    { id: 2, name: "Imagem", type: "image" },
  ]);

  return (
    <ReactSortable
      tag={"ul"}
      className="w-full h-full overflow-y-auto flex flex-col gap-2 my-6"
      list={state}
      setList={setState}
    >
      {state.map((item) => (
        <li
          className="flex select-none justify-between items-center w-full p-1 px-2 border shadow-sm rounded-lg"
          key={item.id}
        >
          <span className="w-full cursor-grab">{item.name}</span>

          <ModalEditor />
        </li>
      ))}
    </ReactSortable>
  );
}
