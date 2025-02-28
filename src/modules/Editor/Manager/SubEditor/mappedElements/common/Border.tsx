import { ColorPicker } from "@/components/ColorPicker";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditor } from "@/modules/Editor/context";
import {
  CgBorderBottom,
  CgBorderLeft,
  CgBorderRight,
  CgBorderTop,
} from "react-icons/cg";

export function Border() {
  const { setLayout, settings } = useEditor();
  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  console.log(
    "currentElement",
    currentElement,
    currentElement?.style.borderWidth
  );
  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Borda</span>
      <div className="flex flex-col  gap-2">
        <div>
          <ColorPicker
            color={currentElement?.style.borderColor || "#000"}
            setColor={(value) =>
              setLayout({
                ...currentElement,
                style: { ...currentElement?.style, borderColor: value },
              } as any)
            }
          />
        </div>
        <div>
          <Input
            value={currentElement?.style.borderWidth.replace(/\D/g, "")}
            onChange={(evt) =>
              setLayout({
                ...currentElement,
                style: {
                  ...currentElement?.style,
                  borderWidth: evt.target.value + "px",
                },
              } as any)
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
