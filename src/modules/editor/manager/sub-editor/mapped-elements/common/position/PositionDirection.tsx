import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TbBaselineDensityMedium } from "react-icons/tb";
import {
  useGetCurrentStyleProp,
  useDebouncedUpdateCurrentStyles,
} from "@/modules/editor/hooks";

export function PositionDirection() {
  const updateStyles = useDebouncedUpdateCurrentStyles();

  return (
    <div>
      <span className="text-sm text-zinc-600 font-medium">Direção</span>
      <ToggleGroup
        variant="outline"
        value={useGetCurrentStyleProp("flexDirection") || ""}
        onValueChange={(value) => {
          updateStyles({
            flexDirection: `${value}` as "row" | "column",
          });
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
  );
}
