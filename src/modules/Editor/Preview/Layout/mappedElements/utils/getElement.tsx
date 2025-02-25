import { ReactNode } from "react";
import { Text as EditableText } from "@/modules/Editor/Preview/Layout/mappedElements/Text";
import { Container as EditableContainer } from "@/modules/Editor/Preview/Layout/mappedElements/Container";
import { Image as EditableImage } from "@/modules/Editor/Preview/Layout/mappedElements/Image";
import { Link as EditableLink } from "@/modules/Editor/Preview/Layout/mappedElements/Link";
import { TextProps } from "@/types/components/text";
import { ContainerProps } from "@/types/components/container";
import { PreviewElement } from "@/modules/Editor/context";
import { ImageProps } from "@/types/components/image";
import { LinkProps } from "@/types/components/link";

export function getElement(canEdit: boolean, data: PreviewElement) {
  const editableElements: Partial<{
    [key in PreviewElement["type"]]: ReactNode;
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
