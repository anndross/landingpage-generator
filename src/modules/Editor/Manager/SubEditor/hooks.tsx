"use client";

import { CSSProperties } from "react";
import { EditorStoreLayoutType, useEditorStore } from "../../context";

export function UpdateCurrentStyles(styles: any) {
  const {
    editorFunctions: { currentElementToEdit, breakpoint },
    setLayout,
  } = useEditorStore();

  setLayout({
    ...currentElementToEdit,
    style: {
      ...currentElementToEdit?.style[breakpoint],
      [breakpoint]: {
        ...styles,
      },
    },
  } as EditorStoreLayoutType);
}

export function GetCurrentStyles(prop: keyof CSSProperties): string {
  const {
    editorFunctions: { currentElementToEdit, breakpoint },
  } = useEditorStore();

  return currentElementToEdit?.style?.[breakpoint]?.[prop] as string;
}
