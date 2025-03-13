"use client";

import { CSSProperties, useCallback } from "react";
import { useEditorStore } from "./store";
import { debounce } from "lodash";
import { debounceTimeMs } from "@/helpers/debounce-time";

// Hook para obter configurações
export function useGetCurrentSettingProp(key: string) {
  const currentElementToEdit = useEditorStore(
    (state) => state.editorFunctions.currentElementToEdit
  );

  return currentElementToEdit?.settings?.[key] as string;
}

// Hook para obter estilos
export function useGetCurrentStyleProp(prop: keyof CSSProperties) {
  const currentElementToEdit = useEditorStore(
    (state) => state.editorFunctions.currentElementToEdit
  );

  const breakpoint = useEditorStore(
    (state) => state.editorFunctions.breakpoint
  );

  const currentProp = currentElementToEdit?.style?.[breakpoint]?.[prop];

  if (!currentProp) return currentElementToEdit?.style?.all?.[prop] as string;

  return currentProp as string;
}

// Hook para atualizar estilos com debounce
export function useDebouncedUpdateCurrentStyles() {
  const updateCurrentElementStyles = useEditorStore(
    (state) => state.updateCurrentElementStyles
  );
  const currentElementToEdit = useEditorStore(
    (state) => state.editorFunctions.currentElementToEdit
  );

  const updateStylesDebounced = useCallback(
    debounce(
      (styles: CSSProperties) => updateCurrentElementStyles(styles),
      debounceTimeMs
    ),
    [currentElementToEdit]
  );

  return updateStylesDebounced;
}

// Hook para atualizar configurações com debounce
export function useDebouncedUpdateCurrentSettings() {
  const updateCurrentElementSettings = useEditorStore(
    (state) => state.updateCurrentElementSettings
  );
  const currentElementToEdit = useEditorStore(
    (state) => state.editorFunctions.currentElementToEdit
  );

  const updateSettingsDebounced = useCallback(
    debounce(
      (settings: any) => updateCurrentElementSettings(settings),
      debounceTimeMs
    ),
    [currentElementToEdit]
  );

  return updateSettingsDebounced;
}
