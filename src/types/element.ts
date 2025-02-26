import { ContainerProps } from "./container";
import { ImageProps } from "./image";
import { LinkProps } from "./link";
import { TextProps } from "./text";

export type Element = ImageProps | TextProps | ContainerProps | LinkProps;
