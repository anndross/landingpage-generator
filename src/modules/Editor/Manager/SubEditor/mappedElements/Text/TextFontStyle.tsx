import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditor } from "@/modules/Editor/EditorContext";
import fontStyleData from "@/modules/Editor/data/config/Text/font-style.json";
import clsx from "clsx";
import { WrapperProps } from "@/types/components/wrapper";
import { TextProps } from "@/types/components/text";
import { useEffect, useState } from "react";

export function TextFontStyle() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  const {
    style: { fontStyle, fontWeight, textDecoration },
  } = element as TextProps;

  //   const mappedOptions: { [key: string]: boolean } = {
  //     "font-style": !!element?.style?.fontStyle?.includes(el.value),
  //     "font-weight": !!element?.style?.fontWeight?.includes(el.value),
  //     "text-decoration": !!element?.style?.textDecoration?.includes(el.value),
  //   };

  //   const removeCheckedValue = (value: string) => {
  //     return value.replace(el.value, "").trim();
  //   };

  //   const addCheckedValue = (value: string) => {
  //     return value.trim().concat(` ${el.value}`);
  //   };

  //   const mappedStylesWhenChecked: {
  //     [key: string]: { [key: string]: string };
  //   } = {
  //     "font-style": {
  //       fontStyle: removeCheckedValue(element?.style.fontStyle || ""),
  //     },
  //     "font-weight": {
  //       fontWeight: removeCheckedValue(element?.style.fontWeight || ""),
  //     },
  //     "text-decoration": {
  //       textDecoration: removeCheckedValue(element?.style.textDecoration || ""),
  //     },
  //   };

  //   const mappedStyles: {
  //     [key: string]: { [key: string]: string };
  //   } = {
  //     "font-style": {
  //       fontStyle: el.value,
  //     },
  //     "font-weight": {
  //       fontWeight: el.value,
  //     },
  //     "text-decoration": {
  //       textDecoration: addCheckedValue(element?.style.textDecoration || ""),
  //     },
  //   };

  //   const isChecked = mappedOptions[el.type as string];

  //   const [values, setValues] = useState<string[]>([]);

  //   useEffect(() => {
  //     const mappedValues = {
  //       fontWeight: "",
  //       textDecoration: "",
  //       fontStyle: "",
  //     };

  //     values.forEach((value) => {
  //       const json = JSON.parse(value);

  //       if (json.type !== "textDecoration") {
  //         mappedValues[json.type as "fontWeight" | "fontStyle"] =
  //           json.value || "";
  //       } else {
  //         mappedValues["textDecoration"] += json.value || "";
  //       }

  //       return;
  //     });

  //     useEditElement({
  //       ...element,
  //       style: {
  //         ...element?.style,
  //         ...mappedValues,
  //       },
  //     } as WrapperProps);
  //   }, [values]);

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Estilo da fonte
      </label>
      <ToggleGroup
        variant="outline"
        value={[
          fontStyle,
          fontWeight,
          ...(textDecoration?.split(" ").map((el) => el.trim()) || []),
        ]}
        onValueChange={(values) => {
          const valuesMapped = values.map((value) => {});
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
