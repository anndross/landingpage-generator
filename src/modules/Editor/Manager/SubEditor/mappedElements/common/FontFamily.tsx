import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/modules/Editor/EditorContext";
import { TextProps } from "@/types/components/text";
import fontFamily from "@/modules/Editor/data/config/Text/font-family.json";

export function FontFamily() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Fonte</label>

      <Select
        onValueChange={(value) =>
          useEditElement({
            ...element,
            style: { ...element?.style, fontFamily: value },
          } as TextProps)
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
