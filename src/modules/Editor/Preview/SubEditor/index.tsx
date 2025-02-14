import clsx from "clsx";
import { PreviewElement } from "../context";
import { ElementWrapper } from "./ElementWrapper";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { TextProps } from "@/types/components/text";
import { WrapperProps } from "@/types/components/wrapper";
import { useEditor } from "../../EditorContext";
import { ElementText } from "./ElementText";

export function SubEditor() {
  const {
    subEditor: { open, element },
    setSubEditor,
  } = useEditor();

  const mappedElements: Partial<{
    [key in PreviewElement["type"]]: ReactNode;
  }> = {
    text: <ElementText data={element as TextProps} />,
    wrapper: <ElementWrapper data={element as WrapperProps} />,
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
        <Button
          onClick={() =>
            setSubEditor((prev) => ({
              ...prev,
              open: false,
            }))
          }
          variant="link"
        >
          <IoCloseOutline />
        </Button>
      </div>
      <div className="w-full p-4 pt-0">
        {element?.type.length && mappedElements[element?.type]}
      </div>
    </div>
  );
}
