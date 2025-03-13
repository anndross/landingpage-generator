"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import {
  LuPanelBottomDashed,
  LuPanelLeftDashed,
  LuPanelRightDashed,
  LuPanelTopDashed,
} from "react-icons/lu";
import { RxPadding } from "react-icons/rx";
import {
  useGetCurrentStyleProp,
  useDebouncedUpdateCurrentStyles,
} from "@/modules/editor/hooks";
import { useEffect, useState } from "react";

export function SpacingPadding() {
  const paddingValue = useGetCurrentStyleProp("padding");
  const paddingTopValue = useGetCurrentStyleProp("paddingTop");
  const paddingRightValue = useGetCurrentStyleProp("paddingRight");
  const paddingBottomValue = useGetCurrentStyleProp("paddingBottom");
  const paddingLeftValue = useGetCurrentStyleProp("paddingLeft");

  const getPadding = (side: "top" | "right" | "bottom" | "left") => {
    const [top, right, bottom, left] =
      paddingValue
        ?.split(" ")
        ?.map((padding: string) => padding.replace(/\D/g, "").trim()) || [];

    switch (side) {
      case "top":
        return paddingTopValue || top || "0px";
      case "right":
        return paddingRightValue || right || "0px";
      case "bottom":
        return paddingBottomValue || bottom || "0px";
      case "left":
        return paddingLeftValue || left || "0px";
      default:
        return "0px";
    }
  };

  const [padding, setPadding] = useState({
    paddingTop: getPadding("top"),
    paddingRight: getPadding("right"),
    paddingBottom: getPadding("bottom"),
    paddingLeft: getPadding("left"),
  });

  const updateDebounced = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    const paddingValues = Object.values(padding);
    const firstItem = paddingValues[0];
    const allItemsIsEqual = paddingValues.every((item) => item === firstItem);

    if (allItemsIsEqual) {
      updateDebounced({ padding: firstItem });
    } else {
      updateDebounced(padding);
    }
  }, [padding]);

  const getPaddingValue = (key: keyof typeof padding) =>
    padding[key].replace(/\D/g, "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button variant="outline">
          <RxPadding />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup className="flex items-center justify-center flex-col gap-2 p-1">
          <div className="w-1/2">
            <InputWithIcon
              value={getPaddingValue("paddingTop") || 0}
              onChange={(evt) =>
                setPadding((prev) => ({
                  ...prev,
                  paddingTop: `${evt.target.value || 0}px`,
                }))
              }
              icon={LuPanelTopDashed}
            />
          </div>
          <div className="flex gap-2">
            <InputWithIcon
              value={getPaddingValue("paddingLeft") || 0}
              onChange={(evt) =>
                setPadding((prev) => ({
                  ...prev,
                  paddingLeft: `${evt.target.value || 0}px`,
                }))
              }
              icon={LuPanelLeftDashed}
            />
            <InputWithIcon
              value={getPaddingValue("paddingRight") || 0}
              onChange={(evt) =>
                setPadding((prev) => ({
                  ...prev,
                  paddingRight: `${evt.target.value || 0}px`,
                }))
              }
              icon={LuPanelRightDashed}
            />
          </div>
          <div className="w-1/2">
            <InputWithIcon
              value={getPaddingValue("paddingBottom") || 0}
              onChange={(evt) =>
                setPadding((prev) => ({
                  ...prev,
                  paddingBottom: `${evt.target.value || 0}px`,
                }))
              }
              icon={LuPanelBottomDashed}
            />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
