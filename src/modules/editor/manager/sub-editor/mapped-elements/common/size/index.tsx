"use client";
import { useEditorStore } from "@/modules/editor/store";
import { SizeWidth } from "./SizeWidth";
import { SizeWidthUnit } from "./SizeWidthUnit";
import { SizeHeightUnit } from "./SizeHeightUnit";
import { SizeHeight } from "./SizeHeight";

export type UnitType = "px" | "%" | "em" | "rem" | "vw" | "vh";

export function Size() {
  const { currentElementToEdit, breakpoint } = useEditorStore(
    (state) => state.editorFunctions
  );

  const currentStyle = currentElementToEdit?.style[breakpoint];

  const currentWidth = Number(
    currentStyle?.width?.toString()?.replace(/\D+/, "")
  );
  const currentHeight = Number(
    currentStyle?.height?.toString()?.replace(/\D+/, "")
  );

  const currentWidthUnit = currentStyle?.width?.toString()?.replace(/\d+/, "");
  const currentHeightUnit = currentStyle?.height
    ?.toString()
    ?.replace(/\d+/, "");

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">Layout</span>
      <div className="flex gap-2 ">
        <div className="flex w-full">
          <SizeWidth
            currentWidth={currentWidth}
            currentWidthUnit={currentWidthUnit as UnitType}
          />
          <SizeWidthUnit
            currentWidthUnit={currentWidthUnit as UnitType}
            currentWidth={currentWidth}
          />
        </div>
        <div className="flex w-full">
          <SizeHeight
            currentHeight={currentHeight}
            currentHeightUnit={currentHeightUnit as UnitType}
          />
          <SizeHeightUnit
            currentHeightUnit={currentHeightUnit as UnitType}
            currentHeight={currentHeight}
          />
        </div>
      </div>
    </div>
  );
}
