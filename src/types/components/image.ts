import { BaseProps } from "./base";

export type ImageProps = BaseProps & {
  settings: {
    src: string;
    alt: string;
    title: string;
  };
  style: {
    width: string;
    height: string;
    borderRadius: string;
    boxShadow: string;
    opacity: string;
  };
};
