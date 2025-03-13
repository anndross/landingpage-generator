import { LayoutStyle } from "@/modules/editor/store";
import { BaseProps } from "./base";

export type ImageProps = BaseProps & {
  settings: {
    src: string;
    alt: string;
    title: string;
    url: string;
  };
  style: LayoutStyle;
};
