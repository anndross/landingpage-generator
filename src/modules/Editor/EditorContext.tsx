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
  useEditElement: (data: PreviewElement) => void;
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
  setPreview: () => {},
  preview: {
    type: "layout",
    option: "desktop",
    canEdit: true,
  },
  useEditElement: () => {},
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

  const useEditElement = (data: PreviewElement) => {
    setPreviewElements((prev) => {
      const prevClone = { ...prev };

      const setDataByPath = (path: number[], newData: PreviewElement) => {
        let current: EditorContextI["previewElements"] | PreviewElement =
          prevClone;

        for (let i = 0; i < path.length - 1; i++) {
          current = current?.children[path[i]];
        }

        // Obtém o índice final do caminho
        const lastIndex = path[path.length - 1];

        if (current?.children && lastIndex !== undefined) {
          current.children[lastIndex] = newData; // Aqui alteramos diretamente a referência correta
        }

        setSubEditor((prev) => ({
          ...prev,
          element: newData,
        }));
      };

      setDataByPath(data?.indexPath || [], data as PreviewElement);

      return prevClone;
    });
  };

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
        useEditElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContext;
