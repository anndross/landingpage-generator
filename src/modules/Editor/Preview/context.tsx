import { AvailableTags } from "@/types/components/text";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ItemInterface } from "react-sortablejs";

export interface BaseProps extends ItemInterface {
  id: string;
  type: "text" | "image" | "wrapper";
  indexPath: number[]; // Referência ao elemento pai
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
  children: PreviewElement[];
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
  previewElements: {
    children: PreviewElement[];
  };
  tree: boolean;
  setTree: Dispatch<SetStateAction<PreviewContextI["tree"]>>;
  subEditor: {
    open: boolean;
    element: PreviewElement | null;
  };
  setSubEditor: Dispatch<SetStateAction<PreviewContextI["subEditor"]>>;
  preview: PreviewOptionsI<"code"> | PreviewOptionsI<"layout">;
  setPreview: Dispatch<SetStateAction<PreviewContextI["preview"]>>;
  setPreviewElements: Dispatch<
    SetStateAction<PreviewContextI["previewElements"]>
  >;
}

const PreviewContext = createContext<PreviewContextI>({
  previewElements: {
    children: [],
  },
  tree: false,
  setTree: () => {},
  subEditor: {
    open: false,
    element: null,
  },
  setSubEditor: () => {},
  setPreviewElements: () => {},
  preview: {
    type: "layout",
    option: "desktop",
    canEdit: true,
  },
  setPreview: () => {},
});

export function usePreview() {
  return useContext(PreviewContext);
}

export default PreviewContext;
