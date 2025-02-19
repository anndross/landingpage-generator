import { ReactNode } from "react";
import { Text as EditableText } from "@/modules/Editor/Preview/Layout/mappedElements/Text";
import { Container as EditableContainer } from "@/modules/Editor/Preview/Layout/mappedElements/Container";
import { TextProps } from "@/types/components/text";
import { ContainerProps } from "@/types/components/container";
import { PreviewElement } from "@/modules/Editor/EditorContext";

export function getElement(canEdit: boolean, data: PreviewElement) {
  const editableElements: Partial<{
    [key in PreviewElement["type"]]: ReactNode;
  }> = {
    text: <EditableText data={data as TextProps} key={data.id} />,
    container: (
      <EditableContainer data={data as ContainerProps} key={data.id} />
    ),
  };

  if (canEdit) return editableElements[data.type];

  return <div key={data.id}></div>;
}
