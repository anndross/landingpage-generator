import { BaseProps } from "./base";
import { FontFamily, FontSize, FontStyle, FontWeight } from "./text";

export type LinkProps = BaseProps & {
  settings: {
    value: string;
    title: string;
    href: string;
    "aria-label": string;
  };
  style: {
    width: string;
    height: string;
    backgroundColor: string;
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
    boxShadow: string;
    opacity: number;
    color: string;
    fontSize: FontSize;
    fontStyle: FontStyle;
    fontFamily: FontFamily;
    fontWeight: FontWeight;
    textDecoration: string;
  };
};
