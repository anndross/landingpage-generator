import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditor } from "@/modules/Editor/context";
import fontStyleData from "@/shared/editor/data/config/Text/font-style.json";
import clsx from "clsx";
import { useState } from "react";

export function FontStyle() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  const [value, setValue] = useState<string[]>([]);

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Estilo da fonte
      </label>
      <ToggleGroup
        variant="outline"
        value={value}
        onValueChange={(values) => {
          const mappedValues = values.reduce(
            (acc, e) => {
              const mappedKeys: { [key: string]: string } = {
                bold: "fontWeight",
                italic: "fontStyle",
                underline: "textDecoration",
                "line-through": "textDecoration",
              };

              acc[mappedKeys[e]] += " " + e;

              return acc;
            },
            {
              fontWeight: "",
              fontStyle: "",
              textDecoration: "",
            } as { [key: string]: string }
          );

          useEditElement({
            ...element,
            style: {
              ...element?.style,
              fontWeight: "",
              fontStyle: "",
              textDecoration: "",
              ...mappedValues,
            },
          } as any);

          setValue(values);
        }}
        type="multiple"
        className="w-full flex mt-2 gap-2 justify-between"
      >
        {fontStyleData.map((el) => {
          return (
            <ToggleGroupItem
              className="w-full h-10"
              value={el.value}
              aria-label={el.label}
              title={el.label}
              key={el.value}
            >
              <p
                className={clsx({
                  "font-mono": true,
                  italic: el.value === "italic",
                  "font-bold": el.value === "bold",
                  underline: el.value === "underline",
                  "line-through": el.value === "line-through",
                })}
              >
                {el.label}
              </p>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
