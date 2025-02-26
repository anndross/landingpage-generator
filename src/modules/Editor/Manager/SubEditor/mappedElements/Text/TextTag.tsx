import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import tags from "@/shared/editor/data/config/Text/tags.json";
import { useEditor } from "@/modules/Editor/context";
import { TextProps } from "@/types/text";

export function TextTag() {
  const {
    useEditElement,
    subEditor: { element: Element },
  } = useEditor();

  const element = Element as TextProps;

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Tag</label>
      <ToggleGroup
        variant="outline"
        value={element?.settings.as}
        onValueChange={(value) => {
          if (value)
            useEditElement({
              ...element,
              settings: {
                ...element?.settings,
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
