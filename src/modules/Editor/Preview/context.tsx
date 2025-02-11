import { AvailableTags } from "@/types/components/text";
import { createContext, Dispatch, SetStateAction } from "react";
import { ItemInterface } from "react-sortablejs";

export interface BaseProps {
  id: string;
  type: "text" | "image" | "wrapper";
}
export type ImageProps = BaseProps & {
  images: {
    url: string;
    alt: string;
    title: string;
    width: string;
    height: string;
  }[];
};

export type TextProps = BaseProps & {
  value: string;
  as: AvailableTags;
};

export type WrapperProps = BaseProps & {
  children: any[];
};

export type PreviewElement = ImageProps | TextProps | WrapperProps;

export type Options = {
  layout: "desktop" | "mobile";
  code: "VTEX IO";
};

export type PreviewType = "layout" | "code";

export type PreviewOption<T extends PreviewType> = T extends "layout"
  ? Options["layout"]
  : T extends "code"
    ? Options["code"]
    : never;

export interface PreviewOptionsI<T extends PreviewType = PreviewType> {
  type: T;
  option: PreviewOption<T>;
  canEdit: boolean;
}

export interface PreviewContextI {
  previewElements: PreviewElement[];
  preview: PreviewOptionsI<"code"> | PreviewOptionsI<"layout">;
  setPreview: Dispatch<SetStateAction<PreviewContextI["preview"]>>;
  setPreviewElements: Dispatch<
    SetStateAction<PreviewContextI["previewElements"]>
  >;
}

const PreviewContext = createContext<PreviewContextI>({
  previewElements: [],
  setPreviewElements: () => {},
  preview: {
    type: "layout",
    option: "desktop",
    canEdit: true,
  },
  setPreview: () => {},
});

export default PreviewContext;
