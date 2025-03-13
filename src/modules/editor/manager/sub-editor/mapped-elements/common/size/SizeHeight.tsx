import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { UnitType } from ".";
import { useDebouncedUpdateCurrentStyles } from "@/modules/editor/hooks";

interface SizeHeightProps {
  currentHeight: number;
  currentHeightUnit: UnitType;
}

export function SizeHeight({
  currentHeight,
  currentHeightUnit,
}: SizeHeightProps) {
  const [height, setHeight] = useState<number>(currentHeight);

  const debouncedUpdate = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    debouncedUpdate({
      height: height + currentHeightUnit,
    });
  }, [height]);

  return (
    <Input
      type="number"
      id="height-input"
      className="rounded-r-none border-r-0 shadow-none"
      value={height || 100}
      onChange={(evt) => {
        setHeight(Number(evt.target.value) || 0);
      }}
      placeholder="Altura"
    />
  );
}
