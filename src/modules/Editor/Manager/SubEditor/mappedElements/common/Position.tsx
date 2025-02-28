import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditor } from "@/modules/Editor/context";
import { ContainerProps } from "@/types/container";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import { LuBetweenVerticalStart } from "react-icons/lu";
import {
  MdOutlineVerticalAlignBottom,
  MdOutlineVerticalAlignCenter,
  MdOutlineVerticalAlignTop,
} from "react-icons/md";
import { TbBaselineDensityMedium } from "react-icons/tb";

export function Position() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-sm text-zinc-600 font-medium">Direção</span>
        <ToggleGroup
          variant="outline"
          value={currentElement?.style.flexDirection}
          onValueChange={(value) => {
            setLayout({
              ...currentElement,
              style: {
                ...currentElement?.style,
                flexDirection: value,
              },
            } as ContainerProps);
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
          value={currentElement?.style.justifyContent}
          onValueChange={(value) => {
            if (value)
              setLayout({
                ...currentElement,
                style: {
                  ...currentElement?.style,
                  justifyContent: value,
                },
              } as ContainerProps);
          }}
        >
          <ToggleGroupItem
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
          value={currentElement?.style.alignItems}
          onValueChange={(value) => {
            if (value)
              setLayout({
                ...currentElement,
                style: {
                  ...currentElement?.style,
                  alignItems: value,
                },
              } as ContainerProps);
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
