import clsx from "clsx";
import { useEditorStore } from "../../context";
import { PreviewDropdown } from "./PreviewDropdown";
import { Edit } from "./Edit";
import { StyleButton } from "./StyleButton";
import { Button } from "@/components/ui/button";
import { TbBinaryTree } from "react-icons/tb";
import { Clear } from "./Clear";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

export function PreviewHeader() {
  const {
    layout,
    editorFunctions: { previewEditMode, viewLayout, sidebarOpen },
    setEditorFunctions,
  } = useEditorStore();

  return (
    <div
      className={clsx({
        "flex items-center pt-1 px-4 pl-14 justify-between gap-4 absolute w-full h-14 top-0 bg-transparent":
          true,
        "bg-[#f6f8fa]": !viewLayout,
      })}
    >
      <Button
        variant="outline"
        onClick={() =>
          setEditorFunctions({
            sidebarOpen: !sidebarOpen,
          })
        }
        className="absolute rounded-l-none border-l-white -left-[1px] w-10 shadow-none top-3"
      >
        {sidebarOpen ? <LuPanelLeftClose /> : <LuPanelRightClose />}
      </Button>

      <div className="flex items-center justify-center gap-4">
        <PreviewDropdown />

        {viewLayout && (
          <Edit
            state={previewEditMode}
            setState={(state) => {
              setEditorFunctions({
                previewEditMode: state,
              });
            }}
          />
        )}

        {!viewLayout && <StyleButton />}
      </div>

      <span className="text-zinc-600 text-xl">{layout.name}</span>

      <div className="flex items-center gap-4">
        <Clear />
        <Button
          onClick={() =>
            setEditorFunctions({
              treeOpen: true,
            })
          }
          variant="outline"
        >
          <TbBinaryTree />
        </Button>
      </div>
    </div>
  );
}
