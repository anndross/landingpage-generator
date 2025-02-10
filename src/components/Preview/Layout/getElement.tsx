import { ReactNode } from "react";
import { Text as EditableText } from "@/mappedComponents/editableComponents/Text";
import { Wrapper as EditableWrapper } from "@/mappedComponents/editableComponents/Wrapper";
import { PreviewElement, TextProps, WrapperProps } from "../context";

export function getElement(
  type: PreviewElement["type"],
  canEdit: boolean,
  props: PreviewElement
) {
  const editableElements: Partial<{
    [key in PreviewElement["type"]]: ReactNode;
  }> = {
    text: <EditableText {...(props as TextProps)} key={props.id} />,
    wrapper: <EditableWrapper {...(props as WrapperProps)} key={props.id} />,
  };

  if (canEdit) return editableElements[type];

  return <div key={props.id}></div>;
}
