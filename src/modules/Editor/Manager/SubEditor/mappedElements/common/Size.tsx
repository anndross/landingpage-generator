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
import {
  useGetCurrentStyles,
  useUpdateCurrentStyles,
} from "@/modules/Editor/Manager/SubEditor/hooks";

type UnitType = "px" | "rem" | "em" | "%";

export function Size() {
  const {
    setLayout,
    editorFunctions: { currentElementToEdit },
  } = useEditorStore();

  const [widthUnitValue, setWidthUnitValue] = useState<UnitType>(
    currentElementToEdit?.type === "container" ||
      currentElementToEdit?.type === "layout"
      ? "%"
      : "px"
  );
  const [heightUnitValue, setHeightUnitValue] = useState<UnitType>(
    currentElementToEdit?.type === "layout" ? "%" : "px"
  );

  useEffect(() => {
    if (currentElementToEdit) {
      useUpdateCurrentStyles({
        width: useGetCurrentStyles("width").replace(/\D/g, "") + widthUnitValue,
        height:
          useGetCurrentStyles("height").replace(/\D/g, "") + heightUnitValue,
      });
    }
  }, [widthUnitValue, heightUnitValue]);

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">Layout</span>
      <div className="flex gap-2 ">
        <div className="flex w-full">
          <Input
            type="number"
            id="width-input"
            className="rounded-r-none border-r-0 shadow-none"
            value={useGetCurrentStyles("width").replace(/\D/g, "")}
            onChange={(evt) => {
              useUpdateCurrentStyles({
                width: evt.target.value + widthUnitValue,
              });
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
                  value={widthUnitValue}
                  onValueChange={(newWidthUnitValue) =>
                    setWidthUnitValue(newWidthUnitValue as UnitType)
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
            value={useGetCurrentStyles("height").replace(/\D/g, "")}
            onChange={(evt) => {
              useUpdateCurrentStyles({
                height: evt.target.value + heightUnitValue,
              });
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
                  value={heightUnitValue}
                  onValueChange={(newHeightUnitValue) =>
                    setHeightUnitValue(newHeightUnitValue as UnitType)
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
