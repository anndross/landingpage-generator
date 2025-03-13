import { Input } from "@/components/ui/input";
import {
  useGetCurrentSettingProp,
  useDebouncedUpdateCurrentSettings,
} from "@/modules/editor/hooks";

export function LinkHref() {
  const updateStyles = useDebouncedUpdateCurrentSettings();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">URL</label>
      <Input
        value={useGetCurrentSettingProp("href") || ""}
        onChange={(evt) => {
          updateStyles({
            href: evt.target.value,
          });
        }}
        required
        name="value"
        className="w-full"
        placeholder="http://exemplo.com"
      />
    </div>
  );
}
