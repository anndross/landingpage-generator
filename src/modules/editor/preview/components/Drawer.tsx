"use client";
import { useEditorStore } from "@/modules/editor/store";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  Ref,
  useCallback,
} from "react";
import { Element } from "@/types/element";
import { ReactNode } from "react";
import { Text as EditableText } from "@/modules/editor/preview/preview-layout/mapped-elements/Text";
import { Container as EditableContainer } from "@/modules/editor/preview/preview-layout/mapped-elements/Container";
import { Image as EditableImage } from "@/modules/editor/preview/preview-layout/mapped-elements/Image";
import { Link as EditableLink } from "@/modules/editor/preview/preview-layout/mapped-elements/Link";
import { TextProps } from "@/types/text";
import { ContainerProps } from "@/types/container";
import { ImageProps } from "@/types/image";
import { LinkProps } from "@/types/link";

function getElement(canEdit: boolean, data: Element) {
  const editableElements: Partial<{
    [key in Element["type"]]: ReactNode;
  }> = {
    text: <EditableText data={data as TextProps} key={data.id} />,
    container: (
      <EditableContainer data={data as ContainerProps} key={data.id} />
    ),
    image: <EditableImage data={data as ImageProps} key={data.id} />,
    link: <EditableLink data={data as LinkProps} key={data.id} />,
  };

  if (canEdit) return editableElements[data.type];

  return <div key={data.id}></div>;
}

interface DrawerProps {
  state: Element[];
  setState: (newState: ItemInterface[]) => void;
  tag: "main" | "div";
  style?: CSSProperties;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export const Drawer = forwardRef(function Drawer(
  { tag, state, setState, style, className }: DrawerProps,
  ref: Ref<ReactSortable<Element>>
) {
  const {
    editorFunctions: { previewEditMode },
  } = useEditorStore();

  const getElementMemoized = useCallback(
    (canEdit: boolean, data: Element) => getElement(canEdit, data),
    []
  );

  return (
    <ReactSortable
      ref={ref as Ref<ReactSortable<Element>>}
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
      {state?.map((item) => getElementMemoized(previewEditMode, item))}
    </ReactSortable>
  );
});
