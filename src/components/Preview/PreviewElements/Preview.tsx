"use client";
import { ReactSortable } from "react-sortablejs";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Text as EditableText } from "@/mappedComponents/editableComponents/Text";
import { Wrapper as EditableWrapper } from "@/mappedComponents/editableComponents/Wrapper";
import PreviewContext, { PreviewElement } from "../context";

export const Preview = ({ data }: any) => {
  const [state, setState] = useState<PreviewElement[]>([]);
  const { previewElements, setPreviewElements } = useContext(PreviewContext);

  console.log("Preview state:", state);

  useEffect(() => {
    setState(data);
    setPreviewElements(data);
  }, [data]);

  useEffect(() => {
    async function createPreview() {
      await fetch("/api/preview/create", {
        method: "POST",
        body: JSON.stringify({
          items: state,
        }),
      });

      setPreviewElements(state);
    }

    if (state.length) createPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, previewElements]);

  return (
    <ReactSortable
      tag={"main"}
      className="w-full h-full bg-white p-4 flex flex-col"
      group={{
        name: "shared",
        pull: true,
        put: true,
      }}
      animation={150}
      swapThreshold={0.65}
      fallbackOnBody
      removeOnSpill
      ghostClass="ghost"
      list={state}
      setList={setState}
    >
      {state.map((item) => {
        const elements: Partial<{
          [key in PreviewElement["type"]]: ReactNode;
        }> = {
          text: (
            <EditableText
              id={item.id}
              as={item.tag || "h1"}
              value={item.value || ""}
              key={item.id}
            />
          ),
          wrapper: <EditableWrapper key={item.id} childs={item.children} />,
        };

        return elements[item.type];
      })}
    </ReactSortable>
  );
};
