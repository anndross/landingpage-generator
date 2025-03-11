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
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

export function Appearance() {
  const defaultBackgroundColor = useGetCurrentStyles("backgroundColor");
  const [backgroundColor, setBackgroundColor] = useState(
    defaultBackgroundColor || "#fff"
  );

  const updateStyles = useUpdateCurrentStyles();

  useEffect(() => {
    if (backgroundColor) updateStyles({ backgroundColor: backgroundColor });
  }, [backgroundColor]);

  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Aparência</span>
      <div className="flex flex-col gap-2">
        <ColorPicker
          color={backgroundColor || "#fff"}
          setColor={(color) => setBackgroundColor(color)}
        />
        <div className="flex gap-2">
          <Opacity />
          <AppearanceRadius />
        </div>
      </div>
    </div>
  );
}

function Opacity() {
  const defaultOpacity = useGetCurrentStyles("opacity");
  const [opacity, setOpacity] = useState(defaultOpacity || 1);

  const updateStyles = useUpdateCurrentStyles();

  const handleSetOpacity = useCallback(
    debounce((opacity: number | string) => {
      updateStyles({ opacity: `${opacity}` });
    }, 200),
    []
  );

  useEffect(() => {
    if (opacity) handleSetOpacity(opacity);
  }, [opacity]);

  return (
    <Input
      max={1}
      min={0}
      value={opacity}
      onChange={(evt) => setOpacity(evt.target.value)}
      type="number"
      placeholder="Opacidade"
    />
  );
}

function AppearanceRadius() {
  const getBorderRadius = (
    side: "topLeft" | "topRight" | "bottomRight" | "bottomLeft"
  ) => {
    const [topLeft, topRight, bottomRight, bottomLeft] =
      useGetCurrentStyles("borderRadius")
        ?.split(" ")
        ?.map((radius: string) => radius.replace(/\D/g, "").trim()) || [];

    switch (side) {
      case "topLeft":
        return useGetCurrentStyles("borderTopLeftRadius") || topLeft || "0px";
      case "topRight":
        return useGetCurrentStyles("borderTopRightRadius") || topRight || "0px";
      case "bottomRight":
        return (
          useGetCurrentStyles("borderBottomRightRadius") || bottomRight || "0px"
        );
      case "bottomLeft":
        return (
          useGetCurrentStyles("borderBottomLeftRadius") || bottomLeft || "0px"
        );
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

  const updateStyles = useUpdateCurrentStyles();

  const updateDebounced = useCallback(
    () =>
      debounce(() => {
        const radiusItems = Object.values(radius);
        const firstItem = radiusItems[0];
        const allItemsIsEqual = radiusItems.every((item) => item === firstItem);

        if (allItemsIsEqual) {
          updateStyles({ borderRadius: firstItem });
        } else {
          updateStyles(radius);
        }
      }, 200),
    []
  );

  useEffect(() => {
    updateDebounced();
  }, [radius]);

  const getRadiusValue = (key: keyof typeof radius) =>
    radius[key].replace(/\D/g, "");

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
