"use client";
import { ReactSortable } from "react-sortablejs";
import { ReactNode, useState } from "react";
import { Text } from "./mappedElements/Text";
import { Container } from "./mappedElements/Container";
import dataElements from "@/shared/editor/data/elements.json";
import { Image } from "./mappedElements/Image";
import { Link } from "./mappedElements/Link";
import clsx from "clsx";
import { ElementsType } from "../../store";

export function Elements() {
  const [state, setState] = useState<ElementsType[]>(
    dataElements as ElementsType[]
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
      className={clsx({
        "w-full h-[100%-80px] overflow-y-auto grid grid-cols-2 place-content-start gap-2":
          true,
      })}
      list={state}
      setList={setState}
    >
      {state.map((item) => {
        const elements: Partial<{
          [key in ElementsType["type"]]: ReactNode;
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
