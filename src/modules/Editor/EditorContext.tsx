"use client";
import { create } from "zustand";
import { ImageProps } from "@/types/components/image";
import { TextProps } from "@/types/components/text";
import { ContainerProps } from "@/types/components/container";
import { LinkProps } from "@/types/components/link";

export type PreviewElement =
  | ImageProps
  | TextProps
  | ContainerProps
  | LinkProps;

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
  setTree: (tree: boolean) => void;
  subEditor: {
    open: boolean;
    element: PreviewElement | null;
  };
  setSubEditor: (subEditor: Partial<EditorContextI["subEditor"]>) => void;
  preview: PreviewOptionsI<"code"> | PreviewOptionsI<"layout">;
  setPreview: (preview: Partial<EditorContextI["preview"]>) => void;
  setPreviewElements: (
    previewElements: Partial<EditorContextI["previewElements"]>
  ) => void;
  useEditElement: (data: Partial<PreviewElement>) => void;
}

export const useEditor = create<EditorContextI>((set) => ({
  previewElements: {
    children: [],
  },
  setPreviewElements: (previewElements) =>
    set(() => ({
      previewElements: previewElements as EditorContextI["previewElements"],
    })),
  tree: false,
  setTree: (tree) => set(() => ({ tree: tree })),
  subEditor: {
    open: false,
    element: null,
  },
  setSubEditor: (subEditor) =>
    set(() => ({ subEditor: subEditor as EditorContextI["subEditor"] })),
  preview: {
    type: "layout",
    option: "desktop",
    canEdit: true,
  },
  setPreview: (preview) =>
    set((state) => ({
      preview: { ...state.preview, ...(preview as EditorContextI["preview"]) },
    })),
  useEditElement: (data) =>
    set((state) => {
      const prevClone = { ...state.previewElements };

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

        const updateSubEditor = () => {
          const newSubEditor = { ...state.subEditor, element: newData };

          state.setSubEditor(newSubEditor);
        };
        updateSubEditor();
      };

      setDataByPath(data?.indexPath || [], data as PreviewElement);

      return { previewElements: prevClone };
    }),
}));
