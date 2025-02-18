import { ReactNode } from "react";
import { Text as EditableText } from "@/modules/Editor/Preview/Layout/mappedElements/Text";
import { Wrapper as EditableWrapper } from "@/modules/Editor/Preview/Layout/mappedElements/Wrapper";
import { TextProps } from "@/types/components/text";
import { WrapperProps } from "@/types/components/wrapper";
import { PreviewElement } from "@/modules/Editor/EditorContext";

export function getElement(canEdit: boolean, data: PreviewElement) {
  const editableElements: Partial<{
    [key in PreviewElement["type"]]: ReactNode;
  }> = {
    text: <EditableText data={data as TextProps} key={data.id} />,
    wrapper: <EditableWrapper data={data as WrapperProps} key={data.id} />,
  };

  if (canEdit) return editableElements[data.type];

  return <div key={data.id}></div>;
}
