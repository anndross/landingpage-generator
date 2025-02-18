import { ColorPicker } from "@/components/ColorPicker";
import { useEditor } from "@/modules/Editor/EditorContext";
import { TextProps } from "@/types/components/text";
import { useEffect, useState } from "react";

export function TextColorPicker() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  const [colorPicker, setColorPicker] = useState(
    element?.style.color || "#000"
  );

  useEffect(() => {
    useEditElement({
      ...element,
      style: { ...element?.style, color: colorPicker },
    } as TextProps);
  }, [colorPicker]);

  return <ColorPicker color={colorPicker} setColor={setColorPicker} />;
}
