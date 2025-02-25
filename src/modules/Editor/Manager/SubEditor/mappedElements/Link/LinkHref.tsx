import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/context";
import { LinkProps } from "@/types/components/link";

export function LinkHref() {
  const {
    useEditElement,
    subEditor: { element: Element },
  } = useEditor();

  const element = Element as LinkProps;

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">URL</label>
      <Input
        value={element?.settings?.href || ""}
        onChange={(evt) => {
          useEditElement({
            ...element,
            settings: {
              ...element?.settings,
              link: evt.target.value,
            },
          } as LinkProps);
        }}
        required
        name="value"
        className="w-full"
        placeholder="http://exemplo.com"
      />
    </div>
  );
}
