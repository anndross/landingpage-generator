"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { UnitType } from ".";
import { useDebouncedUpdateCurrentStyles } from "@/modules/editor/hooks";

interface SizeWidthProps {
  currentWidth: number;
  currentWidthUnit: UnitType;
}

export function SizeWidth({ currentWidth, currentWidthUnit }: SizeWidthProps) {
  const [width, setWidth] = useState<number>(currentWidth);

  const debouncedUpdate = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    if (width !== currentWidth) {
      debouncedUpdate({
        width: width + currentWidthUnit,
      });
    }
  }, [width]);

  return (
    <Input
      type="number"
      id="width-input"
      className="rounded-r-none border-r-0 shadow-none"
      value={width || 100}
      onChange={(evt) => {
        setWidth(Number(evt.target.value) || 0);
      }}
      placeholder="Largura"
    />
  );
}
