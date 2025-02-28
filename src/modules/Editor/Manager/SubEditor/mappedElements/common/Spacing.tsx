"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useEditor } from "@/modules/Editor/context";
import {
  LuPanelBottomDashed,
  LuPanelLeftDashed,
  LuPanelRightDashed,
  LuPanelTopDashed,
  LuSquareDashedBottom,
} from "react-icons/lu";
import { RxMargin, RxPadding } from "react-icons/rx";

export function Spacing() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  const element = currentElement;

  const MarginTopIcon = () => (
    <LuSquareDashedBottom className="rotate-180 h-6 w-6" />
  );

  const MarginRightIcon = () => (
    <LuSquareDashedBottom className="-rotate-90 h-6 w-6" />
  );

  const MarginLeftIcon = () => (
    <LuSquareDashedBottom className="rotate-90 h-6 w-6" />
  );

  const [marginTop, marginRight, marginBottom, marginLeft] =
    (element?.style.margin?.split(" ") as string[]) || [];

  const marginTopNumber = (marginTop || "0").replace(/\D/g, "");
  const marginRightNumber = (marginRight || "0").replace(/\D/g, "");
  const marginBottomNumber = (marginBottom || "0").replace(/\D/g, "");
  const marginLeftNumber = (marginLeft || "0").replace(/\D/g, "");

  const updateMargin = (
    value: string,
    type: "top" | "right" | "bottom" | "left"
  ) => {
    const margin = {
      top: `${value}px ${marginRightNumber}px ${marginBottomNumber}px ${marginLeftNumber}px`,
      right: `${marginTopNumber}px ${value}px ${marginBottomNumber}px ${marginLeftNumber}px`,
      bottom: `${marginTopNumber}px ${marginRightNumber}px ${value}px ${marginLeftNumber}px`,
      left: `${marginTopNumber}px ${marginRightNumber}px ${marginBottomNumber}px ${value}px`,
    };

    setLayout({
      ...element,
      style: {
        ...element?.style,
        margin: margin[type],
      },
    } as any);
  };

  const [paddingTop, paddingRight, paddingBottom, paddingLeft] =
    (element?.style.padding?.split(" ") as string[]) || [];

  const paddingTopNumber = (paddingTop || "0").replace(/\D/g, "");
  const paddingRightNumber = (paddingRight || "0").replace(/\D/g, "");
  const paddingBottomNumber = (paddingBottom || "0").replace(/\D/g, "");
  const paddingLeftNumber = (paddingLeft || "0").replace(/\D/g, "");

  const updatePadding = (
    value: string,
    type: "top" | "right" | "bottom" | "left"
  ) => {
    const padding = {
      top: `${value}px ${paddingRightNumber}px ${paddingBottomNumber}px ${paddingLeftNumber}px`,
      right: `${paddingTopNumber}px ${value}px ${paddingBottomNumber}px ${paddingLeftNumber}px`,
      bottom: `${paddingTopNumber}px ${paddingRightNumber}px ${value}px ${paddingLeftNumber}px`,
      left: `${paddingTopNumber}px ${paddingRightNumber}px ${paddingBottomNumber}px ${value}px`,
    };

    setLayout({
      ...element,
      style: {
        ...element?.style,
        padding: padding[type],
      },
    } as any);
  };

  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Espaçamento</span>
      <div className="w-full flex gap-2">
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
                  value={marginTopNumber || 0}
                  onChange={(evt) => updateMargin(evt.target.value, "top")}
                  icon={MarginTopIcon}
                />
              </div>
              <div className="flex gap-2">
                <InputWithIcon
                  value={marginLeftNumber || 0}
                  onChange={(evt) => updateMargin(evt.target.value, "left")}
                  icon={MarginLeftIcon}
                />
                <InputWithIcon
                  value={marginRightNumber || 0}
                  onChange={(evt) => updateMargin(evt.target.value, "right")}
                  icon={MarginRightIcon}
                />
              </div>
              <div className="w-1/2">
                <InputWithIcon
                  value={marginBottomNumber || 0}
                  onChange={(evt) => updateMargin(evt.target.value, "bottom")}
                  icon={LuSquareDashedBottom}
                />
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

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
                  value={paddingTopNumber}
                  onChange={(evt) => updatePadding(evt.target.value, "top")}
                  icon={LuPanelTopDashed}
                />
              </div>
              <div className="flex gap-2">
                <InputWithIcon
                  value={paddingLeftNumber}
                  onChange={(evt) => updatePadding(evt.target.value, "left")}
                  icon={LuPanelLeftDashed}
                />
                <InputWithIcon
                  value={paddingRightNumber}
                  onChange={(evt) => updatePadding(evt.target.value, "right")}
                  icon={LuPanelRightDashed}
                />
              </div>
              <div className="w-1/2">
                <InputWithIcon
                  value={paddingBottomNumber}
                  onChange={(evt) => updatePadding(evt.target.value, "bottom")}
                  icon={LuPanelBottomDashed}
                />
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
