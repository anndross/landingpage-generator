"use client";

import { CSSProperties } from "react";
import {
  EditorStoreLayoutType,
  ElementsType,
  useEditorStore,
} from "@/modules/Editor/store";

// Hook para atualizar estilos
export function useUpdateCurrentStyles() {
  const {
    editorFunctions: { currentElementToEdit, breakpoint },
    setLayout,
  } = useEditorStore();

  return (styles: CSSProperties) => {
    setLayout({
      ...currentElementToEdit,
      style: {
        ...currentElementToEdit?.style,
        [breakpoint]: {
          ...(currentElementToEdit?.style?.[breakpoint] || {}),
          ...styles,
        },
      },
    } as EditorStoreLayoutType | ElementsType);
  };
}

// Hook para obter estilos
export function useGetCurrentStyles(prop: keyof CSSProperties) {
  const {
    editorFunctions: { currentElementToEdit, breakpoint },
  } = useEditorStore();

  return currentElementToEdit?.style?.[breakpoint]?.[prop] as string;
}

// Hook para atualizar configurações
export function useUpdateCurrentSettings() {
  const {
    editorFunctions: { currentElementToEdit },
    setLayout,
  } = useEditorStore();

  return (settings: any) => {
    setLayout({
      ...currentElementToEdit,
      settings: {
        ...currentElementToEdit?.settings,
        ...settings,
      },
    } as EditorStoreLayoutType | ElementsType);
  };
}

// Hook para obter configurações
export function useGetCurrentSettings(key: string) {
  const {
    editorFunctions: { currentElementToEdit },
  } = useEditorStore();

  return currentElementToEdit?.settings?.[key] as string;
}
