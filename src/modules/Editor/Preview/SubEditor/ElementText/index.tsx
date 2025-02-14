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
import { useState } from "react";
import { handleToAdd } from "./Action";
import { SketchPicker } from "react-color";
import fontFamily from "@/data/text/font-family.json";
import fontSize from "@/data/text/font-size.json";
import tags from "@/data/text/tags.json";
import fontStyle from "@/data/text/font-style.json";
import { RadioWithIcon } from "@/components/ui/radio-with-icon";
import clsx from "clsx";
import { TextProps } from "@/types/components/text";
import {
  EditorContextI,
  PreviewElement,
  useEditor,
} from "@/modules/Editor/EditorContext";

interface ElementTextProps {
  data: TextProps | null;
}

export function ElementText({ data }: ElementTextProps) {
  return (
    <form action={handleToAdd} className="flex flex-col gap-2">
      <div className="text- flex flex-col gap-4">
        <InputContent data={data} />
        <TagSelect data={data} />
        <FontFamilySelect data={data} />
        <FontSizeSelect data={data} />
        <FontStyleSelect data={data} />
        <ColorPicker data={data} />
      </div>

      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}

export function InputContent({ data }: ElementTextProps) {
  const { setPreviewElements, setSubEditor } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Texto</label>
      <Input
        value={data?.value}
        onChange={(evt) => {
          setPreviewElements((prev) => {
            const prevClone = { ...prev };

            function setDataByPath(path: number[], newData: TextProps) {
              console.log("tagSelect setDataByPath 73", path, newData);

              let current: EditorContextI["previewElements"] | PreviewElement =
                prevClone;

              for (let i = 0; i < path.length - 1; i++) {
                current = current?.children[path[i]];
              }

              // Obtém o índice final do caminho
              const lastIndex = path[path.length - 1];

              if (current?.children && lastIndex !== undefined) {
                current.children[lastIndex] = newData; // Aqui alteramos diretamente a referência correta
              }

              console.log("tagSelect setDataByPath 81", path, newData, current);

              setSubEditor((prev) => ({
                ...prev,
                element: newData,
              }));
            }

            setDataByPath(data?.indexPath || [], {
              ...data,
              value: evt.target.value,
            } as TextProps);

            console.log("tagSelect prevClone", prevClone);

            return prevClone;
          });
        }}
        required
        name="value"
        className="w-full"
        placeholder="Digite o conteúdo"
      />
    </div>
  );
}

export function TagSelect({ data }: ElementTextProps) {
  const { setPreviewElements, setSubEditor } = useEditor();

  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Tag</label>
      <div className="flex gap-2 flex-wrap">
        {tags.map((el) => {
          return (
            <RadioWithIcon
              checked={data?.as === el.value}
              onChange={() => {
                setPreviewElements((prev) => {
                  const prevClone = { ...prev };

                  function setDataByPath(path: number[], newData: TextProps) {
                    console.log("tagSelect setDataByPath 73", path, newData);

                    let current:
                      | EditorContextI["previewElements"]
                      | PreviewElement = prevClone;

                    for (let i = 0; i < path.length - 1; i++) {
                      current = current?.children[path[i]];
                    }

                    // Obtém o índice final do caminho
                    const lastIndex = path[path.length - 1];

                    if (current?.children && lastIndex !== undefined) {
                      current.children[lastIndex] = newData; // Aqui alteramos diretamente a referência correta
                    }

                    console.log(
                      "tagSelect setDataByPath 81",
                      path,
                      newData,
                      current
                    );

                    setSubEditor((prev) => ({
                      ...prev,
                      element: newData,
                    }));
                  }

                  setDataByPath(data?.indexPath || [], {
                    ...data,
                    as: el.value,
                  } as TextProps);

                  console.log("tagSelect prevClone", prevClone);

                  return prevClone;
                });
              }}
              ariaLabel={`Tag ${el.label}`}
              id={el.value}
              size="2"
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

export function FontFamilySelect({ data }: ElementTextProps) {
  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">Fonte</label>

      <Select required name="font">
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

export function FontSizeSelect({ data }: ElementTextProps) {
  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Tamanho da fonte
      </label>
      <Select required name="font">
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

export function FontStyleSelect({ data }: ElementTextProps) {
  return (
    <div>
      <label className="text-sm text-zinc-700 font-medium">
        Estilo da fonte
      </label>
      <div className="flex gap-2 flex-wrap">
        {fontStyle.map((el) => {
          return (
            <RadioWithIcon
              ariaLabel={`Estilo ${el.value}`}
              id={el.value}
              size="2"
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
            </RadioWithIcon>
          );
        })}
      </div>
    </div>
  );
}

export function ColorPicker({ data }: ElementTextProps) {
  const [colorPicker, setColorPicker] = useState("#000");
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const handleChangeComplete = (color: { hex: string }) => {
    setColorPicker(color.hex);
  };

  return (
    <div>
      <div>
        <label className="text-sm text-zinc-700 font-medium">Cor</label>

        <Input
          type="button"
          className="cursor-pointer"
          onClick={() => setOpenColorPicker((prev) => !prev)}
          value={colorPicker}
        />
      </div>
      {openColorPicker && (
        <SketchPicker
          onChangeComplete={handleChangeComplete}
          color={colorPicker}
        />
      )}
    </div>
  );
}
