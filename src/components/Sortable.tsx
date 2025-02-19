"use client";
import { getElement } from "@/modules/Editor/Preview/Layout/mappedElements/utils/getElement";
import { PreviewElement, useEditor } from "@/modules/Editor/EditorContext";
import clsx from "clsx";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { CSSProperties } from "react";

interface SortableProps {
  state: PreviewElement[];
  setState: (newState: ItemInterface[]) => void;
  tag: "main" | "div";
  style?: CSSProperties;
}

export function Sortable({ tag, state, setState, style }: SortableProps) {
  const {
    preview: { canEdit },
  } = useEditor();

  return (
    <ReactSortable
      tag={tag}
      className={clsx({
        "w-full h-full p-5 flex flex-col": tag === "main",
      })}
      style={style}
      group={{
        name: "shared",
        pull: true,
        put: true,
      }}
      animation={150}
      swapThreshold={0.65}
      fallbackOnBody
      ghostClass="ghost"
      list={state}
      setList={(newState) => {
        setState(newState);
      }}
    >
      {state.map((item) => {
        const element = getElement(canEdit, item);

        return element;
      })}
    </ReactSortable>
  );
}
