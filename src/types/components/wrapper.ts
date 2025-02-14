import { PreviewElement } from "@/modules/Editor/Preview/context";
import { BaseProps } from "./base";

export type WrapperProps = BaseProps & {
  children: PreviewElement[];
};
