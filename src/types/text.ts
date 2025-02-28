import { LayoutStyle } from "@/modules/Editor/context";
import { BaseProps } from "./base";
import fontFamilyJSON from "@/shared/editor/data/config/Text/font-family.json";
import fontSizeJSON from "@/shared/editor/data/config/Text/font-size.json";

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

export type FontFamily = (typeof fontFamilyJSON)[number]["value"];

export type FontSize = (typeof fontSizeJSON)[number]["value"];

export type FontWeight =
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

export type FontStyle = "italic" | "bold" | "underline" | "line-through";

export type TextProps = BaseProps & {
  settings: {
    value: string;
    as: AvailableTags;
  };
  style: LayoutStyle;
};
