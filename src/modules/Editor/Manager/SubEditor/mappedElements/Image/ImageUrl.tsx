import { Input } from "@/components/ui/input";
import {
  useGetCurrentSettings,
  useUpdateCurrentSettings,
} from "@/modules/Editor/Manager/SubEditor/hooks";

export function ImageUrl() {
  const updateStyles = useUpdateCurrentSettings();

  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor="image-url" className="text-sm text-zinc-600 font-medium">
        URL
      </label>
      <Input
        placeholder="URL"
        value={useGetCurrentSettings("src") || ""}
        onChange={(evt) =>
          updateStyles({
            href: evt.target.value,
          })
        }
        id="image-url"
        type="text"
      />
    </div>
  );
}
