"use client";
import { getElement } from "@/modules/Editor/Preview/PreviewLayout/mappedElements/utils/getElement";
import { useEditorStore } from "@/modules/Editor/context";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { CSSProperties, HTMLAttributes } from "react";
import { Element } from "@/types/element";

interface DrawerProps {
  state: Element[];
  setState: (newState: ItemInterface[]) => void;
  tag: "main" | "div";
  style?: CSSProperties;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export function Drawer({
  tag,
  state,
  setState,
  style,
  className,
}: DrawerProps) {
  const {
    editorFunctions: { previewEditMode },
  } = useEditorStore();

  return (
    <ReactSortable
      className={className}
      tag={tag}
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
        const element = getElement(previewEditMode, item);

        return element;
      })}
    </ReactSortable>
  );
}
