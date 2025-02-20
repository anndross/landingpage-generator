import { LinkProps } from "@/types/components/link";

interface EditableLinkProps {
  data: LinkProps;
}

export function Link({ data }: EditableLinkProps) {
  return (
    <a
      {...data.settings}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...data.style,
      }}
    >
      {data.settings.value}
    </a>
  );
}
