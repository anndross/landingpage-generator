"use client";

import { UnitType } from ".";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";

interface SizeHeightUnitProps {
  currentHeight: number;
  currentHeightUnit: UnitType;
  debouncedUpdate: (data: { width?: string; height?: string }) => void;
}

export function SizeHeightUnit({
  currentHeightUnit,
  debouncedUpdate,
  currentHeight,
}: SizeHeightUnitProps) {
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
            value={heightUnit || "px"}
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
