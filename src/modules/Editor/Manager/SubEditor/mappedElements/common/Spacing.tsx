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
  LuSquareDashedBottom,
} from "react-icons/lu";
import { RxMargin, RxPadding } from "react-icons/rx";
import {
  useGetCurrentStyles,
  useUpdateCurrentStyles,
} from "@/modules/Editor/Manager/SubEditor/hooks";
import { use, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { debounceTimeMs } from "../utils";
import { useEditorStore } from "@/modules/Editor/store";

export function Spacing() {
  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Espaçamento</span>
      <div className="w-full flex gap-2">
        <Margin />
        <Padding />
      </div>
    </div>
  );
}

export function Margin() {
  const { currentElementToEdit } = useEditorStore(
    (state) => state.editorFunctions
  );

  const MarginTopIcon = () => (
    <LuSquareDashedBottom className="rotate-180 h-6 w-6" />
  );

  const MarginRightIcon = () => (
    <LuSquareDashedBottom className="-rotate-90 h-6 w-6" />
  );

  const MarginLeftIcon = () => (
    <LuSquareDashedBottom className="rotate-90 h-6 w-6" />
  );

  const getMargin = (side: "top" | "right" | "bottom" | "left") => {
    const [top, right, bottom, left] =
      useGetCurrentStyles("margin")
        ?.split(" ")
        ?.map((margin: string) => margin.replace(/\D/g, "").trim()) || [];

    switch (side) {
      case "top":
        return useGetCurrentStyles("marginTop") || top || "0px";
      case "right":
        return useGetCurrentStyles("marginRight") || right || "0px";
      case "bottom":
        return useGetCurrentStyles("marginBottom") || bottom || "0px";
      case "left":
        return useGetCurrentStyles("marginLeft") || left || "0px";
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

  const updateStyles = useUpdateCurrentStyles();

  const updateDebounced = useCallback(
    debounce((marginObj: typeof margin) => {
      const marginValues = Object.values(marginObj);
      const firstItem = marginValues[0];
      const allItemsIsEqual = marginValues.every((item) => item === firstItem);

      if (allItemsIsEqual) {
        updateStyles({ margin: firstItem });
      } else {
        updateStyles(marginObj);
      }
    }, debounceTimeMs),
    [currentElementToEdit?.id]
  );

  useEffect(() => {
    updateDebounced(margin);
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

export function Padding() {
  const { currentElementToEdit } = useEditorStore(
    (state) => state.editorFunctions
  );

  const getPadding = (side: "top" | "right" | "bottom" | "left") => {
    const [top, right, bottom, left] =
      useGetCurrentStyles("padding")
        ?.split(" ")
        ?.map((padding: string) => padding.replace(/\D/g, "").trim()) || [];

    switch (side) {
      case "top":
        return useGetCurrentStyles("paddingTop") || top || "0px";
      case "right":
        return useGetCurrentStyles("paddingRight") || right || "0px";
      case "bottom":
        return useGetCurrentStyles("paddingBottom") || bottom || "0px";
      case "left":
        return useGetCurrentStyles("paddingLeft") || left || "0px";
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

  const updateStyles = useUpdateCurrentStyles();

  const updateDebounced = useCallback(
    debounce((paddingObj: typeof padding) => {
      const paddingValues = Object.values(paddingObj);
      const firstItem = paddingValues[0];
      const allItemsIsEqual = paddingValues.every((item) => item === firstItem);

      if (allItemsIsEqual) {
        updateStyles({ padding: firstItem });
      } else {
        updateStyles(paddingObj);
      }
    }, debounceTimeMs),
    [currentElementToEdit?.id]
  );

  useEffect(() => {
    updateDebounced(padding);
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
