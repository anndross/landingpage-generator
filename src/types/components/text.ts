import { BaseProps } from "./base";
import fontFamilyJSON from "@/modules/Editor/data/config/Text/font-family.json";
import fontSizeJSON from "@/modules/Editor/data/config/Text/font-size.json";

export type AvailableTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "a"
  | "span";

type FontFamily = (typeof fontFamilyJSON)[number]["value"];

type FontSize = (typeof fontSizeJSON)[number]["value"];

export type TextProps = BaseProps & {
  settings: {
    value: string;
    as: AvailableTags;
    link?: string;
  };
  style: {
    fontStyle: "italic" | "bold" | "underline" | "line-through";
    fontSize: FontSize;
    fontFamily: FontFamily;
    textDecoration: string;
    fontWeight:
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900"
      | "lighter"
      | "normal"
      | "bold"
      | "bolder";
    color: string;
  };
};
