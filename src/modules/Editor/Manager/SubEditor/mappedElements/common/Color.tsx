import { ColorPicker } from "@/components/ColorPicker";
import { useEditor } from "@/modules/Editor/context";
import { TextProps } from "@/types/components/text";
import { useEffect, useState } from "react";

export function Color() {
  const {
    useEditElement,
    subEditor: { element: Element },
  } = useEditor();

  const element = Element as any;

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
