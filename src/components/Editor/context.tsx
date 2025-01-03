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

export interface PreviewElements extends Partial<ImageElementI>, ItemInterface {
  _id: string | number;
  name: string;
  type: "text" | "image";
}

export interface EditorContextI {
  previewElements: PreviewElements[];
  setPreviewElements: Dispatch<
    SetStateAction<EditorContextI["previewElements"]>
  >;
}

const EditorContext = createContext<EditorContextI>({
  previewElements: [],
  setPreviewElements: () => {},
});

export default EditorContext;
