"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useDebouncedUpdateCurrentStyles,
  useGetCurrentStyleProp,
} from "@/modules/editor/hooks";

export function AppearanceOpacity() {
  const defaultOpacity = useGetCurrentStyleProp("opacity");

  const [opacity, setOpacity] = useState(defaultOpacity || 1);

  const updateStylesDebounced = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    if (opacity) updateStylesDebounced({ opacity });
  }, [opacity]);

  return (
    <Input
      max={1}
      min={0}
      value={opacity || 1}
      onChange={(evt) => setOpacity(evt.target.value)}
      type="number"
      placeholder="Opacidade"
    />
  );
}
