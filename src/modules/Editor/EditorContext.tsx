"use client";
import { ImageProps } from "@/types/components/image";
import { TextProps } from "@/types/components/text";
import { WrapperProps } from "@/types/components/wrapper";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

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

export interface EditorContextI {
  previewElements: {
    children: PreviewElement[];
  };
  tree: boolean;
  setTree: Dispatch<SetStateAction<EditorContextI["tree"]>>;
  subEditor: {
    open: boolean;
    element: PreviewElement | null;
  };
  setSubEditor: Dispatch<SetStateAction<EditorContextI["subEditor"]>>;
  preview: PreviewOptionsI<"code"> | PreviewOptionsI<"layout">;
  setPreview: Dispatch<SetStateAction<EditorContextI["preview"]>>;
  setPreviewElements: Dispatch<
    SetStateAction<EditorContextI["previewElements"]>
  >;
}

const EditorContext = createContext<EditorContextI>({
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

export function useEditor() {
  return useContext(EditorContext);
}

interface EditorProviderProps {
  children: ReactNode | ReactNode[];
}

export function EditorProvider({ children }: EditorProviderProps) {
  const [previewElements, setPreviewElements] = useState<
    EditorContextI["previewElements"]
  >({ children: [] });

  const [preview, setPreview] = useState<EditorContextI["preview"]>({
    type: "layout",
    option: "desktop",
    canEdit: true,
  });

  const [subEditor, setSubEditor] = useState<EditorContextI["subEditor"]>({
    open: false,
    element: null,
  });
  const [tree, setTree] = useState<boolean>(false);

  return (
    <EditorContext.Provider
      value={{
        tree,
        setTree,
        subEditor,
        setSubEditor,
        previewElements,
        setPreviewElements,
        preview,
        setPreview,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContext;
