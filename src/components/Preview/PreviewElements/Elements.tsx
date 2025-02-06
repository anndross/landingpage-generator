'use client';
import { ReactSortable } from "react-sortablejs";
import { useContext, useEffect, useState } from "react";
import { PreviewElements } from "../../Editor/context";
import { Text as EditableText } from "@/mappedComponents/editableComponents/Text";
import PreviewContext from "../context";

export const Elements = ({data}: any) => {
  const [state, setState] = useState<PreviewElements[]>([]);
  const { previewElements, setPreviewElements } = useContext(PreviewContext);

  useEffect(() => {
    setState(data)
    setPreviewElements(data)
  }, [data])

  useEffect(() => {
    async function createPreview() {
      await fetch('/api/preview/create', {
        method: "POST",
        body: JSON.stringify({
         items: state
        }),
      })

      setPreviewElements(state);
    }

    if(state.length)
      createPreview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, previewElements]);

  return (
    <ReactSortable
      className="w-full h-full bg-white p-4 flex flex-col"
      group={{
        name: "elements",
        pull: true,
        put: true,
      }}
      dropBubble
      list={state}
      setList={(newState) => {
        setState(Array.from(new Set(newState)));
      }}
    >
      {state.map((item) => {
        return <EditableText id={item.id} as={item.tag} value={item.value} key={item.id} />;
      })}
    </ReactSortable>
  );
};
