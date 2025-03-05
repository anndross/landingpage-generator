import { ElementsType, LayoutStyle } from "@/modules/Editor/store";
import { BaseProps } from "./base";

export type ContainerElementProps = {
  children: ElementsType[];
  style: LayoutStyle;
  settings: any;
};

export type ContainerProps = BaseProps & ContainerElementProps;
