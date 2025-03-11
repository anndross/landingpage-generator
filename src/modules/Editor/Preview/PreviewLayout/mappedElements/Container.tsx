import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { ElementsType, useEditorStore } from "@/modules/Editor/store";
import { ContainerProps } from "@/types/container";
import { GetStyleProperty, UpdateStyles } from "../hooks";
import { useCallback, useEffect, useState } from "react";

interface EditableContainerProps {
  data: ContainerProps;
}

export function Container({ data }: EditableContainerProps) {
  const setLayout = useEditorStore((state) => state.setLayout);
  const [state, setState] = useState<ContainerProps>(data);

  useEffect(() => {
    if (state && JSON.stringify(state) !== JSON.stringify(data)) {
      console.log("ALTEROU O ESTADO - state", state);

      setLayout(state);
    }
  }, [state, setLayout]);

  const handleSetState = useCallback((newState: ElementsType[]) => {
    setState((prevState) => ({
      ...prevState,
      children: newState,
    }));
  }, []);

  console.log("styles className", `${state.type}-${state.id}`);
  return (
    <div
      className={`${state.type}-${state.id}`}
      onClick={(event) => {
        UpdateStyles(state, {
          width:
            (event.target as HTMLDivElement)?.style?.width ||
            GetStyleProperty(state, "width"),
          height:
            (event.target as HTMLDivElement)?.style?.height ||
            GetStyleProperty(state, "height"),
        });
      }}
      style={{
        width: GetStyleProperty(state, "width") || "100%",
        height: GetStyleProperty(state, "height") || "100px",
        resize: "both",
        overflow: "auto",
        maxWidth: "100%",
        border: "1px solid black",
      }}
    >
      <Drawer
        style={{ width: "100%", height: "100%" }}
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

            console.log("ALTEROU O ESTADO - mappedNewState", mappedNewState);

            handleSetState(mappedNewState as ElementsType[]);
          }
        }}
        tag="div"
      />
    </div>
  );
}
