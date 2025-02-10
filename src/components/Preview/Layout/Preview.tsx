"use client";
import { ReactSortable } from "react-sortablejs";
import { useContext, useEffect, useState } from "react";
import PreviewContext, { PreviewElement } from "../context";
import { getElement } from "./getElement";
import LayoutContext from "./context";

export const Preview = ({ data }: any) => {
  const [state, setState] = useState<PreviewElement[]>([]);
  const {
    preview: { canEdit },
    previewElements,
    setPreviewElements,
  } = useContext(PreviewContext);

  useEffect(() => {
    setPreviewElements([...state]);
  }, [state]);

  // useEffect(() => {
  //   async function createPreview() {
  //     await fetch("/api/preview/create", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         items: state,
  //       }),
  //     });

  //     setPreviewElements(state);
  //   }

  //   if (state.length) createPreview();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state, previewElements]);
  // console.log("layout State", state);

  console.log("Preview", state);

  return (
    <LayoutContext.Provider value={{ state, setState }}>
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
        setList={(newState) => {
          // console.log("layout New State", newState);
          const mappedNewState = newState.map((item) => ({
            ...item,
            id: item.id?.startsWith("clone-")
              ? item.id
              : `clone-${crypto.randomUUID()}`,
          }));

          setState(mappedNewState);
        }}
      >
        {state.map((item) => {
          const element = getElement(item.type, canEdit, item);

          return element;
        })}
      </ReactSortable>
    </LayoutContext.Provider>
  );
};
