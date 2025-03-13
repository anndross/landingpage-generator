import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import { LuBetweenVerticalStart } from "react-icons/lu";

import {
  useGetCurrentStyleProp,
  useDebouncedUpdateCurrentStyles,
} from "@/modules/editor/hooks";

export function PositionHorizontal() {
  const updateStyles = useDebouncedUpdateCurrentStyles();

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">
        Alinhamento horizontal
      </span>
      <ToggleGroup
        variant="outline"
        type="single"
        className="w-full flex mt-2 gap-2 justify-between"
        value={useGetCurrentStyleProp("justifyContent") || ""}
        onValueChange={(value) => {
          if (value)
            updateStyles({
              justifyContent: value,
            });
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
  );
}
