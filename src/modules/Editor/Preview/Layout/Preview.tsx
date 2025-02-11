"use client";
import { ReactSortable } from "react-sortablejs";
import { useContext, useEffect, useState } from "react";
import PreviewContext, { PreviewElement } from "../context";
import { getElement } from "./getElement";
import LayoutContext from "./context";
import { Sortable } from "@/components/Sortable";

export const Preview = ({ data }: any) => {
  const {
    preview: { canEdit },
    // previewElements,
    // setPreviewElements,
  } = useContext(PreviewContext);
  const [state, setState] = useState<PreviewElement[]>([]);

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

  return (
    <Sortable tag="main" setState={setState} state={state}>
      {state.map((item) => {
        const element = getElement(item.type, canEdit, item);

        return element;
      })}
    </Sortable>
  );
};
