import { Drawer } from "@/modules/Editor/Preview/components/Drawer";
import { useEditorStore } from "@/modules/Editor/context";
import { ContainerProps } from "@/types/container";

interface EditableContainerProps {
  data: ContainerProps;
}

export function Container({ data }: EditableContainerProps) {
  const {
    setLayout,
    editorFunctions: { breakpoint },
  } = useEditorStore();

  return (
    <div
      className="teste"
      onClick={(event) => {
        setLayout({
          ...data,
          style: {
            ...data?.style?.[breakpoint],
            width:
              (event.target as HTMLDivElement)?.style?.width ||
              data?.style?.[breakpoint]?.width,
            height:
              (event.target as HTMLDivElement)?.style?.height ||
              data?.style?.[breakpoint]?.height,
          },
        });
      }}
      style={{
        width: data?.style?.[breakpoint]?.width || "100%",
        height: data?.style?.[breakpoint]?.height || "100px",
        resize: "both",
        overflow: "auto",
      }}
    >
      <Drawer
        style={{ ...data.style[breakpoint], width: "100%", height: "100%" }}
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
