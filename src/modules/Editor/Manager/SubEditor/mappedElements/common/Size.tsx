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
import { useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";
import { useUpdateCurrentStyles } from "@/modules/Editor/Manager/SubEditor/hooks";

type UnitType = "px" | "%" | "em" | "rem" | "vw" | "vh";

export function Size() {
  const { currentElementToEdit } = useEditorStore(
    (state) => state.editorFunctions
  );

  const type = currentElementToEdit?.type;

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const defaultWidthUnit = "%";
  const defaultHeightUnit = type === "layout" ? "%" : "px";

  const [widthUnit, setWidthUnit] = useState<UnitType>(defaultWidthUnit);
  const [heightUnit, setHeightUnit] = useState<UnitType>(defaultHeightUnit);

  const updateStyles = useUpdateCurrentStyles();

  useEffect(() => {
    updateStyles({
      width: width + widthUnit,
    });
  }, [width, widthUnit]);

  useEffect(() => {
    updateStyles({
      height: height + heightUnit,
    });
  }, [height, heightUnit]);

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">Layout</span>
      <div className="flex gap-2 ">
        <div className="flex w-full">
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
                </ToggleGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex w-full">
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
                </ToggleGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
