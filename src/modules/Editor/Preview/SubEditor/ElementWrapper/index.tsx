"use client";
import { Button } from "@/components/ui/button";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
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
import { PiTextColumns } from "react-icons/pi";
import { RadioWithIcon } from "@/components/ui/radio-with-icon";
import { WrapperProps } from "@/types/components/wrapper";
import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/EditorContext";
import { useEffect, useState } from "react";
import { ColorPicker } from "../../components/ColorPicker";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import { InputWithIcon } from "@/components/ui/input-with-icon";

interface ElementWrapperProps {
  data: WrapperProps | null;
}

export function ElementWrapper({ data }: ElementWrapperProps) {
  return (
    <form className="flex flex-col gap-6 pb-2">
      <Size data={data} />
      <Border data={data} />
      <Appearance data={data} />
      <div>
        <span className="text-sm text-zinc-600 font-medium">Direção</span>
        <div className="w-full flex justify-start mt-2 gap-14">
          <div>
            <RadioWithIcon
              title="Coluna"
              ariaLabel="Direção em coluna"
              id="column"
              value="column"
              name="direction"
              required
            >
              <PiTextColumns />
            </RadioWithIcon>
          </div>
          <div>
            <RadioWithIcon
              title="Linha"
              ariaLabel="Direção em linha"
              id="line"
              value="line"
              name="direction"
              required
            >
              <TbBaselineDensityMedium />
            </RadioWithIcon>
          </div>
        </div>
      </div>

      <div>
        <span className="text-sm text-zinc-600 font-medium">
          Alinhamento horizontal
        </span>
        <div className="w-full flex mt-2 gap-14">
          <div>
            <RadioWithIcon
              title="Esquerda"
              ariaLabel="Alinhamento horizontal na esquerda"
              id="horizontal-left"
              value="left"
              name="horizontal"
              required
            >
              <BiAlignLeft />
            </RadioWithIcon>
          </div>

          <div>
            <RadioWithIcon
              title="Centro"
              ariaLabel="Alinhamento horizontal no centro"
              id="horizontal-center"
              value="center"
              name="horizontal"
              required
            >
              <BiAlignMiddle />
            </RadioWithIcon>
          </div>

          <div>
            <RadioWithIcon
              title="Direita"
              ariaLabel="Alinhamento horizontal na direita"
              id="horizontal-right"
              value="right"
              name="horizontal"
              required
            >
              <BiAlignRight />
            </RadioWithIcon>
          </div>
        </div>
      </div>

      <div>
        <span className="text-sm text-zinc-600 font-medium">
          Alinhamento vertical
        </span>
        <div className="w-full flex mt-2 gap-14">
          <div>
            <RadioWithIcon
              title="Superior"
              ariaLabel="Alinhamento vertical superior"
              id="vertical-top"
              value="top"
              name="vertical"
              required
            >
              <MdOutlineVerticalAlignTop />
            </RadioWithIcon>
          </div>
          <div>
            <RadioWithIcon
              title="Meio"
              ariaLabel="Alinhamento vertical no meio"
              id="vertical-mid"
              value="mid"
              name="vertical"
              required
            >
              <MdOutlineVerticalAlignCenter />
            </RadioWithIcon>
          </div>

          <div>
            <RadioWithIcon
              title="Inferior"
              ariaLabel="Alinhamento vertical inferior"
              id="vertical-bottom"
              value="bottom"
              name="vertical"
              required
            >
              <MdOutlineVerticalAlignBottom />
            </RadioWithIcon>
          </div>
        </div>
      </div>
      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}

function Size({ data }: ElementWrapperProps) {
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
              } as WrapperProps);
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
              } as WrapperProps);
            }}
            placeholder="Altura"
          />
        </div>
      </div>
    </div>
  );
}

function Border({ data }: ElementWrapperProps) {
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
              } as WrapperProps)
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
              } as WrapperProps)
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

function Appearance({ data }: ElementWrapperProps) {
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
            } as WrapperProps)
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
