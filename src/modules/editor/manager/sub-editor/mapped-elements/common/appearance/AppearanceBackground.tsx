"use client";

import { useEffect, useState } from "react";
import { ColorPicker } from "@/components/ColorPicker";
import {
  useDebouncedUpdateCurrentStyles,
  useGetCurrentStyleProp,
} from "@/modules/editor/hooks";

export function AppearanceBackground() {
  const defaultBackgroundColor = useGetCurrentStyleProp("backgroundColor");

  const [backgroundColor, setBackgroundColor] = useState(
    defaultBackgroundColor || "#fff"
  );

  const updateStylesDebounced = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    if (backgroundColor) updateStylesDebounced({ backgroundColor });
  }, [backgroundColor]);

  return (
    <ColorPicker
      color={backgroundColor || "#fff"}
      setColor={(color) => setBackgroundColor(color)}
    />
  );
}
