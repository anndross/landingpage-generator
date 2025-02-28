import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/context";
import { LinkProps } from "@/types/link";

export function LinkHref() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">URL</label>
      <Input
        value={(currentElement as LinkProps)?.settings?.href || ""}
        onChange={(evt) => {
          setLayout({
            ...currentElement,
            settings: {
              ...(currentElement as LinkProps)?.settings,
              href: evt.target.value,
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
