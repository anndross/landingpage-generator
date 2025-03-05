import { Input } from "@/components/ui/input";
import {
  useGetCurrentSettings,
  useUpdateCurrentSettings,
} from "@/modules/Editor/Manager/SubEditor/hooks";

export function ImageUrl() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor="image-url" className="text-sm text-zinc-600 font-medium">
        URL
      </label>
      <Input
        placeholder="URL"
        value={useGetCurrentSettings("src") || ""}
        onChange={(evt) =>
          useUpdateCurrentSettings({
            href: evt.target.value,
          })
        }
        id="image-url"
        type="text"
      />
    </div>
  );
}
