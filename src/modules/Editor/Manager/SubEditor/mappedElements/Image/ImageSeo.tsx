import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/context";
import { ImageProps } from "@/types/components/image";

export function ImageSeo() {
  const {
    useEditElement,
    subEditor: { element: Element },
  } = useEditor();

  const element = Element as ImageProps;

  return (
    <div className="flex flex-col items-start">
      <span className="text-sm text-zinc-600 font-medium">SEO</span>

      <div className="flex items-center justify-between gap-2">
        <Input placeholder="Title" />
        <Input placeholder="Alt" />
      </div>
    </div>
  );
}
