import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/context";
import { ImageProps } from "@/types/image";

export function ImageUrl() {
  const {
    useEditElement,
    subEditor: { element: Element },
  } = useEditor();

  const element = Element as ImageProps;

  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor="image-url" className="text-sm text-zinc-600 font-medium">
        URL
      </label>
      <Input
        placeholder="URL"
        value={element?.settings.src}
        onChange={(evt) =>
          useEditElement({
            ...element,
            settings: { ...element?.settings, src: evt.target.value },
          })
        }
        id="image-url"
        type="text"
      />
    </div>
  );
}
