import { PreviewElement } from "@/modules/Editor/EditorContext";
import { BaseProps } from "./base";

export type WrapperProps = BaseProps & {
  children: PreviewElement[];
  style: {
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
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
    flexDirection: "column" | "row";
    justifyContent: "flex-start" | "flex-end" | "center" | "space-between";
    alignItems: "flex-start" | "flex-end" | "center";
  };
};
