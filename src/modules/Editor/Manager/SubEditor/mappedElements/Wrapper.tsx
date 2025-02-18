"use client";
import { Button } from "@/components/ui/button";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import { LuBetweenVerticalStart, LuPanelTopDashed } from "react-icons/lu";
import { LuPanelRightDashed } from "react-icons/lu";
import { LuPanelBottomDashed } from "react-icons/lu";
import { LuPanelLeftDashed } from "react-icons/lu";
import { LuSquareDashedBottom } from "react-icons/lu";
import { RxPadding } from "react-icons/rx";
import { RxMargin } from "react-icons/rx";
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from "react-icons/rx";
import {
  MdOutlineVerticalAlignBottom,
  MdOutlineVerticalAlignCenter,
  MdOutlineVerticalAlignTop,
} from "react-icons/md";
import { TbBaselineDensityMedium } from "react-icons/tb";
import { WrapperProps as WrapperPropsType } from "@/types/components/wrapper";
import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/EditorContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CgBorderBottom,
  CgBorderLeft,
  CgBorderRight,
  CgBorderTop,
} from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { ColorPicker } from "@/components/ColorPicker";

interface WrapperProps {
  data: WrapperPropsType | null;
}

export function Wrapper({ data }: WrapperProps) {
  return (
    <form className="flex flex-col gap-6 pb-2">
      <Size data={data} />
      <Border data={data} />
      <Appearance data={data} />
      <Spacing data={data} />
      <Position data={data} />
      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}

function Size({ data }: WrapperProps) {
  const { useEditElement } = useEditor();

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">Layout</span>
      <div className="flex gap-2 ">
        <div>
          <Input
            type="number"
            id="width-input"
            value={data?.settings.width.replace(/\D/g, "")}
            onChange={(evt) => {
              useEditElement({
                ...data,
                settings: { ...data?.settings, width: evt.target.value + "px" },
              } as WrapperPropsType);
            }}
            placeholder="Largura"
          />
        </div>
        <div>
          <Input
            type="number"
            id="height-input"
            value={data?.settings.height.replace(/\D/g, "")}
            onChange={(evt) => {
              useEditElement({
                ...data,
                settings: {
                  ...data?.settings,
                  height: evt.target.value + "px",
                },
              } as WrapperPropsType);
            }}
            placeholder="Altura"
          />
        </div>
      </div>
    </div>
  );
}

function Border({ data }: WrapperProps) {
  const { useEditElement } = useEditor();

  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Borda</span>
      <div className="flex flex-col  gap-2">
        <div>
          <ColorPicker
            color={data?.style.borderColor || "#000"}
            setColor={(value) =>
              useEditElement({
                ...data,
                style: { ...data?.style, borderColor: value },
              } as WrapperPropsType)
            }
          />
        </div>
        <div>
          <Input
            value={data?.style.borderWidth.replace(/\D/g, "")}
            onChange={(evt) =>
              useEditElement({
                ...data,
                style: {
                  ...data?.style,
                  borderWidth: evt.target.value + "px",
                },
              } as WrapperPropsType)
            }
            type="number"
            id="width-input"
            placeholder="Largura"
          />
        </div>
        <ToggleGroup
          variant="outline"
          type="multiple"
          className="w-full justify-start"
        >
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="border-top"
            aria-label="Borda superior"
            title="Borda superior"
          >
            <CgBorderTop />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="border-right"
            aria-label="Borda direita"
            title="Borda direita"
          >
            <CgBorderRight />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="border-bottom"
            aria-label="Borda inferior"
            title="Borda inferior"
          >
            <CgBorderBottom />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="border-left"
            aria-label="Borda esquerda"
            title="Borda esquerda"
          >
            <CgBorderLeft />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

function Appearance({ data }: WrapperProps) {
  const { useEditElement } = useEditor();

  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Aparência</span>
      <div className="flex flex-col gap-2">
        <ColorPicker
          color={data?.style.backgroundColor || "#fff"}
          setColor={(color) =>
            useEditElement({
              ...data,
              style: { ...data?.style, backgroundColor: color },
            } as WrapperPropsType)
          }
        />
        <div className="flex gap-2">
          <Input max={1} min={0} type="number" placeholder="Opacidade" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <RxCornerTopLeft />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup className="grid grid-cols-2 gap-1 p-1">
                <InputWithIcon icon={RxCornerTopLeft} />
                <InputWithIcon icon={RxCornerTopRight} />
                <InputWithIcon icon={RxCornerBottomLeft} />
                <InputWithIcon icon={RxCornerBottomRight} />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function Spacing({ data }: WrapperProps) {
  const { useEditElement } = useEditor();

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
    (data?.settings.margin?.split(" ") as string[]) || [];

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

    useEditElement({
      ...data,
      settings: {
        ...data?.settings,
        margin: margin[type],
      },
    } as WrapperPropsType);
  };

  const [paddingTop, paddingRight, paddingBottom, paddingLeft] =
    (data?.settings.padding?.split(" ") as string[]) || [];

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

    useEditElement({
      ...data,
      settings: {
        ...data?.settings,
        padding: padding[type],
      },
    } as WrapperPropsType);
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
                  value={marginTopNumber}
                  onChange={(evt) => updateMargin(evt.target.value, "top")}
                  icon={MarginTopIcon}
                />
              </div>
              <div className="flex gap-2">
                <InputWithIcon
                  value={marginLeftNumber}
                  onChange={(evt) => updateMargin(evt.target.value, "left")}
                  icon={MarginLeftIcon}
                />
                <InputWithIcon
                  value={marginRightNumber}
                  onChange={(evt) => updateMargin(evt.target.value, "right")}
                  icon={MarginRightIcon}
                />
              </div>
              <div className="w-1/2">
                <InputWithIcon
                  value={marginRightNumber}
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

export function Position({ data }: WrapperProps) {
  const { useEditElement } = useEditor();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-sm text-zinc-600 font-medium">Direção</span>
        <ToggleGroup
          variant="outline"
          value={data?.settings.flexDirection}
          onValueChange={(value) => {
            if (value)
              useEditElement({
                ...data,
                settings: {
                  ...data?.settings,
                  flexDirection: value,
                },
              } as WrapperPropsType);
          }}
          type="single"
          className="w-full flex mt-2 gap-2 justify-between"
        >
          <ToggleGroupItem
            className="w-full h-10"
            value="column"
            aria-label="Coluna"
            title="Coluna"
          >
            <TbBaselineDensityMedium />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full h-10"
            value="row"
            aria-label="Linha"
            title="Linha"
          >
            <TbBaselineDensityMedium className="rotate-90" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <span className="text-sm text-zinc-600 font-medium">
          Alinhamento horizontal
        </span>
        <ToggleGroup
          variant="outline"
          type="single"
          className="w-full flex mt-2 gap-2 justify-between"
          value={data?.settings.justifyContent}
          onValueChange={(value) => {
            if (value)
              useEditElement({
                ...data,
                settings: {
                  ...data?.settings,
                  justifyContent: value,
                },
              } as WrapperPropsType);
          }}
        >
          <ToggleGroupItem
            onChange={(evt) => console.log(evt)}
            className="w-full aspect-square h-auto"
            value="flex-start"
            aria-label="flex start"
            title="flex start"
          >
            <BiAlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="center"
            aria-label="center"
            title="center"
          >
            <BiAlignMiddle />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="flex-end"
            aria-label="flex end"
            title="flex end"
          >
            <BiAlignRight />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="space-between"
            aria-label="space between"
            title="space between"
          >
            <LuBetweenVerticalStart />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <span className="text-sm text-zinc-600 font-medium">
          Alinhamento vertical
        </span>
        <ToggleGroup
          variant="outline"
          type="single"
          className="w-full flex mt-2 gap-2 justify-between"
          value={data?.settings.alignItems}
          onValueChange={(value) => {
            if (value)
              useEditElement({
                ...data,
                settings: {
                  ...data?.settings,
                  alignItems: value,
                },
              } as WrapperPropsType);
          }}
        >
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="flex-start"
            aria-label="flex start"
            title="flex start"
          >
            <MdOutlineVerticalAlignTop />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="center"
            aria-label="center"
            title="center"
          >
            <MdOutlineVerticalAlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full aspect-square h-auto"
            value="flex-end"
            aria-label="flex end"
            title="flex end"
          >
            <MdOutlineVerticalAlignBottom />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
