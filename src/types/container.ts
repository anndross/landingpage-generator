import { LayoutChildrenType, LayoutStyle } from "@/modules/Editor/context";
import { BaseProps } from "./base";

export type ContainerElementProps = {
  children: LayoutChildrenType[];
  style: LayoutStyle;
};

export type ContainerProps = BaseProps & ContainerElementProps;
