import { LayoutStyle } from "@/modules/Editor/store";
import { BaseProps } from "./base";

export type LinkProps = BaseProps & {
  settings: {
    value: string;
    title: string;
    href: string;
    "aria-label": string;
  };
  style: LayoutStyle;
};
