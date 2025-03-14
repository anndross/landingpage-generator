import { ReactNode } from "react";
import { Text as EditableText } from "@/modules/editor/preview/preview-layout/mapped-elements/Text";
import { Container as EditableContainer } from "@/modules/editor/preview/preview-layout/mapped-elements/Container";
import { Image as EditableImage } from "@/modules/editor/preview/preview-layout/mapped-elements/Image";
import { Link as EditableLink } from "@/modules/editor/preview/preview-layout/mapped-elements/Link";
import { TextProps } from "@/types/text";
import { ContainerProps } from "@/types/container";
import { ImageProps } from "@/types/image";
import { LinkProps } from "@/types/link";
import { Element } from "@/types/element";

export function getElement(canEdit: boolean, data: Element) {
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
