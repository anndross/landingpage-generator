import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  MdOutlineVerticalAlignBottom,
  MdOutlineVerticalAlignCenter,
  MdOutlineVerticalAlignTop,
} from "react-icons/md";
import {
  useGetCurrentStyleProp,
  useDebouncedUpdateCurrentStyles,
} from "@/modules/editor/hooks";

export function PositionVertical() {
  const updateStyles = useDebouncedUpdateCurrentStyles();

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">
        Alinhamento vertical
      </span>
      <ToggleGroup
        variant="outline"
        type="single"
        className="w-full flex mt-2 gap-2 justify-between"
        value={useGetCurrentStyleProp("alignItems") || ""}
        onValueChange={(value) => {
          if (value)
            updateStyles({
              alignItems: value,
            });
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
  );
}
