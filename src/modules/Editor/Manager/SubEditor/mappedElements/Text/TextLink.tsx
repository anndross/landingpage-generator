import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/EditorContext";
import { TextProps } from "@/types/components/text";

export function TextLink() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Link</label>
      <Input
        value={element?.settings?.link || ""}
        onChange={(evt) => {
          useEditElement({
            ...element,
            settings: {
              ...element?.settings,
              link: evt.target.value,
            },
          } as TextProps);
        }}
        required
        name="value"
        className="w-full"
        placeholder="http://exemplo.com"
      />
    </div>
  );
}
