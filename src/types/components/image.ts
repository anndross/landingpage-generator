import { BaseProps } from "./base";

export type ImageProps = BaseProps & {
  images: {
    url: string;
    alt: string;
    title: string;
    width: string;
    height: string;
  }[];
};
