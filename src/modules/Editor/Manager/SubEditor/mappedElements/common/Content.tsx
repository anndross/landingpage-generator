import { Input } from "@/components/ui/input";
import {
  useGetCurrentSettings,
  useUpdateCurrentSettings,
} from "@/modules/Editor/Manager/SubEditor/hooks";

export function Content() {
  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Texto</label>
      <Input
        value={useGetCurrentSettings("value") || ""}
        onChange={(evt) => {
          useUpdateCurrentSettings({
            value: evt.target.value,
          });
        }}
        required
        name="value"
        className="w-full"
        placeholder="Digite o conteúdo"
      />
    </div>
  );
}
