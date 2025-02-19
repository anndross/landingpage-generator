import { BaseProps } from "./base";

export type ImageProps = BaseProps & {
  settings: {
    src: string;
    alt: string;
    title: string;
    width: string;
    height: string;
  };
  style: {
    borderRadius: string;
    boxShadow: string;
    opacity: string;
  };
};
