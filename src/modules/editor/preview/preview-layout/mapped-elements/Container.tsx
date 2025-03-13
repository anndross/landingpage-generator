import { Drawer } from "@/modules/editor/preview/components/Drawer";
import { ElementsType, useEditorStore } from "@/modules/editor/store";
import { ContainerProps } from "@/types/container";
import { useCallback, useEffect, useState } from "react";

interface EditableContainerProps {
  data: ContainerProps;
}

export function Container({ data }: EditableContainerProps) {
  const setLayout = useEditorStore((state) => state.setLayout);
  const [state, setState] = useState<ContainerProps>(data);

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(state)) {
      setState(data);
    }
  }, [data]);

  useEffect(() => {
    setLayout(state);
  }, [state, setLayout]);

  const handleSetState = useCallback((newState: ElementsType[]) => {
    setState((prevState) => ({
      ...prevState,
      children: newState,
    }));
  }, []);

  return (
    <Drawer
      className={`${state.type}-${state.id}`}
      state={state?.children || []}
      setState={(newState) => {
        if (JSON.stringify(newState) !== JSON.stringify(state.children)) {
          const mappedNewState = newState.map((item) => ({
            ...item,
            id: item.id.toString()?.startsWith("clone-")
              ? item.id
              : `clone-${crypto.randomUUID()}`,
            index: [...(state.index || []), state.id],
          }));

          handleSetState(mappedNewState as ElementsType[]);
        }
      }}
      tag="div"
    />
  );
}
