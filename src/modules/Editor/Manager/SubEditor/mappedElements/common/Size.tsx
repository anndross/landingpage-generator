"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditorStore } from "@/modules/Editor/store";
import { useCallback, useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";
import { useUpdateCurrentStyles } from "@/modules/Editor/Manager/SubEditor/hooks";
import { debounce } from "lodash";

type UnitType = "px" | "%" | "em" | "rem" | "vw" | "vh";

export function Size() {
  const { currentElementToEdit, breakpoint } = useEditorStore(
    (state) => state.editorFunctions
  );

  const type = currentElementToEdit?.type;

  const defaultWidthUnit = "%";
  const defaultHeightUnit = type === "layout" ? "%" : "px";

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

  const updateStyles = useUpdateCurrentStyles();
  const debouncedUpdate = useCallback(
    debounce(
      (data: { width?: string; height?: string }) => updateStyles(data),
      200
    ),
    [currentElementToEdit?.id]
  );

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">Layout</span>
      <div className="flex gap-2 ">
        <div className="flex w-full">
          <WidthInput
            currentWidth={currentWidth}
            currentWidthUnit={currentWidthUnit as UnitType}
            debouncedUpdate={debouncedUpdate}
          />
          <WidthUnitSelect
            currentWidthUnit={currentWidthUnit as UnitType}
            currentWidth={currentWidth}
            debouncedUpdate={debouncedUpdate}
          />
        </div>
        <div className="flex w-full">
          <HeightInput
            currentHeight={currentHeight}
            currentHeightUnit={currentHeightUnit as UnitType}
            debouncedUpdate={debouncedUpdate}
          />
          <HeightUnitSelect
            currentHeightUnit={currentHeightUnit as UnitType}
            currentHeight={currentHeight}
            debouncedUpdate={debouncedUpdate}
          />
        </div>
      </div>
    </div>
  );
}

interface SizeProps {
  currentWidth: number;
  currentWidthUnit: UnitType;
  defaultWidthUnit: UnitType;
  currentHeight: number;
  currentHeightUnit: UnitType;
  defaultHeightUnit: UnitType;
  debouncedUpdate: (data: { width?: string; height?: string }) => void;
}

function WidthInput({
  currentWidth,
  currentWidthUnit,
  debouncedUpdate,
}: Pick<SizeProps, "currentWidth" | "currentWidthUnit" | "debouncedUpdate">) {
  const [width, setWidth] = useState<number>(currentWidth);

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
      value={width}
      onChange={(evt) => {
        setWidth(Number(evt.target.value) || 0);
      }}
      placeholder="Largura"
    />
  );
}

function WidthUnitSelect({
  debouncedUpdate,
  currentWidth,
  currentWidthUnit,
}: Omit<
  SizeProps,
  | "defaultHeightUnit"
  | "currentHeight"
  | "currentHeightUnit"
  | "defaultWidthUnit"
>) {
  const [widthUnit, setWidthUnit] = useState<UnitType>(currentWidthUnit);

  useEffect(() => {
    debouncedUpdate({
      width: currentWidth + widthUnit,
    });
  }, [widthUnit]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className="w-2 border-l-0 rounded-l-none shadow-none"
          variant="outline"
        >
          <TbSettings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup className="flex gap-1 p-1">
          <ToggleGroup
            variant="outline"
            type="single"
            className="w-full justify-start"
            value={widthUnit}
            onValueChange={(newWidthUnitValue: UnitType) =>
              setWidthUnit(newWidthUnitValue)
            }
          >
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="px"
              aria-label="px"
              title="px"
            >
              px
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="%"
              aria-label="%"
              title="%"
            >
              %
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="rem"
              aria-label="rem"
              title="rem"
            >
              rem
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="em"
              aria-label="em"
              title="em"
            >
              em
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="vh"
              aria-label="vh"
              title="vh"
            >
              vh
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="vw"
              aria-label="vw"
              title="vw"
            >
              vw
            </ToggleGroupItem>
          </ToggleGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HeightUnitSelect({
  currentHeightUnit,
  debouncedUpdate,
  currentHeight,
}: Omit<
  SizeProps,
  "defaultWidthUnit" | "currentWidth" | "currentWidthUnit" | "defaultHeightUnit"
>) {
  const [heightUnit, setHeightUnit] = useState<UnitType>(currentHeightUnit);

  useEffect(() => {
    debouncedUpdate({
      height: currentHeight + heightUnit,
    });
  }, [heightUnit]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className="w-2 border-l-0 rounded-l-none shadow-none"
          variant="outline"
        >
          <TbSettings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup className="flex gap-1 p-1">
          <ToggleGroup
            variant="outline"
            type="single"
            className="w-full justify-start"
            value={heightUnit}
            onValueChange={(newHeightUnitValue: UnitType) =>
              setHeightUnit(newHeightUnitValue)
            }
          >
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="px"
              aria-label="px"
              title="px"
            >
              px
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="%"
              aria-label="%"
              title="%"
            >
              %
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="rem"
              aria-label="rem"
              title="rem"
            >
              rem
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="em"
              aria-label="em"
              title="em"
            >
              em
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="vh"
              aria-label="vh"
              title="vh"
            >
              vh
            </ToggleGroupItem>
            <ToggleGroupItem
              className="w-full aspect-square h-auto"
              value="vw"
              aria-label="vw"
              title="vw"
            >
              vw
            </ToggleGroupItem>
          </ToggleGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HeightInput({
  currentHeight,
  currentHeightUnit,
  debouncedUpdate,
}: Pick<SizeProps, "currentHeight" | "currentHeightUnit" | "debouncedUpdate">) {
  const [height, setHeight] = useState<number>(currentHeight);

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
      value={height}
      onChange={(evt) => {
        setHeight(Number(evt.target.value) || 0);
      }}
      placeholder="Altura"
    />
  );
}
