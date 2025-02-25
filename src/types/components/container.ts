import { PreviewElement } from "@/modules/Editor/context";
import { BaseProps } from "./base";

export type ContainerProps = BaseProps & {
  children: PreviewElement[];
  style: {
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
    backgroundColor: string;
    borderRadius: string;
    boxShadow: string;
    opacity: string;
    width: string;
    height: string;
    padding: string;
    margin: string;
    flexDirection: "column" | "row";
    justifyContent: "flex-start" | "flex-end" | "center" | "space-between";
    alignItems: "flex-start" | "flex-end" | "center";
  };
  settings: {};
};
