"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { LuSquareDashedBottom } from "react-icons/lu";
import { RxMargin } from "react-icons/rx";
import {
  useGetCurrentStyleProp,
  useDebouncedUpdateCurrentStyles,
} from "@/modules/editor/hooks";
import { useEffect, useState } from "react";

export function SpacingMargin() {
  const MarginTopIcon = () => (
    <LuSquareDashedBottom className="rotate-180 h-6 w-6" />
  );

  const MarginRightIcon = () => (
    <LuSquareDashedBottom className="-rotate-90 h-6 w-6" />
  );

  const MarginLeftIcon = () => (
    <LuSquareDashedBottom className="rotate-90 h-6 w-6" />
  );

  const marginValue = useGetCurrentStyleProp("margin");
  const marginTopValue = useGetCurrentStyleProp("marginTop");
  const marginRightValue = useGetCurrentStyleProp("marginRight");
  const marginBottomValue = useGetCurrentStyleProp("marginBottom");
  const marginLeftValue = useGetCurrentStyleProp("marginLeft");

  const getMargin = (side: "top" | "right" | "bottom" | "left") => {
    const [top, right, bottom, left] =
      marginValue
        ?.split(" ")
        ?.map((margin: string) => margin.replace(/\D/g, "").trim()) || [];

    switch (side) {
      case "top":
        return marginTopValue || top || "0px";
      case "right":
        return marginRightValue || right || "0px";
      case "bottom":
        return marginBottomValue || bottom || "0px";
      case "left":
        return marginLeftValue || left || "0px";
      default:
        return "0px";
    }
  };

  const [margin, setMargin] = useState({
    marginTop: getMargin("top"),
    marginRight: getMargin("right"),
    marginBottom: getMargin("bottom"),
    marginLeft: getMargin("left"),
  });

  const updateDebounced = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    const marginValues = Object.values(margin);
    const firstItem = marginValues[0];
    const allItemsIsEqual = marginValues.every((item) => item === firstItem);

    if (allItemsIsEqual) {
      updateDebounced({ margin: firstItem });
    } else {
      updateDebounced(margin);
    }
  }, [margin]);

  const getMarginValue = (key: keyof typeof margin) =>
    margin[key].replace(/\D/g, "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button variant="outline">
          <RxMargin />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup className="flex items-center justify-center flex-col gap-2 p-1">
          <div className="w-1/2">
            <InputWithIcon
              value={getMarginValue("marginTop") || 0}
              onChange={(evt) =>
                setMargin((prev) => ({
                  ...prev,
                  marginTop: `${evt.target.value || 0}px`,
                }))
              }
              icon={MarginTopIcon}
            />
          </div>
          <div className="flex gap-2">
            <InputWithIcon
              value={getMarginValue("marginLeft") || 0}
              onChange={(evt) =>
                setMargin((prev) => ({
                  ...prev,
                  marginLeft: `${evt.target.value || 0}px`,
                }))
              }
              icon={MarginLeftIcon}
            />
            <InputWithIcon
              value={getMarginValue("marginRight") || 0}
              onChange={(evt) =>
                setMargin((prev) => ({
                  ...prev,
                  marginRight: `${evt.target.value || 0}px`,
                }))
              }
              icon={MarginRightIcon}
            />
          </div>
          <div className="w-1/2">
            <InputWithIcon
              value={getMarginValue("marginBottom") || 0}
              onChange={(evt) =>
                setMargin((prev) => ({
                  ...prev,
                  marginBottom: `${evt.target.value || 0}px`,
                }))
              }
              icon={LuSquareDashedBottom}
            />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
