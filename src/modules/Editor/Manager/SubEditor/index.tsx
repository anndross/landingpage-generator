"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { Container } from "@/modules/Editor/Manager/SubEditor/mappedElements/Container";
import { useEditor } from "@/modules/Editor/context";
import { Text } from "@/modules/Editor/Manager/SubEditor/mappedElements/Text";
import { Image } from "@/modules/Editor/Manager/SubEditor/mappedElements/Image";
import { Link } from "./mappedElements/Link";
import { Element } from "@/types/element";

export function SubEditor() {
  const {
    subEditor: { open, element },
    setSubEditor,
  } = useEditor();

  const mappedElements: Partial<{
    [key in Element["type"] | "layout"]: ReactNode;
  }> = {
    text: (
      <Text.Root>
        <Text.Content />
        <Text.Tag />
        <Text.FontFamily />
        <Text.FontSize />
        <Text.FontStyle />
        <Text.Color />
        <Text.Spacing />
      </Text.Root>
    ),
    container: (
      <Container.Root>
        <Container.Size />
        <Container.Border />
        <Container.Appearance />
        <Container.Spacing />
        <Container.Position />
      </Container.Root>
    ),
    layout: (
      <Container.Root>
        <Container.Size />
        <Container.Border />
        <Container.Appearance />
        <Container.Spacing />
        <Container.Position />
      </Container.Root>
    ),
    image: (
      <Image.Root>
        <Image.Url />
        <Image.Upload />
        <Image.Size />
        <Image.Seo />
        <Image.Border />
        <Image.Spacing />
      </Image.Root>
    ),
    link: (
      <Link.Root>
        <Link.Href />
        <Link.Content />
        <Link.FontFamily />
        <Link.FontSize />
        <Link.FontStyle />
        <Link.Color />
        <Link.Border />
        <Link.Appearance />
        <Link.Spacing />
      </Link.Root>
    ),
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
