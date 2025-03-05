"use client";

import { ColorPicker } from "@/components/ColorPicker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from "react-icons/rx";
import {
  useGetCurrentStyles,
  useUpdateCurrentStyles,
} from "@/modules/Editor/Manager/SubEditor/hooks";
import { useCallback } from "react";

export function Appearance() {
  const backgroundColor = useGetCurrentStyles("backgroundColor");
  const opacity = useGetCurrentStyles("opacity");

  const handleSetBackground = (color: string) => {
    useUpdateCurrentStyles({ backgroundColor: `${color}` });
  };

  const handleSetOpacity = (opacity: string) => {
    useUpdateCurrentStyles({ opacity: `${opacity}` });
  };

  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Aparência</span>
      <div className="flex flex-col gap-2">
        <ColorPicker
          color={backgroundColor || "#fff"}
          setColor={(color) => handleSetBackground(color)}
        />
        <div className="flex gap-2">
          <Input
            max={1}
            min={0}
            value={opacity || 1}
            onChange={(evt) => handleSetOpacity(evt.target.value)}
            type="number"
            placeholder="Opacidade"
          />
          <AppearanceRadius />
        </div>
      </div>
    </div>
  );
}

function AppearanceRadius() {
  const [radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft] =
    useGetCurrentStyles("borderRadius")
      ?.split(" ")
      ?.map((radius: string) => radius.replace(/\D/g, "").trim()) || [];

  const handleSetBorderRadius = (borderRadius: string) => {
    useUpdateCurrentStyles({ borderRadius: borderRadius });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <RxCornerTopLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup className="grid grid-cols-2 gap-1 p-1">
          <InputWithIcon
            value={radiusTopLeft}
            onChange={(evt) =>
              handleSetBorderRadius(
                `${evt.target.value || 0}px ${radiusTopRight || 0}px ${radiusBottomRight || 0}px ${radiusBottomLeft || 0}px`
              )
            }
            icon={RxCornerTopLeft}
          />
          <InputWithIcon
            value={radiusTopRight}
            onChange={(evt) =>
              handleSetBorderRadius(
                `${radiusTopLeft || 0}px ${evt.target.value || 0}px ${radiusBottomRight || 0}px ${radiusBottomLeft || 0}px`
              )
            }
            icon={RxCornerTopRight}
          />
          <InputWithIcon
            value={radiusBottomRight}
            onChange={(evt) =>
              handleSetBorderRadius(
                `${radiusTopLeft || 0}px ${radiusTopRight || 0}px ${evt.target.value || 0}px ${radiusBottomLeft || 0}px`
              )
            }
            icon={RxCornerBottomLeft}
          />
          <InputWithIcon
            value={radiusBottomLeft}
            onChange={(evt) =>
              handleSetBorderRadius(
                `${radiusTopLeft || 0}px ${radiusTopRight || 0}px ${radiusBottomRight || 0}px ${evt.target.value || 0}px`
              )
            }
            icon={RxCornerBottomRight}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
