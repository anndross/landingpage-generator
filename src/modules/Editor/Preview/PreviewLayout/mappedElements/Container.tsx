import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { useEditor } from "@/modules/Editor/context";
import { ContainerProps } from "@/types/container";

interface EditableContainerProps {
  data: ContainerProps;
}

export function Container({ data }: EditableContainerProps) {
  const { useEditElement } = useEditor();

  return (
    <Drawer
      state={data.children}
      style={{ ...data.style }}
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
