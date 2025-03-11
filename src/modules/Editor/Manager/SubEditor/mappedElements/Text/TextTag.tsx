import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import tags from "@/shared/editor/data/config/Text/tags.json";
import {
  useGetCurrentSettings,
  useUpdateCurrentSettings,
} from "@/modules/Editor/Manager/SubEditor/hooks";

export function TextTag() {
  const updateStyles = useUpdateCurrentSettings();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Tag</label>
      <ToggleGroup
        variant="outline"
        value={useGetCurrentSettings("as") || ""}
        onValueChange={(value) => {
          if (value)
            updateStyles({
              as: value,
            });
        }}
        type="single"
        className="w-full flex-wrap flex mt-2 gap-2 justify-between"
      >
        {tags.map((el) => {
          return (
            <ToggleGroupItem
              className="w-10 h-10"
              value={el.value}
              aria-label={el.value}
              title="Coluna"
              key={el.value}
            >
              {el.label}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
