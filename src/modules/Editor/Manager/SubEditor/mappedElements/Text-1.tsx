"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import fontFamily from "@/modules/Editor/data/config/Text/font-family.json";
import fontSize from "@/modules/Editor/data/config/Text/font-size.json";
import tags from "@/modules/Editor/data/config/Text/tags.json";
import fontStyle from "@/modules/Editor/data/config/Text/font-style.json";
import { RadioWithIcon } from "@/components/ui/radio-with-icon";
import clsx from "clsx";
import {
  AvailableTags,
  TextProps as TextPropsType,
} from "@/types/components/text";
import { useEditor } from "@/modules/Editor/EditorContext";
import { CheckboxWithIcon } from "@/components/ui/checkbox-with-icon";
import { ColorPicker } from "@/components/ColorPicker";

export function Text() {
  return (
    <form className="flex flex-col gap-2">
      <div className="text- flex flex-col gap-4">
        <InputContent data={data} />
        <TagSelect data={data} />
        {data?.settings?.as === ("a" as AvailableTags) && (
          <InputLink data={data} />
        )}
        <FontFamilySelect data={data} />
        <FontSizeSelect data={data} />
        <FontStyleSelect data={data} />
      </div>
      <ColorPickerText data={data} />

      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}

export function InputContent({ data }: TextProps) {
  const { useEditElement } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Texto</label>
      <Input
        value={data?.settings.value}
        onChange={(evt) => {
          useEditElement({
            ...data,
            settings: {
              ...data?.settings,
              value: evt.target.value,
            },
          } as TextPropsType);
        }}
        required
        name="value"
        className="w-full"
        placeholder="Digite o conteúdo"
      />
    </div>
  );
}

export function TagSelect({ data }: TextProps) {
  const { useEditElement } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Tag</label>
      <div className="flex gap-2 flex-wrap">
        {tags.map((el) => {
          return (
            <RadioWithIcon
              checked={data?.settings.as === el.value}
              onChange={() => {
                useEditElement({
                  ...data,
                  settings: {
                    ...data?.settings,
                    as: el.value,
                  },
                } as TextPropsType);
              }}
              ariaLabel={`Tag ${el.label}`}
              id={el.value}
              name={"tags"}
              title={el.label}
              key={el.value}
            >
              <p>{el.label}</p>
            </RadioWithIcon>
          );
        })}
      </div>
    </div>
  );
}

export function InputLink({ data }: TextProps) {
  const { useEditElement } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Link</label>
      <Input
        value={data?.settings?.link || ""}
        onChange={(evt) => {
          useEditElement({
            ...data,
            settings: {
              ...data?.settings,
              link: evt.target.value,
            },
          } as TextPropsType);
        }}
        required
        name="value"
        className="w-full"
        placeholder="http://exemplo.com"
      />
    </div>
  );
}

export function FontFamilySelect({ data }: TextProps) {
  const { useEditElement } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Fonte</label>

      <Select
        onValueChange={(value) =>
          useEditElement({
            ...data,
            style: { ...data?.style, fontFamily: value },
          } as TextPropsType)
        }
        required
        name="font-family"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"Escolha sua fonte"} />
        </SelectTrigger>
        <SelectContent>
          {fontFamily.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function FontSizeSelect({ data }: TextProps) {
  const { useEditElement } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Tamanho da fonte
      </label>
      <Select
        onValueChange={(value) =>
          useEditElement({
            ...data,
            style: { ...data?.style, fontSize: value },
          } as TextPropsType)
        }
        required
        name="font-size"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"Escolha o tamanho"} />
        </SelectTrigger>
        <SelectContent>
          {fontSize.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function FontStyleSelect({ data }: TextProps) {
  const { useEditElement } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Estilo da fonte
      </label>
      <div className="flex gap-2 flex-wrap">
        {fontStyle.map((el) => {
          const mappedOptions: { [key: string]: boolean } = {
            "font-style": !!data?.style?.fontStyle?.includes(el.value),
            "font-weight": !!data?.style?.fontWeight?.includes(el.value),
            "text-decoration": !!data?.style?.textDecoration?.includes(
              el.value
            ),
          };

          const removeCheckedValue = (value: string) => {
            return value.replace(el.value, "").trim();
          };

          const addCheckedValue = (value: string) => {
            return value.trim().concat(` ${el.value}`);
          };

          const mappedStylesWhenChecked: {
            [key: string]: { [key: string]: string };
          } = {
            "font-style": {
              fontStyle: removeCheckedValue(data?.style.fontStyle || ""),
            },
            "font-weight": {
              fontWeight: removeCheckedValue(data?.style.fontWeight || ""),
            },
            "text-decoration": {
              textDecoration: removeCheckedValue(
                data?.style.textDecoration || ""
              ),
            },
          };

          const mappedStyles: {
            [key: string]: { [key: string]: string };
          } = {
            "font-style": {
              fontStyle: el.value,
            },
            "font-weight": {
              fontWeight: el.value,
            },
            "text-decoration": {
              textDecoration: addCheckedValue(data?.style.textDecoration || ""),
            },
          };

          const isChecked = mappedOptions[el.type as string];

          return (
            <CheckboxWithIcon
              ariaLabel={`Estilo ${el.value}`}
              checked={isChecked}
              onChange={() => {
                if (isChecked) {
                  useEditElement({
                    ...data,
                    style: {
                      ...data?.style,
                      ...mappedStylesWhenChecked[el.type],
                    },
                  } as TextPropsType);
                } else {
                  useEditElement({
                    ...data,
                    style: {
                      ...data?.style,
                      ...mappedStyles[el.type],
                    },
                  } as TextPropsType);
                }
              }}
              id={el.value}
              name={"font-style"}
              title={`Estilo ${el.value}`}
              key={el.value}
            >
              <p
                className={clsx({
                  "font-mono": true,
                  italic: el.value === "italic",
                  "font-bold": el.value === "bold",
                  underline: el.value === "underline",
                  "line-through": el.value === "strikethrough",
                })}
              >
                {el.label}
              </p>
            </CheckboxWithIcon>
          );
        })}
      </div>
    </div>
  );
}

export function ColorPickerText({ data }: TextProps) {
  const { useEditElement } = useEditor();
  const [colorPicker, setColorPicker] = useState(data?.style.color || "#000");

  useEffect(() => {
    useEditElement({
      ...data,
      style: { ...data?.style, color: colorPicker },
    } as TextPropsType);
  }, [colorPicker]);

  return <ColorPicker color={colorPicker} setColor={setColorPicker} />;
}
