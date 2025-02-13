"use client";
import { ReactSortable } from "react-sortablejs";
import { ReactNode, useState } from "react";
import { PreviewElement } from "@/modules/Editor/Preview/context";
import { Text } from "./Elements/Text";
import { Wrapper } from "./Elements/Wrapper";

export interface ElementsProps {
  data: PreviewElement[];
}

export function Explorer({}: ElementsProps) {
  const [state, setState] = useState<PreviewElement[]>([
    {
      id: "texto",
      type: "text",
      as: "p",
      value: "Texto",
    },
    {
      id: "wrapper",
      type: "wrapper",
      children: [],
    },
  ]);

  return (
    <ReactSortable
      tag={"div"}
      group={{
        name: "shared",
        pull: "clone",
        put: false,
      }}
      animation={150}
      swapThreshold={0.65}
      fallbackOnBody
      ghostClass="ghost"
      className="w-full h-full overflow-y-auto grid grid-cols-2 gap-2"
      list={state}
      setList={setState}
    >
      {state.map((item) => {
        const elements: Partial<{
          [key in PreviewElement["type"]]: ReactNode;
        }> = {
          text: <Text key={item.id} />,
          wrapper: <Wrapper key={item.id} />,
        };

        const element: ReactNode = elements?.[item.type];

        return element;
      })}
    </ReactSortable>
  );
}
