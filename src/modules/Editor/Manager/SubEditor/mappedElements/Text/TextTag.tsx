import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import tags from "@/modules/Editor/data/config/Text/tags.json";
import { useEditor } from "@/modules/Editor/EditorContext";
import { WrapperProps } from "@/types/components/wrapper";

export function TextTag() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Tag</label>
      <ToggleGroup
        variant="outline"
        value={element?.settings.flexDirection}
        onValueChange={(value) => {
          if (value)
            useEditElement({
              ...element,
              settings: {
                ...element?.settings,
                flexDirection: value,
              },
            } as WrapperProps);
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
