"use client";
import { ReactSortable } from "react-sortablejs";
import { ElementType, useEffect, useState } from "react";
import { TextModal } from "./Modals/Text";
import { PreviewElement } from "@/components/Preview/context";
import { DeleteModal } from "./Modals/Delete";

interface ElementsProps {
  data: {
    elements: PreviewElement[];
  };
}

export function ElementsSortable({ data }: ElementsProps) {
  const [state, setState] = useState(data.elements || []);

  useEffect(() => {
    setState(data.elements);
  }, [data]);

  const modals: Partial<{ [key in PreviewElement["type"]]: ElementType }> = {
    text: TextModal,
  };

  return (
    <ReactSortable
      tag={"ul"}
      group={{
        name: "elements",
        pull: "clone",
        put: false,
      }}
      className="w-full h-full overflow-y-auto flex flex-col gap-2 my-6"
      sort={false}
      list={state}
      setList={setState}
    >
      {data.elements.map((item) => {
        const Modal = modals[item.type];

        const props: any = {
          text: {
            tag: item.tag,
            value: item.value,
          },
        };

        return (
          <li
            title={item.value}
            className="flex select-none justify-between items-center w-full p-1 px-2 gap-1 border shadow-sm rounded-lg"
            key={item.id}
          >
            <span className="truncate w-full cursor-grab">{item.value}</span>
            <DeleteModal id={item.id} {...props[item.type]} />
            {Modal && <Modal id={item.id} {...props[item.type]} />}
          </li>
        );
      })}
    </ReactSortable>
  );
}
