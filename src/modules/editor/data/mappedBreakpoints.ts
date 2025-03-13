import { Breakpoints } from "@/modules/editor/store";

export const mappedBreakpoints: { [key in Breakpoints]: string } = {
  all: "@media screen",
  sm: "@media (width <= 375px)",
  md: "@media (width <= 820px)",
  lg: "@media (width > 820px)",
};
