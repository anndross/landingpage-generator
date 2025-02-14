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
  | "span";

type FontFamily = (typeof fontFamilyJSON)[number]["value"];

type FontSize = (typeof fontSizeJSON)[number]["value"];

export type TextProps = BaseProps & {
  value: string;
  as: AvailableTags;
  style: "normal" | "italic" | "bold" | "underline" | "strikethrough";
  size: FontSize;
  family: FontFamily;
  color: string;
};
