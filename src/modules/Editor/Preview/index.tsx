"use client";
import React, { useEffect, useRef } from "react";
import { PreviewCode } from "./Code";
import clsx from "clsx";
import { PreviewDropdown } from "./components/PreviewDropdown";
import { EditToggle } from "./components/EditToggle";
import { Button } from "@/components/ui/button";
import { TbBinaryTree } from "react-icons/tb";
import { Tree } from "./Tree";
import { PreviewElement, useEditor } from "../context";
import { ClearPreview } from "./components/ClearPreview";
import { Layout } from "./Layout";
import { useCookies } from "next-client-cookies";
import { StyleButton } from "./components/StyleButton";

interface PreviewProps {
  layout: {
    children: PreviewElement[];
    name: string;
    id: string;
  };
}

export function Preview({ layout }: PreviewProps) {
  const cookies = useCookies();

  const { preview, setPreview, setTree, previewElements, setPreviewElements } =
    useEditor();

  const isMountingRef = useRef(true);

  useEffect(() => {
    // Resetar o estado completamente antes de atualizar
    setPreviewElements({ children: [], name: layout.name, id: layout.id });

    // Aguarda um pequeno delay para garantir que o reset foi aplicado
    setTimeout(() => {
      setPreviewElements({ ...layout, children: layout.children });
    }, 10);
  }, [layout.id]);

  useEffect(() => {
    const updatePreviewElementsOnDB = async () => {
      await fetch("/api/private/preview/update", {
        method: "PUT",
        body: JSON.stringify({
          children: previewElements?.children,
          name: previewElements?.name,
          id: layout?.id,
        }),
        headers: {
          Authorization: "Bearer " + cookies.get("auth_token"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    };

    if (!isMountingRef.current) {
      updatePreviewElementsOnDB();
    } else {
      isMountingRef.current = false;
    }
  }, [previewElements]);

  function handleToggleCanEdit(state: boolean) {
    setPreview({
      canEdit: state,
    });
  }

  return (
    <>
      <Tree />

      <div className="relative flex flex-col justify-between gap-2 h-full w-[calc(100%-256px)] pt-14">
        <div
          className={clsx({
            "flex items-center pt-1 px-4 justify-between gap-4 absolute w-full h-14 top-0 bg-transparent":
              true,
            "bg-[#f6f8fa]": preview.type === "code",
          })}
        >
          <div className="flex items-center justify-center gap-4">
            <PreviewDropdown />

            {preview.type === "layout" && (
              <EditToggle
                state={preview.canEdit}
                setState={handleToggleCanEdit}
              />
            )}

            {preview.type === "code" && <StyleButton />}
          </div>

          <span className="text-zinc-600 text-xl">{previewElements.name}</span>

          <div className="flex items-center gap-4">
            <ClearPreview />
            <Button onClick={() => setTree(true)} variant="outline">
              <TbBinaryTree />
            </Button>
          </div>
        </div>
        <div
          className={clsx({
            "w-full h-full p-4 bg-[#f6f8fa]": true,
            hidden: preview.type !== "code",
          })}
        >
          <PreviewCode />
        </div>
        <div
          className={clsx({
            "w-full h-full": true,
            hidden: preview.type !== "layout",
          })}
        >
          <Layout />
        </div>
      </div>
    </>
  );
}
