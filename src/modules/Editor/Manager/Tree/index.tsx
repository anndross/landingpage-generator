"use client";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import { EditorContextI, useEditor } from "../../context";
import { Element } from "@/types/element";
import { Preview } from "@/types/preview";

const mappedContent: Partial<{ [key in Element["type"]]: string }> = {
  text: "Texto",
  container: "Container",
  image: "Imagem",
  link: "Link",
};

export function Tree() {
  const { setSubEditor, tree, setTree, previewElements } = useEditor();

  const openSubEditor = (element: Element | Preview) => {
    setSubEditor({
      open: true,
      element: element,
    });
  };
  return (
    <div
      className={clsx({
        "w-64 h-full flex flex-col shadow-md border-l duration-150 bg-white border-l-gray-200 absolute right-0 top-20 z-10":
          true,
        "translate-x-0": tree,
        "translate-x-full": !tree,
      })}
    >
      <div className="w-full">
        <Button onClick={() => setTree(false)} variant="link">
          <IoCloseOutline />
        </Button>
      </div>
      <div className="p-4">
        <strong
          className="cursor-pointer"
          onClick={() => openSubEditor(previewElements)}
        >
          {previewElements.name}
        </strong>

        <div className="px-2">
          {previewElements.children.map((child) => {
            if (child.type === "container") {
              return (
                <div key={child.id}>
                  <strong
                    className="cursor-pointer"
                    onClick={() => openSubEditor(child)}
                  >
                    {mappedContent[child.type]}
                  </strong>
                  {!!child.children.length && <Item data={child.children} />}
                </div>
              );
            }
            return (
              <strong
                className="block cursor-pointer"
                key={child.id}
                onClick={() => openSubEditor(child)}
              >
                {mappedContent[child.type]}
              </strong>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ItemProps {
  data: Element[];
}

const Item = ({ data }: ItemProps) => {
  const { setSubEditor } = useEditor();

  const openSubEditor = (element: Element) => {
    setSubEditor({
      open: true,
      element: element,
    });
  };

  return (
    <div className="px-3">
      {data.map((item) => {
        if (item.type === "container") {
          return (
            <div key={item.id}>
              <strong
                className="cursor-pointer"
                onClick={() => openSubEditor(item)}
              >
                {mappedContent[item.type]}
              </strong>
              {!!item.children.length && <Item data={item.children} />}
            </div>
          );
        }

        return (
          <strong
            className="block cursor-pointer"
            key={item.id}
            onClick={() => openSubEditor(item)}
          >
            {mappedContent[item.type]}
          </strong>
        );
      })}
    </div>
  );
};
