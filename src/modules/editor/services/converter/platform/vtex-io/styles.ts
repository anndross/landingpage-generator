import { transformObjectToKebabCase } from "@/helpers/object-to-kebab-case";
import { Breakpoints, EditorStore, ElementsType } from "@/modules/editor/store";
import {
  ConverterBase,
  StylesObject,
} from "@/modules/editor/services/converter";
import { mappedBreakpoints } from "@/modules/editor/data/mappedBreakpoints";
import { Constructor } from "@/types/mixins";

export const VtexIoStylesConverter = (Base: Constructor<ConverterBase>) =>
  class extends Base {
    private vtexIOCSS: StylesObject = {};

    private getMappedCSSByVtexIoClassNames(
      element: EditorStore["layout"] | ElementsType,
      css: { [key: string]: string }
    ) {
      const { settings, id, type } = element;

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

      const classNames = {
        layout: {
          [".vtex-flex-layout-0-x-flexCol--col-landing-page" +
          this.markerToRemoveColon]: css,
          [".vtex-flex-layout-0-x-flexColChild--col-landing-page" +
          this.markerToRemoveColon]: {
            width: "100%",
            height: "100%",
          },
        },
        container: {
          [`.vtex-flex-layout-0-x-flexCol--${id}` + this.markerToRemoveColon]:
            css,
          [`.vtex-flex-layout-0-x-flexColChild--${id}` +
          this.markerToRemoveColon]: {
            width: "fit-content !important",
            height: "fit-content !important",
          },
        },
        text: {
          [`.vtex-rich-text-0-x-${mappedTags[settings?.as || "p"]}--${id}` +
          this.markerToRemoveColon]: css,
        },
        image: {
          [`.vtex-store-components-3-x-imageElement--${id}` +
          this.markerToRemoveColon]: css,
        },
        link: {
          [`.vtex-store-link-0-x-link--${id}` + this.markerToRemoveColon]: css,
        },
      };

      return classNames[type];
    }

    private buildVtexIoCSS(element: EditorStore["layout"] | ElementsType) {
      const breakpoints = Object.keys(element.style) as Breakpoints[];

      breakpoints.forEach((breakpoint) => {
        const styles = element.style[breakpoint] || {};

        const mappedCSSByVtexIoClassNames = this.getMappedCSSByVtexIoClassNames(
          element,
          transformObjectToKebabCase(styles)
        );

        const mappedBreakpoint =
          mappedBreakpoints[breakpoint] + this.markerToRemoveColon;

        this.vtexIOCSS = {
          ...this.vtexIOCSS,
          [mappedBreakpoint]: {
            ...(this.vtexIOCSS?.[mappedBreakpoint] || {}),
            ...(mappedCSSByVtexIoClassNames || {}),
          },
        };
      });

      if (element?.children?.length) {
        for (const child of element.children) {
          this.buildVtexIoCSS(child);
        }
      }
    }

    getVtexIoStyles() {
      this.buildVtexIoCSS(this.tree);

      return this.formatStyleObjectToString(this.vtexIOCSS);
    }
  };
