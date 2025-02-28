import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/modules/Editor/context";
import { TextProps } from "@/types/text";
import fontFamily from "@/shared/editor/data/config/Text/font-family.json";

export function FontFamily() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Fonte</label>

      <Select
        onValueChange={(value) =>
          setLayout({
            ...currentElement,
            style: { ...currentElement?.style, fontFamily: value },
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
