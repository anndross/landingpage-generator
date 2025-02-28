"use client";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import { useEditorStore } from "../../context";
import { Item } from "./Item";

export function Tree() {
  const {
    editorFunctions: { treeOpen },
    setEditorFunctions,
    layout,
  } = useEditorStore();

  return (
    <div
      className={clsx({
        "w-64 h-[calc(100%-80px)] flex flex-col overflow-y-auto shadow-md border-l duration-150 bg-white border-l-gray-200 absolute right-0 top-20 z-10":
          true,
        "translate-x-0": treeOpen,
        "translate-x-full": !treeOpen,
      })}
    >
      <div className="w-full">
        <Button
          onClick={() =>
            setEditorFunctions({
              treeOpen: false,
            })
          }
          variant="link"
        >
          <IoCloseOutline />
        </Button>
      </div>

      <Item element={layout} />
    </div>
  );
}
