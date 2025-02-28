import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import tags from "@/shared/editor/data/config/Text/tags.json";
import { useEditor } from "@/modules/Editor/context";
import { TextProps } from "@/types/text";

export function TextTag() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Tag</label>
      <ToggleGroup
        variant="outline"
        value={(currentElement as TextProps)?.settings.as}
        onValueChange={(value) => {
          if (value)
            setLayout({
              ...currentElement,
              settings: {
                ...(currentElement as TextProps)?.settings,
                as: value,
              },
            } as TextProps);
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
