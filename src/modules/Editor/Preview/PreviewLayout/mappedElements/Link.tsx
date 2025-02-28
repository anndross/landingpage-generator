import { useEditorStore } from "@/modules/Editor/context";
import { LinkProps } from "@/types/link";

interface EditableLinkProps {
  data: LinkProps;
}

export function Link({ data }: EditableLinkProps) {
  const {
    editorFunctions: { breakpoint },
  } = useEditorStore();

  return (
    <a
      {...data.settings}
      style={{
        ...data.style[breakpoint],
      }}
    >
      {data.settings.value}
    </a>
  );
}
