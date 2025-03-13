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
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from "react-icons/rx";
import {
  useGetCurrentStyleProp,
  useDebouncedUpdateCurrentStyles,
} from "@/modules/editor/hooks";
import { useEffect, useState } from "react";

export function AppearanceRadius() {
  const borderRadiusValue = useGetCurrentStyleProp("borderRadius");
  const borderTopLeftRadiusValue = useGetCurrentStyleProp(
    "borderTopLeftRadius"
  );
  const borderTopRightRadiusValue = useGetCurrentStyleProp(
    "borderTopRightRadius"
  );
  const borderBottomRightRadiusValue = useGetCurrentStyleProp(
    "borderBottomRightRadius"
  );
  const borderBottomLeftRadiusValue = useGetCurrentStyleProp(
    "borderBottomLeftRadius"
  );

  const getBorderRadius = (
    side: "topLeft" | "topRight" | "bottomRight" | "bottomLeft"
  ) => {
    const [topLeft, topRight, bottomRight, bottomLeft] =
      borderRadiusValue
        ?.split(" ")
        ?.map((radius: string) => radius.replace(/\D/g, "").trim()) || [];

    switch (side) {
      case "topLeft":
        return borderTopLeftRadiusValue || topLeft || "0px";
      case "topRight":
        return borderTopRightRadiusValue || topRight || "0px";
      case "bottomRight":
        return borderBottomRightRadiusValue || bottomRight || "0px";
      case "bottomLeft":
        return borderBottomLeftRadiusValue || bottomLeft || "0px";
      default:
        return "0px";
    }
  };

  const [radius, setRadius] = useState({
    borderTopLeftRadius: getBorderRadius("topLeft"),
    borderTopRightRadius: getBorderRadius("topRight"),
    borderBottomRightRadius: getBorderRadius("bottomRight"),
    borderBottomLeftRadius: getBorderRadius("bottomLeft"),
  });

  const updateDebounced = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    const radiusItems = Object.values(radius);
    const firstItem = radiusItems[0];
    const allItemsIsEqual = radiusItems.every((item) => item === firstItem);

    if (allItemsIsEqual) {
      updateDebounced({ borderRadius: firstItem });
    } else {
      updateDebounced(radius);
    }
  }, [radius]);

  const getRadiusValue = (key: keyof typeof radius) =>
    radius[key].replace(/\D/g, "") || 0;

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
            value={getRadiusValue("borderTopLeftRadius")}
            onChange={(evt) =>
              setRadius((prev) => ({
                ...prev,
                borderTopLeftRadius: `${evt.target.value || 0}px`,
              }))
            }
            icon={RxCornerTopLeft}
          />
          <InputWithIcon
            value={getRadiusValue("borderTopRightRadius")}
            onChange={(evt) =>
              setRadius((prev) => ({
                ...prev,
                borderTopRightRadius: `${evt.target.value || 0}px`,
              }))
            }
            icon={RxCornerTopRight}
          />
          <InputWithIcon
            value={getRadiusValue("borderBottomLeftRadius")}
            onChange={(evt) =>
              setRadius((prev) => ({
                ...prev,
                borderBottomLeftRadius: `${evt.target.value || 0}px`,
              }))
            }
            icon={RxCornerBottomLeft}
          />
          <InputWithIcon
            value={getRadiusValue("borderBottomRightRadius")}
            onChange={(evt) =>
              setRadius((prev) => ({
                ...prev,
                borderBottomRightRadius: `${evt.target.value || 0}px`,
              }))
            }
            icon={RxCornerBottomRight}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
