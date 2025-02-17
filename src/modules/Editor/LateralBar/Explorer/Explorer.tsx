"use client";
import { ReactSortable } from "react-sortablejs";
import { ReactNode, useState } from "react";
import { Text } from "./Elements/Text";
import { Wrapper } from "./Elements/Wrapper";
import { TextProps } from "@/types/components/text";
import { WrapperProps } from "@/types/components/wrapper";
import { PreviewElement } from "@/modules/Editor/EditorContext";

export interface ElementsProps {
  data: PreviewElement[];
}

export function Explorer({}: ElementsProps) {
  const [state, setState] = useState<PreviewElement[]>([
    {
      id: "texto",
      type: "text",
      settings: {
        as: "p",
        value: "Texto",
        link: "",
      },
      style: {
        color: "#000",
        fontSize: "14px",
        fontStyle: "normal",
        fontFamily: "Arial",
        fontWeight: "500",
      },
    } as TextProps,
    {
      id: "wrapper",
      type: "wrapper",
      indexPath: [],
      children: [],
      style: {
        backgroundColor: "#fff",
        borderRadius: "0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#000",
        boxShadow: "none",
        opacity: "1",
      },
      settings: {
        width: "900px",
        height: "300px",
        padding: "0",
        margin: "0",
      },
    } as WrapperProps,
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
      sort={false}
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
