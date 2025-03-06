import { transformObjectToKebabCase } from "@/helpers/kebabCase";
import {
  Breakpoints,
  EditorStore,
  ElementsType,
  mappedBreakpoints,
} from "@/modules/Editor/store";
import { CodeConverter } from "@/services/editor/codeConverter";

type BreakpointValue =
  (typeof mappedBreakpoints)[keyof typeof mappedBreakpoints];

export const StylesConverter = (Base: typeof CodeConverter) =>
  class extends Base {
    getStylesVtexIO() {
      const mappedTags: { [key: string]: string } = {
        h1: "heading",
        h2: "heading",
        h3: "heading",
        h4: "heading",
        h5: "heading",
        h6: "heading",
        p: "paragraph",
        span: "paragraph",
      };

      const mappedClassNames = (
        css: { [key: string]: string },
        { id, type, settings }: EditorStore["layout"] | ElementsType
      ): { [key: string]: { [key: string]: string } } => {
        return {
          layout: {
            "vtex-flex-layout-0-x-flexCol--col-landing-page": css,
            ".vtex-flex-layout-0-x-flexColChild--col-landing-page": {
              width: "100%",
              height: "100%",
            },
          },
          container: {
            [`.vtex-flex-layout-0-x-flexCol--${id}`]: css,
            [`.vtex-flex-layout-0-x-flexColChild--${id}`]: {
              width: "fit-content !important",
              height: "fit-content !important",
            },
          },
          text: {
            [`.vtex-rich-text-0-x-${mappedTags[settings?.as || "p"]}--${id}`]:
              css,
          },
          image: {
            [`.vtex-store-components-3-x-imageElement--${id}`]: css,
          },
          link: {
            [`.vtex-store-link-0-x-link--${id}`]: css,
          },
        }[type];
      };

      let currentCSS: {
        [key in BreakpointValue]: { [key: string]: { [key: string]: string } };
      } = {};

      const buildCSS = (element: EditorStore["layout"] | ElementsType) => {
        const breakpoints = Object.keys(element.style) as Breakpoints[];

        breakpoints.forEach((breakpoint) => {
          const styles = element.style[breakpoint] || {};

          currentCSS = {
            [mappedBreakpoints[breakpoint]]: {
              ...(currentCSS?.[mappedBreakpoints[breakpoint]] || {}),
              ...(mappedClassNames(
                transformObjectToKebabCase(styles),
                element
              ) || {}),
            },
            //  ${mappedBreakpoints[breakpoint]} ${element.id} { ${transformObjectToKebabCase(styles)}
          };
        });

        if (element.children.length) {
          for (const element of this.tree.children) {
            return buildCSS(element);
          }
        }
      };

      buildCSS(this.tree);

      return currentCSS;
    }

    getStyles() {
      let currentCSS: string = "";

      const buildCSS = (element: EditorStore["layout"] | ElementsType) => {
        const breakpoints = Object.keys(element.style) as Breakpoints[];

        breakpoints.forEach((breakpoint) => {
          const styles = element.style[breakpoint] || {};

          currentCSS += `${mappedBreakpoints[breakpoint]} ${element.id} { ${transformObjectToKebabCase(styles)} }`;
        });

        if (element.children.length) {
          for (const element of this.tree.children) {
            return buildCSS(element);
          }
        }
      };

      buildCSS(this.tree);

      return currentCSS;
    }
  };
