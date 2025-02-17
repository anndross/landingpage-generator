"use client";
import { getEditableElement } from "@/modules/Editor/mappedElements/utils/getEditableElement";
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
    <div className="w-full h-full">
      <ReactSortable
        tag={tag}
        className={clsx({
          "w-full h-full bg-white p-5 flex flex-col": true,
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
          const element = getEditableElement(canEdit, item);

          return element;
        })}
      </ReactSortable>
    </div>
  );
}
