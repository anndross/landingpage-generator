import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fontFamily from "@/shared/editor/data/config/Text/font-family.json";
import { useUpdateCurrentStyles } from "@/modules/Editor/Manager/SubEditor/hooks";

export function FontFamily() {
  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Fonte</label>

      <Select
        onValueChange={(value) =>
          useUpdateCurrentStyles({
            fontFamily: value,
          })
        }
        required
        name="font-family"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"Escolha sua fonte"} />
        </SelectTrigger>
        <SelectContent>
          {fontFamily.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
