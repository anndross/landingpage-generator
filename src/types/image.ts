import { LayoutStyle } from "@/modules/Editor/context";
import { BaseProps } from "./base";

export type ImageProps = BaseProps & {
  settings: {
    src: string;
    alt: string;
    title: string;
  };
  style: LayoutStyle;
};
