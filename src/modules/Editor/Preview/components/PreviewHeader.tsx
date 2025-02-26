import clsx from "clsx";
import { useEditor } from "../../context";
import { PreviewDropdown } from "./PreviewDropdown";
import { Edit } from "./Edit";
import { StyleButton } from "./StyleButton";
import { Button } from "@/components/ui/button";
import { TbBinaryTree } from "react-icons/tb";
import { Clear } from "./Clear";

export function PreviewHeader() {
  const { preview, setPreview, previewElements, setTree } = useEditor();

  return (
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
          <Edit
            state={preview.canEdit}
            setState={(state) => {
              setPreview({
                canEdit: state,
              });
            }}
          />
        )}

        {preview.type === "code" && <StyleButton />}
      </div>

      <span className="text-zinc-600 text-xl">{previewElements.name}</span>

      <div className="flex items-center gap-4">
        <Clear />
        <Button onClick={() => setTree(true)} variant="outline">
          <TbBinaryTree />
        </Button>
      </div>
    </div>
  );
}
