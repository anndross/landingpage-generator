import { Input } from "@/components/ui/input";
// import { useEditor } from "@/modules/Editor/context";

export function ImageSeo() {
  // const { setLayout, settings } = useEditor();

  // const {
  //   manager: {
  //     subEditor: { currentElement },
  //   },
  // } = settings;

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
