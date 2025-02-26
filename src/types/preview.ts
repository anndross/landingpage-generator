import { ContainerElementProps } from "./container";
import { Element } from "./element";

export type Preview = Partial<ContainerElementProps> & {
  id: string;
  name: string;
  children: Element[];
  type: "layout";
};
