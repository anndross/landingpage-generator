import { Appearance } from "../common/appearance";
import { Border } from "../common/border";
import { Color } from "../common/color";
import { Content } from "../common/content";
import { FontFamily } from "../common/font-family";
import { FontSize } from "../common/font-size";
import { FontStyle } from "../common/font-style";
import { Position } from "../common/position";
import { Spacing } from "../common/spacing";
import { LinkHref } from "./LinkHref";
import { LinkRoot } from "./LinkRoot";

export const Link = {
  Root: LinkRoot,
  Href: LinkHref,
  Content,
  FontFamily,
  FontSize,
  FontStyle,
  Border,
  Appearance,
  Color,
  Spacing,
  Position,
};
