import { ReactNode } from "react";
import { Text as EditableText } from "@/mappedElements/editable/Text";
import { Wrapper as EditableWrapper } from "@/mappedElements/editable/Wrapper";
import { PreviewElement } from "@/modules/Editor/Preview/context";
import { TextProps } from "@/types/components/text";
import { WrapperProps } from "@/types/components/wrapper";

export function getEditableComponent(
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
