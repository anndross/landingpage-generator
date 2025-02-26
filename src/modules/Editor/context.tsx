"use client";
import { create } from "zustand";
import { BaseProps } from "@/types/base";
import layoutJSON from "@/shared/editor/data/layout.json";
import { Element } from "@/types/element";
import { Preview } from "@/types/preview";
import { updateCurrentPreviewOnDB } from "@/shared/editor/services/update";

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
  style: boolean;
}

export type EditableElement = Element & {
  type: BaseProps["type"] | "layout";
};

export interface EditorContextI {
  previewElements: Preview;
  tree: boolean;
  setTree: (tree: boolean) => void;
  subEditor: {
    open: boolean;
    element: Element | EditorContextI["previewElements"] | null;
  };
  setSubEditor: (subEditor: Partial<EditorContextI["subEditor"]>) => void;
  preview: PreviewOptionsI<"code"> | PreviewOptionsI<"layout">;
  setPreview: (preview: Partial<EditorContextI["preview"]>) => void;
  setPreviewElements: (
    previewElements: Partial<EditorContextI["previewElements"]>
  ) => void;
  useEditElement: (data: EditableElement) => void;
}

export const useEditor = create<EditorContextI>((set) => ({
  previewElements: layoutJSON as Preview,
  setPreviewElements: (previewElements) =>
    set((state) => ({
      previewElements: {
        ...state.previewElements,
        ...(previewElements as EditorContextI["previewElements"]),
      },
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
    style: false,
  },
  setPreview: (preview) =>
    set((state) => ({
      preview: { ...state.preview, ...(preview as EditorContextI["preview"]) },
    })),
  useEditElement: (data) =>
    set((state: any) => {
      if (data.type.includes("layout")) {
        return {
          previewElements: {
            ...state.previewElements,
            ...data,
          },
        };
      }

      const prevClone = { ...state.previewElements };

      const setDataByPath = (path: number[], newData: Element) => {
        let current: EditorContextI["previewElements"] | Element = prevClone;

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

      setDataByPath(data?.indexPath || [], data as Element);

      return { previewElements: prevClone };
    }),
}));
