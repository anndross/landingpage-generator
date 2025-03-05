import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { useEditorStore } from "@/modules/Editor/store";
import { ContainerProps } from "@/types/container";
import { GetStyleProperty, GetStyles, UpdateStyles } from "../hooks";

interface EditableContainerProps {
  data: ContainerProps;
}

export function Container({ data }: EditableContainerProps) {
  const setLayout = useEditorStore((state) => state.setLayout);

  return (
    <div
      className="teste"
      onClick={(event) => {
        UpdateStyles(data, {
          width:
            (event.target as HTMLDivElement)?.style?.width ||
            GetStyleProperty(data, "width"),
          height:
            (event.target as HTMLDivElement)?.style?.height ||
            GetStyleProperty(data, "width"),
        });
      }}
      style={{
        width: GetStyleProperty(data, "width") || "100%",
        height: GetStyleProperty(data, "height") || "100px",
        resize: "both",
        overflow: "auto",
        maxWidth: "100%",
      }}
    >
      <Drawer
        style={{ ...GetStyles(data), width: "100%", height: "100%" }}
        state={data.children}
        setState={(newState) => {
          const id = `clone-${crypto.randomUUID()}`;

          const mappedNewState = newState.map((item, index) => ({
            ...item,
            id: item.id.toString()?.startsWith("clone-") ? item.id : id,
            indexPath: [...(data.indexPath || []), index],
          }));

          setLayout({ ...data, children: mappedNewState } as ContainerProps);
        }}
        tag="div"
      />
    </div>
  );
}
