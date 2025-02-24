"use client";
import { ReactSortable } from "react-sortablejs";
import { ReactNode, useState } from "react";
import { Text } from "./mappedElements/Text";
import { Container } from "./mappedElements/Container";
import { PreviewElement } from "@/modules/Editor/EditorContext";
import dataElements from "@/modules/Editor/data/elements.json";
import { Image } from "./mappedElements/Image";
import { Link } from "./mappedElements/Link";

export function Elements() {
  const [state, setState] = useState<PreviewElement[]>(
    dataElements as PreviewElement[]
  );

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
      className="w-full h-full grid grid-cols-2 place-content-start gap-2"
      list={state}
      setList={setState}
    >
      {state.map((item) => {
        const elements: Partial<{
          [key in PreviewElement["type"]]: ReactNode;
        }> = {
          text: <Text key={item.id} />,
          container: <Container key={item.id} />,
          image: <Image key={item.id} />,
          link: <Link key={item.id} />,
        };

        const element: ReactNode = elements?.[item.type];

        return element;
      })}
    </ReactSortable>
  );
}
