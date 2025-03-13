import { LinkProps } from "@/types/link";
import { GetSettings, GetSettingsProperty, GetStyles } from "../hooks";

interface EditableLinkProps {
  data: LinkProps;
}

export function Link({ data }: EditableLinkProps) {
  return (
    <a className={`${data.type}-${data.id}`} {...GetSettings(data)}>
      {GetSettingsProperty(data, "value")}
    </a>
  );
}
