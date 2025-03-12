import { CSSProperties } from "react";
import { EditorStore, ElementsType, useEditorStore } from "../../store";
import {
  AllElementProperties,
  ElementProperties,
} from "@/types/elementProperties";

// ------------------ HOOKS PARA OS ESTILOS ------------------
export function GetStyleProperty(
  element: EditorStore["layout"] | ElementsType,
  style: keyof CSSProperties
): string | number | undefined {
  const {
    editorFunctions: { breakpoint },
  } = useEditorStore();

  return element.style[breakpoint]?.[style];
}

export function GetStyles(
  element: EditorStore["layout"] | ElementsType
): CSSProperties | undefined {
  const {
    editorFunctions: { breakpoint },
  } = useEditorStore();

  return element.style[breakpoint];
}

export function useUpdateStyles(): (
  element: EditorStore["layout"] | ElementsType,
  styles: CSSProperties
) => void {
  const {
    setLayout,
    editorFunctions: { breakpoint },
  } = useEditorStore();

  return (element, styles) => {
    setLayout({
      ...element,
      style: {
        ...element.style,
        [breakpoint]: {
          ...element.style[breakpoint],
          ...styles,
        },
      },
    });
  };
}

// ------------------ HOOKS PARA AS CONFIGURAÇÕES ------------------
export function GetSettingsProperty(
  element: EditorStore["layout"] | ElementsType,
  prop: keyof AllElementProperties
): string | undefined {
  return `${element.settings[prop]}`;
}

export function GetSettings(
  element: EditorStore["layout"] | ElementsType
): EditorStore["layout"]["settings"] {
  return element.settings;
}

export function UpdateSettings(
  element: EditorStore["layout"] | ElementsType,
  settings: Partial<ElementProperties>
): void {
  const { setLayout } = useEditorStore();

  setLayout({
    ...element,
    settings: {
      ...element.settings,
      ...settings,
    },
  });

  return;
}
