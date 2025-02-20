import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/EditorContext";
import { TextProps } from "@/types/components/text";

export function Content() {
  const {
    useEditElement,
    subEditor: { element: Element },
  } = useEditor();

  const element = Element as any;

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Texto</label>
      <Input
        value={element?.settings.value}
        onChange={(evt) => {
          useEditElement({
            ...element,
            settings: {
              ...element?.settings,
              value: evt.target.value,
            },
          } as TextProps);
        }}
        required
        name="value"
        className="w-full"
        placeholder="Digite o conteúdo"
      />
    </div>
  );
}
