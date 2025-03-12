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
import { useEditorStore } from "@/modules/Editor/store";
import { debounceTimeMs } from "../utils";

export function Appearance() {
  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Aparência</span>
      <div className="flex flex-col gap-2">
        <Background />
        <div className="flex gap-2">
          <Opacity />
          <AppearanceRadius />
        </div>
      </div>
    </div>
  );
}

function Background() {
  const { currentElementToEdit } = useEditorStore(
    (state) => state.editorFunctions
  );

  const defaultBackgroundColor = useGetCurrentStyles("backgroundColor");
  const [backgroundColor, setBackgroundColor] = useState(
    defaultBackgroundColor || "#fff"
  );

  const updateStyles = useUpdateCurrentStyles();

  const updateStylesDebounced = useCallback(
    debounce((bg) => updateStyles({ backgroundColor: bg }), debounceTimeMs),
    [currentElementToEdit?.id]
  );

  useEffect(() => {
    if (backgroundColor) updateStylesDebounced(backgroundColor);
  }, [backgroundColor]);

  return (
    <ColorPicker
      color={backgroundColor || "#fff"}
      setColor={(color) => setBackgroundColor(color)}
    />
  );
}

function Opacity() {
  const { currentElementToEdit } = useEditorStore(
    (state) => state.editorFunctions
  );

  const defaultOpacity = useGetCurrentStyles("opacity");
  const [opacity, setOpacity] = useState(defaultOpacity || 1);

  const updateStyles = useUpdateCurrentStyles();

  const handleSetOpacity = useCallback(
    debounce((opacity: number | string) => {
      updateStyles({ opacity: `${opacity}` });
    }, debounceTimeMs),
    [currentElementToEdit?.id]
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
  const { currentElementToEdit } = useEditorStore(
    (state) => state.editorFunctions
  );

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
    debounce((radiusObj: typeof radius) => {
      const radiusItems = Object.values(radiusObj);
      const firstItem = radiusItems[0];
      const allItemsIsEqual = radiusItems.every((item) => item === firstItem);

      if (allItemsIsEqual) {
        updateStyles({ borderRadius: firstItem });
      } else {
        updateStyles(radiusObj);
      }
    }, debounceTimeMs),
    [currentElementToEdit?.id]
  );

  useEffect(() => {
    updateDebounced(radius);
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
