import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/context";
import { ImageProps } from "@/types/image";

export function ImageUrl() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor="image-url" className="text-sm text-zinc-600 font-medium">
        URL
      </label>
      <Input
        placeholder="URL"
        value={(currentElement as ImageProps)?.settings.src}
        onChange={(evt) =>
          setLayout({
            ...currentElement,
            settings: {
              ...(currentElement as ImageProps)?.settings,
              href: evt.target.value,
            },
          })
        }
        id="image-url"
        type="text"
      />
    </div>
  );
}
