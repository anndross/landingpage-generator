import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/modules/Editor/context";
import { TextProps } from "@/types/text";
import fontSize from "@/shared/editor/data/config/Text/font-size.json";

export function FontSize() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Tamanho da fonte
      </label>
      <Select
        onValueChange={(value) =>
          useEditElement({
            ...element,
            style: { ...element?.style, fontSize: value },
          } as TextProps)
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
