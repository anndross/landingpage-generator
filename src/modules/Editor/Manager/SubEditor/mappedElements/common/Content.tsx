import { Input } from "@/components/ui/input";
import { useEditor } from "@/modules/Editor/context";
import { TextProps } from "@/types/text";

export function Content() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Texto</label>
      <Input
        value={(currentElement as TextProps)?.settings.value}
        onChange={(evt) => {
          setLayout({
            ...currentElement,
            settings: {
              ...(currentElement as TextProps)?.settings,
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
