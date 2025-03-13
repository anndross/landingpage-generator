import { ColorPicker } from "@/components/ColorPicker";
import { useEffect, useState } from "react";
import {
  useGetCurrentStyleProp,
  useDebouncedUpdateCurrentStyles,
} from "@/modules/editor/hooks";

export function Color() {
  const [colorPicker, setColorPicker] = useState(
    useGetCurrentStyleProp("color") || "#000"
  );

  const debouncedUpdate = useDebouncedUpdateCurrentStyles();

  useEffect(() => {
    debouncedUpdate({ color: colorPicker });
  }, [colorPicker]);

  return <ColorPicker color={colorPicker} setColor={setColorPicker} />;
}
