import { Input } from "@/components/ui/input";
import {
  useGetCurrentSettingProp,
  useDebouncedUpdateCurrentSettings,
} from "@/modules/editor/hooks";

export function ImageUrl() {
  const updateSettings = useDebouncedUpdateCurrentSettings();

  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor="image-url" className="text-sm text-zinc-600 font-medium">
        URL
      </label>
      <Input
        placeholder="URL"
        value={useGetCurrentSettingProp("src") || ""}
        onChange={(evt) =>
          updateSettings({
            href: evt.target.value,
          })
        }
        id="image-url"
        type="text"
      />
    </div>
  );
}
