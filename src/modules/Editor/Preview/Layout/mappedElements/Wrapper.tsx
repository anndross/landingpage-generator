import { Sortable } from "@/components/Sortable";
import { useEditor } from "@/modules/Editor/EditorContext";
import { WrapperProps } from "@/types/components/wrapper";
import { useEffect } from "react";

interface EditableWrapperProps {
  data: WrapperProps;
}

export function Wrapper({ data }: EditableWrapperProps) {
  const { useEditElement } = useEditor();

  useEffect(() => {
    console.log("data mudou", data);
  }, [data]);

  return (
    <Sortable
      state={data.children}
      style={{ ...data.style, ...data.settings }}
      setState={(newState) => {
        const id = `clone-${crypto.randomUUID()}`;

        const mappedNewState = newState.map((item, index) => ({
          ...item,
          id: item.id.toString()?.startsWith("clone-") ? item.id : id,
          indexPath: [...(data.indexPath || []), index],
        }));

        useEditElement({ ...data, children: mappedNewState } as WrapperProps);
      }}
      tag="div"
    />
  );
}
