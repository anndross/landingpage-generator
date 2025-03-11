import { Input } from "@/components/ui/input";
import {
  useGetCurrentSettings,
  useUpdateCurrentSettings,
} from "@/modules/Editor/Manager/SubEditor/hooks";

export function LinkHref() {
  const updateStyles = useUpdateCurrentSettings();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">URL</label>
      <Input
        value={useGetCurrentSettings("href") || ""}
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
