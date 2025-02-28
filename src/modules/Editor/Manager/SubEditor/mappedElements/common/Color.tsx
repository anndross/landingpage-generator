import { ColorPicker } from "@/components/ColorPicker";
import { useEditor } from "@/modules/Editor/context";
import { TextProps } from "@/types/text";
import { useEffect, useState } from "react";

export function Color() {
  const { setLayout, settings } = useEditor();

  const {
    manager: {
      subEditor: { currentElement },
    },
  } = settings;

  const [colorPicker, setColorPicker] = useState(
    currentElement?.style.color || "#000"
  );

  useEffect(() => {
    setLayout({
      ...currentElement,
      style: { ...currentElement?.style, color: colorPicker },
    } as TextProps);
  }, [colorPicker]);

  return <ColorPicker color={colorPicker} setColor={setColorPicker} />;
}
