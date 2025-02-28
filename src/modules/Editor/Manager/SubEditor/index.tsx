"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { Container } from "@/modules/Editor/Manager/SubEditor/mappedElements/Container";
import { useEditorStore } from "@/modules/Editor/context";
import { Text } from "@/modules/Editor/Manager/SubEditor/mappedElements/Text";
import { Image } from "@/modules/Editor/Manager/SubEditor/mappedElements/Image";
import { Link } from "./mappedElements/Link";
import { Element } from "@/types/element";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SubEditor() {
  const {
    editorFunctions: { currentElementToEdit, subEditorOpen },
    setEditorFunctions,
  } = useEditorStore();

  const mappedElements: Partial<{
    [key in Element["type"] | "layout"]: ReactNode;
  }> = {
    text: (
      <Text.Root>
        <Container.Appearance />
        {/* <Text.Content />
        <Text.Tag /> */}
        {/* <Text.FontFamily />
        <Text.FontSize />
        <Text.FontStyle />
        <Text.Color />
        <Text.Spacing /> */}
      </Text.Root>
    ),
    container: (
      <Container.Root>
        {/* <Container.Size />
        <Container.Border /> */}
        <Container.Appearance />
        {/* <Container.Spacing />
        <Container.Position /> */}
      </Container.Root>
    ),
    layout: (
      <Container.Root>
        {/* <Container.Size />
        <Container.Border /> */}
        <Container.Appearance />
        {/* <Container.Spacing />
        <Container.Position /> */}
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
        <Link.Position />
        <Link.Appearance />
        <Link.Spacing />
      </Link.Root>
    ),
  };

  const currentElementType = currentElementToEdit?.type;

  return (
    <div
      className={clsx({
        "h-[calc(100%-80px)] w-64 bg-white overflow-y-auto z-10 duration-150 shadow-sm border-r border-r-zinc-200 top-0 left-0 absolute":
          true,
        "-translate-x-80": !subEditorOpen,
        "translate-x-0": subEditorOpen,
      })}
    >
      <div className="pt-3 w-full flex justify-end items-center">
        <Button
          onClick={() =>
            setEditorFunctions({
              subEditorOpen: false,
            })
          }
          variant="link"
        >
          <IoCloseOutline />
        </Button>
      </div>
      <div className="w-full p-4 pt-0">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">all</TabsTrigger>
            <TabsTrigger value="sm">sm</TabsTrigger>
            <TabsTrigger value="md">md</TabsTrigger>
            <TabsTrigger value="lg">lg</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {currentElementType && mappedElements[currentElementType]}
          </TabsContent>

          <TabsContent value="sm">
            {currentElementType && mappedElements[currentElementType]}
          </TabsContent>

          <TabsContent value="md">
            {currentElementType && mappedElements[currentElementType]}
          </TabsContent>

          <TabsContent value="lg">
            {currentElementType && mappedElements[currentElementType]}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
