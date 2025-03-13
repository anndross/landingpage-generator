import { Input } from "@/components/ui/input";
import { useGetCurrentSettingProp } from "@/modules/editor/hooks";
import { useEditorStore } from "@/modules/editor/store";
import { useEffect, useState } from "react";

export function Content() {
  const updateCurrentElementSettings = useEditorStore(
    (state) => state.updateCurrentElementSettings
  );
  const currentText = useGetCurrentSettingProp("value");

  const [text, setText] = useState<string>(currentText || "");

  useEffect(() => {
    if (text !== currentText) {
      updateCurrentElementSettings({
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
