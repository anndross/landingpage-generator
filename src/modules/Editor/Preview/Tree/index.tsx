import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import { PreviewElement, useEditor } from "../../EditorContext";

const mappedContent: Partial<{ [key in PreviewElement["type"]]: string }> = {
  text: "Texto",
  wrapper: "Container",
};

export function Tree() {
  const { setSubEditor, tree, setTree, previewElements } = useEditor();

  const openSubEditor = (element: PreviewElement) => {
    setSubEditor((prev) => ({
      ...prev,
      open: true,
      element: element,
    }));
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
        {previewElements.children.map((child) => {
          if (child.type === "wrapper") {
            return (
              <div key={child.id}>
                <strong onClick={() => openSubEditor(child)}>
                  {mappedContent[child.type]}
                </strong>
                {!!child.children.length && <Item data={child.children} />}
              </div>
            );
          }
          return (
            <strong
              className="block"
              key={child.id}
              onClick={() => openSubEditor(child)}
            >
              {mappedContent[child.type]}
            </strong>
          );
        })}
      </div>
    </div>
  );
}

interface ItemProps {
  data: PreviewElement[];
}

const Item = ({ data }: ItemProps) => {
  const { setSubEditor } = useEditor();

  const openSubEditor = (element: PreviewElement) => {
    setSubEditor((prev) => ({
      ...prev,
      open: true,
      element: element,
    }));
  };

  return (
    <div className="px-3">
      {data.map((item) => {
        if (item.type === "wrapper") {
          return (
            <div key={item.id}>
              <strong onClick={() => openSubEditor(item)}>
                {mappedContent[item.type]}
              </strong>
              {!!item.children.length && <Item data={item.children} />}
            </div>
          );
        }

        return (
          <strong
            className="block"
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
