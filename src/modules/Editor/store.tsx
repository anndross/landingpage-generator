import { create } from "zustand";
import { LinkProps } from "@/types/link";
import { ContainerProps } from "@/types/container";
import { TextProps } from "@/types/text";
import { ImageProps } from "@/types/image";
import { CSSProperties } from "react";
import { Update } from "@/services/editor/functions/update";

// 1. Precisa de um estado para gerenciar os objetos construidos pelo editor;

// 2. Precisa de um estado para gerenciar os estilos dos elementos;
//    1. Precisa gerenciar o estilo do elemento no layout;
//    2. Precisa gerenciar o estilo do elemento convertido;

// 3. Precisa de um estado para gerenciar as funções do editor;
//    1. Ligar/Desligar modo de edição;
//    2. Abir/Fechar árvore;
//    3. Selecionar modo de visualização: (desktop, tablet, mobile)
//    4. Abrir/Fechar barra lateral;
//    5. Selecionar código a ser convertido;
//       1. Selecionar visualização do código;
//       2. Selecionar visualização dos estilos;
//    6. Selecionar o elemento atual a ser editado

export type ElementsOptions = "container" | "text" | "image" | "link";
export type AllElementsOptions =
  | "layout"
  | "container"
  | "text"
  | "image"
  | "link";

export type ElementsType = ImageProps | TextProps | ContainerProps | LinkProps;

export type LayoutStyle = {
  all?: CSSProperties;
  sm?: CSSProperties;
  md?: CSSProperties;
  lg?: CSSProperties;
};

export type EditorStoreLayoutType = {
  id: string;
  type: "layout";
  name: string;
  settings: any;
  ownerId: string;
  children: ElementsType[];
  style: LayoutStyle;
};

export type EditorStoreStylesType = {
  layout?: Record<string, CSSProperties>;
  converted?: Record<string, CSSProperties>;
};

export type Breakpoints = "all" | "lg" | "md" | "sm";

export type CodeSelection = {
  language: "VTEX IO";
  viewStyles: boolean;
};

export type EditorStoreFunctionsType = {
  previewEditMode: boolean;
  currentElementToEdit: EditorStoreLayoutType | ElementsType | null;
  treeOpen: boolean;
  subEditorOpen: boolean;
  breakpoint: Breakpoints;
  viewLayout: boolean;
  sidebarOpen: boolean;
  codeSelection: CodeSelection;
};

const INITIAL_EDITOR_FUNCTIONS: EditorStore["editorFunctions"] = {
  previewEditMode: true,
  currentElementToEdit: null,
  treeOpen: false,
  sidebarOpen: true,
  viewLayout: true,
  subEditorOpen: false,
  breakpoint: "all",
  codeSelection: {
    language: "VTEX IO",
    viewStyles: false,
  },
};

export const INITIAL_LAYOUT: EditorStore["layout"] = {
  id: "",
  type: "layout",
  name: "",
  ownerId: "",
  children: [],
  settings: {},
  style: {
    all: {
      display: "flex",
      width: "100%",
      height: "100%",
      padding: "0",
      margin: "0",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "#fff",
      borderRadius: "0px",
      borderWidth: "0px",
      borderStyle: "solid",
      borderColor: "#000",
      boxShadow: "none",
      opacity: "1",
    },
  },
};

export type EditorStore = {
  layout: EditorStoreLayoutType;
  editorFunctions: EditorStoreFunctionsType;
  setLayout: (layout: EditorStoreLayoutType | ElementsType) => void;
  setEditorFunctions: (fn: Partial<EditorStore["editorFunctions"]>) => void;
};

export const useEditorStore = create<EditorStore>((set) => {
  return {
    layout: INITIAL_LAYOUT,
    editorFunctions: INITIAL_EDITOR_FUNCTIONS,
    setLayout: (data) =>
      set((state) => {
        const update = new Update(state.editorFunctions, state.layout);
        const tree = update.updateTree(data);

        if (state.editorFunctions.subEditorOpen) {
          state.setEditorFunctions({
            currentElementToEdit: data,
          });
        }

        return { layout: tree };
      }),
    setEditorFunctions: (data) =>
      set((state) => ({
        editorFunctions: { ...state.editorFunctions, ...data },
      })),
  };
});
