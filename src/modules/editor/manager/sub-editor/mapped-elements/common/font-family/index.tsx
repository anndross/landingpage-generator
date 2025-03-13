import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fontFamily from "@/modules/editor/data/config/text/font-family.json";
import { useDebouncedUpdateCurrentStyles } from "@/modules/editor/hooks";

export function FontFamily() {
  const updateStyles = useDebouncedUpdateCurrentStyles();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Fonte</label>

      <Select
        onValueChange={(value) =>
          updateStyles({
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
