import { ColorPicker } from "@/components/ColorPicker";
import { useEffect, useState } from "react";
import {
  useGetCurrentStyles,
  useUpdateCurrentStyles,
} from "@/modules/Editor/Manager/SubEditor/hooks";

export function Color() {
  const [colorPicker, setColorPicker] = useState(
    useGetCurrentStyles("color") || "#000"
  );

  useEffect(() => {
    useUpdateCurrentStyles({
      color: colorPicker,
    });
  }, [colorPicker]);

  return <ColorPicker color={colorPicker} setColor={setColorPicker} />;
}
