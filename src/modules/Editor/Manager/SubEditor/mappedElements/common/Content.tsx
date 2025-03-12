import { Input } from "@/components/ui/input";
import {
  useGetCurrentSettings,
  useUpdateCurrentSettings,
} from "@/modules/Editor/Manager/SubEditor/hooks";
import { useEffect, useState } from "react";

export function Content() {
  const updateSettings = useUpdateCurrentSettings();

  const currentText = useGetCurrentSettings("value");

  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (currentText !== text) setText(currentText);
  }, [currentText]);

  useEffect(() => {
    if (text !== currentText) {
      updateSettings({
        value: text,
      });
    }
  }, [text]);

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Texto</label>
      <Input
        value={text}
        onChange={(evt) => {
          setText(evt.target.value);
        }}
        required
        name="value"
        className="w-full"
        placeholder="Digite o conteúdo"
      />
    </div>
  );
}
