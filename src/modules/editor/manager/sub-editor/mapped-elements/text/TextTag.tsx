import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import tags from "@/modules/editor/data/config/text/tags.json";
import {
  useGetCurrentSettingProp,
  useDebouncedUpdateCurrentSettings,
} from "@/modules/editor/hooks";
import { useEffect, useState } from "react";
import { AvailableTags } from "@/types/text";

export function TextTag() {
  const debouncedUpdate = useDebouncedUpdateCurrentSettings();

  const currentTag = useGetCurrentSettingProp("as") as AvailableTags;

  const [tag, setTag] = useState<AvailableTags>(currentTag || "p");

  useEffect(() => {
    if (tag) debouncedUpdate({ as: tag });
  }, [tag]);

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Tag</label>
      <ToggleGroup
        variant="outline"
        value={tag}
        onValueChange={(value: AvailableTags) => {
          if (value) setTag(value);
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
