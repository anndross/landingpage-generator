import { ColorPicker } from "@/components/ColorPicker";
import { Input } from "@/components/ui/input";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import {
//   CgBorderBottom,
//   CgBorderLeft,
//   CgBorderRight,
//   CgBorderTop,
// } from "react-icons/cg";
import {
  useDebouncedUpdateCurrentStyles,
  useGetCurrentStyleProp,
} from "@/modules/editor/hooks";
import { useEffect, useState } from "react";

type BorderState = {
  borderColor: string;
  borderWidth: string;
};

export function Border() {
  const debouncedUpdate = useDebouncedUpdateCurrentStyles();
  const [border, setBorder] = useState<BorderState>({
    borderColor: useGetCurrentStyleProp("borderColor"),
    borderWidth: useGetCurrentStyleProp("borderWidth"),
  });

  const updateBorder = (data: Partial<BorderState>) => {
    setBorder((prev) => ({ ...prev, ...(data as BorderState) }));
  };

  useEffect(() => {
    if (border?.borderColor || border?.borderWidth) {
      debouncedUpdate(border);
    }
  }, [border]);

  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Borda</span>
      <div className="flex flex-col  gap-2">
        <div>
          <ColorPicker
            color={border?.borderColor || "#000"}
            setColor={(value) =>
              updateBorder({
                borderColor: `${value}`,
              })
            }
          />
        </div>
        <div>
          <Input
            value={border?.borderWidth?.replace(/\D/g, "") || "0"}
            onChange={(evt) =>
              updateBorder({
                borderWidth: evt.target.value + "px",
              })
            }
            type="number"
            id="width-input"
            placeholder="Largura"
          />
        </div>
        {/* <ToggleGroup
          variant="outline"
          type="multiple"
          className="w-full justify-start"
          onValueChange={(values) => {
            setBorders(values);
          }}
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
        </ToggleGroup> */}
      </div>
    </div>
  );
}
