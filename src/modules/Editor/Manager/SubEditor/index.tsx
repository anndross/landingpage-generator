"use client";
import clsx from "clsx";
import { Wrapper } from "./mappedElements/Wrapper";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { TextProps } from "@/types/components/text";
import { WrapperProps } from "@/types/components/wrapper";
import { PreviewElement, useEditor } from "../../EditorContext";
import { Text } from "./mappedElements/Text";

export function SubEditor() {
  const {
    subEditor: { open, element },
    setSubEditor,
  } = useEditor();

  const mappedElements: Partial<{
    [key in PreviewElement["type"]]: ReactNode;
  }> = {
    text: (
      <Text.Root>
        <Text.Content />
        <Text.Tag />
        <Text.Link />
        <Text.ColorPicker />
        <Text.FontFamily />
        <Text.FontSize />
        <Text.FontStyle />
      </Text.Root>
    ),
    wrapper: <Wrapper />,
  };

  return (
    <div
      className={clsx({
        "h-full w-64 bg-white z-10 duration-150 shadow-sm border-r border-r-zinc-200 top-20 left-0 absolute":
          true,
        "-translate-x-80": !open,
        "translate-x-0": open,
      })}
    >
      <div className="pt-3 w-full flex justify-end items-center">
        <Button onClick={() => setSubEditor({ open: false })} variant="link">
          <IoCloseOutline />
        </Button>
      </div>
      <div className="w-full p-4 pt-0">
        {element?.type.length && mappedElements[element?.type]}
      </div>
    </div>
  );
}
