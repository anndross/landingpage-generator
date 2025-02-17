import { BaseProps } from "./base";
import fontFamilyJSON from "@/data/text/font-family.json";
import fontSizeJSON from "@/data/text/font-size.json";

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
    fontStyle: "normal" | "italic" | "bold" | "underline" | "strikethrough";
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
