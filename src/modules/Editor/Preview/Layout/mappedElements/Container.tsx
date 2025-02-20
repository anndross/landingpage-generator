import { Sortable } from "@/components/Sortable";
import { useEditor } from "@/modules/Editor/EditorContext";
import { ContainerProps } from "@/types/components/container";

interface EditableContainerProps {
  data: ContainerProps;
}

export function Container({ data }: EditableContainerProps) {
  const { useEditElement } = useEditor();

  return (
    <Sortable
      state={data.children}
      style={{ display: "flex", ...data.style }}
      setState={(newState) => {
        const id = `clone-${crypto.randomUUID()}`;

        const mappedNewState = newState.map((item, index) => ({
          ...item,
          id: item.id.toString()?.startsWith("clone-") ? item.id : id,
          indexPath: [...(data.indexPath || []), index],
        }));

        useEditElement({ ...data, children: mappedNewState } as ContainerProps);
      }}
      tag="div"
    />
  );
}
