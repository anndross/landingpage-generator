import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fontSize from "@/shared/editor/data/config/Text/font-size.json";
import { useUpdateCurrentStyles } from "@/modules/Editor/Manager/SubEditor/hooks";

export function FontSize() {
  const updateStyles = useUpdateCurrentStyles();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Tamanho da fonte
      </label>
      <Select
        onValueChange={(value) =>
          updateStyles({
            fontSize: value,
          })
        }
        required
        name="font-size"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"Escolha o tamanho"} />
        </SelectTrigger>
        <SelectContent>
          {fontSize.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
