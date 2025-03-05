"use client";
import clsx from "clsx";
import { Elements } from "./Elements";
import { SubEditor } from "./SubEditor";
import { Tree } from "./Tree";
import { useEditorStore } from "../store";

export function Manager() {
  const open = useEditorStore((state) => state.editorFunctions.sidebarOpen);

  return (
    <>
      <aside
        className={clsx({
          "h-full p-3 w-64 shrink-0 shadow-sm border-r border-r-gray-200": true,
          "-translate-x-full absolute top-20 left-0": !open,
          "translate-x-0 static": open,
        })}
      >
        <Elements />
        <SubEditor />
      </aside>
      <Tree />
    </>
  );
}
