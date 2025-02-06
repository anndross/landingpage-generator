import { AvailableTags } from "@/types/components/text";
import { createContext, Dispatch, SetStateAction } from "react";
import { ItemInterface } from "react-sortablejs";

export interface ImageElementI {
  images: {
    url: string;
    alt: string;
    title: string;
    width: string;
    height: string;
  }[];
}

export interface TextElementI {
  value: string;
  tag: AvailableTags;
}

export interface PreviewElement
  extends Partial<ImageElementI>,
    Partial<TextElementI>,
    ItemInterface {
  name: string;
  _id: string | number
  type: "text" | "image";
}

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
}

export interface PreviewContextI {
  previewElements: PreviewElement[] | undefined;
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
  },
  setPreview: () => {},
});

export default PreviewContext;
