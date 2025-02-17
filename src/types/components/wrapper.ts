import { PreviewElement } from "@/modules/Editor/EditorContext";
import { BaseProps } from "./base";

export type WrapperProps = BaseProps & {
  children: PreviewElement[];
  style: {
    border: string;
    backgroundColor: string;
    borderRadius: string;
    boxShadow: string;
    opacity: string;
  };
  settings: {
    width: string;
    height: string;
    padding: string;
    margin: string;
  };
};
