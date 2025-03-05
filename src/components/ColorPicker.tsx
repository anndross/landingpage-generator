import { Input } from "@/components/ui/input";
import { SketchPicker } from "react-color";
import { useState } from "react";

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

export function ColorPicker({ color, setColor }: ColorPickerProps) {
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const handleChangeComplete = (color: { hex: string }) => {
    setColor(color.hex);
  };

  return (
    <div>
      <div>
        <Input
          type="button"
          className="cursor-pointer"
          onClick={() => setOpenColorPicker((prev) => !prev)}
          value={color}
        />
      </div>
      {openColorPicker && (
        <SketchPicker onChange={handleChangeComplete} color={color} />
      )}
    </div>
  );
}
