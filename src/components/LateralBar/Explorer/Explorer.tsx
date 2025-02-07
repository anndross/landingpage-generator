"use client";
import { ReactSortable } from "react-sortablejs";
import { ReactNode, useEffect, useState } from "react";
import { PreviewElement } from "@/components/Preview/context";
import { Text } from "./Elements/Text";
import { Wrapper } from "./Elements/Wrapper";
import { handleToDelete } from "./Elements/ModalDelete/Action";

export interface ElementsProps {
  data: PreviewElement[];
}

export function Explorer({ data }: ElementsProps) {
  const [state, setState] = useState(data || []);

  useEffect(() => {
    setState(data);
  }, [data]);

  console.log("Explorer state:", state);

  return (
    <ReactSortable
      tag={"div"}
      group={{
        name: "shared",
        pull: true,
        put: true,
      }}
      animation={150}
      swapThreshold={0.65}
      fallbackOnBody
      ghostClass="ghost"
      className="w-full h-full overflow-y-auto flex flex-col gap-2 my-6"
      list={state}
      setList={setState}
    >
      {state.map((item) => {
        const elements: Partial<{
          [key in PreviewElement["type"]]: ReactNode;
        }> = {
          text: (
            <Text
              key={item.id}
              id={item.id}
              value={item.value}
              tag={item.tag}
            />
          ),
          wrapper: <Wrapper setList={setState} key={item.id} id={item.id} />,
        };

        const element: ReactNode = elements?.[item.type] || <></>;

        return element;
      })}
    </ReactSortable>
  );
}
