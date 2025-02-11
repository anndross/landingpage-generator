"use client";
import { PreviewElement } from "@/modules/Editor/Preview/context";
import { ReactNode, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface SortableProps {
  state: PreviewElement[];
  setState: React.Dispatch<React.SetStateAction<PreviewElement[]>>;
  children: ReactNode[] | null;
  tag: "main" | "div";
}

export function Sortable({ state, setState, children, tag }: SortableProps) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(`new-${crypto.randomUUID()}`);
  }, []);
  return (
    <div
      //   onMouseEnter={(event) => {
      //     event.stopPropagation();
      //     console.log(id);
      //     event.target.style.background = "#0000004c";
      //   }}
      //   onMouseOut={(event) => {
      //     event.stopPropagation();
      //     console.log(id);
      //     event.target.style.background = "#fff";
      //   }}
      className="w-full h-full border border-zinc-600"
    >
      <ReactSortable
        id={id}
        tag={tag}
        className="w-full h-full bg-white p-5 flex flex-col"
        group={{
          name: "shared",
          pull: true,
          put: true,
        }}
        animation={150}
        swapThreshold={0.65}
        fallbackOnBody
        ghostClass="ghost"
        onEnd={(evt) => {
          console.log("preview evt: ", evt);
        }}
        removeOnSpill={false}
        list={state || []}
        setList={(newState) => {
          const mappedNewState = newState.map((item) => ({
            ...item,
            id: item.id?.startsWith("clone-")
              ? item.id
              : `clone-${crypto.randomUUID()}`,
          }));

          setState(mappedNewState);
        }}
      >
        {children}
      </ReactSortable>
    </div>
  );
}
