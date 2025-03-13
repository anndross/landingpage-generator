import {
  AllElementsOptions,
  EditorStore,
  ElementsOptions,
  ElementsType,
  useEditorStore,
} from "@/modules/editor/store";
import clsx from "clsx";

interface ItemProps {
  element: EditorStore["layout"] | ElementsType;
}

const mappedContent: Partial<{ [key in ElementsOptions]: string }> = {
  text: "Texto",
  container: "Container",
  image: "Imagem",
  link: "Link",
};

export function Item({ element }: ItemProps) {
  const {
    editorFunctions: { currentElementToEdit, subEditorOpen },
    setEditorFunctions,
  } = useEditorStore();

  const type: AllElementsOptions = element?.type;

  return (
    <div className="px-4 pt-1">
      <span
        className={clsx({
          "cursor-pointer capitalize font-semibold text-base text-zinc-600":
            true,
          "text-zinc-950 font-bold":
            element?.id === currentElementToEdit?.id && subEditorOpen,
        })}
        onClick={() =>
          setEditorFunctions({
            currentElementToEdit: element,
            subEditorOpen: true,
          })
        }
      >
        {type === "layout" ? element?.name : type && mappedContent[type]}
      </span>

      <div className="px-2">
        {element?.children?.map((el: ItemProps["element"]) => {
          return <Item key={el.id} element={el} />;
        })}
      </div>
    </div>
  );
}
