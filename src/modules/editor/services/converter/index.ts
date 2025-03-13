import { VtexIoCodeConverter } from "@/modules/editor/services/converter/platform/vtex-io/code";
import { VtexIoStylesConverter } from "./platform/vtex-io/styles";
import { Breakpoints, EditorStore, ElementsType } from "@/modules/editor/store";
import { transformObjectToKebabCase } from "@/helpers/object-to-kebab-case";
import { CombineMixins } from "@/types/mixins";

const mappedBreakpointsContainer: { [key in Breakpoints]: string } = {
  all: "@container wrapper (width > 0px)",
  sm: "@container wrapper (width <= 375px)",
  md: "@container wrapper (width <= 820px)",
  lg: "@container wrapper (width > 820px)",
};

export type BreakpointValue =
  (typeof mappedBreakpointsContainer)[keyof typeof mappedBreakpointsContainer];

export type StylesObject = {
  [key in BreakpointValue]: { [key: string]: { [key: string]: string } };
};

export class ConverterBase {
  tree: EditorStore["layout"] | ElementsType;
  private css: StylesObject = {};
  readonly markerToRemoveColon: string = "@@@";

  constructor(tree: EditorStore["layout"] | ElementsType) {
    this.tree = tree;
  }

  /**
   * @param {object} styles Os estilos já montados na ordem correta com breakpoint e classes.
   * @description Recebe os estilos e transforma em uma string, removendo todos os elementos desnecessários e
   * inaceitáveis para o CSS. Para remover os ":" dos breakpoints e classes é verificado por um marcador: "@@@".
   * Todo elemento: ":" que estiver adjacente ao "@@@" será removido da string junto ao marcador.
   * @returns Retorna a folha de estilo com breakpoints e suas propriedades atreladas à respectiva classe em uma string.
   */
  formatStyleObjectToString(styles: StylesObject): string {
    const regexToGetPropertyWithoutSemicolon = new RegExp(
      /\b[a-z-]+:\s*[^;}\n]+(?=\s*[}\n])/g
    );

    return JSON.stringify(styles, null, 2)
      .slice(1, -1)
      .replace(/"/g, "")
      .replace(/@@@:/g, " ")
      .replace(/,/g, ";")
      .replaceAll("};", "}")
      .replace(regexToGetPropertyWithoutSemicolon, "$&;");
  }

  /**
   * @description Cria os estilos do layout com base na árvore criada pelo editor.
   * @returns Retorna a folha de estilo com breakpoints e suas propriedades atreladas à respectiva classe.
   */
  getStyles(): string {
    const buildCSS = (element: EditorStore["layout"] | ElementsType) => {
      const breakpoints = Object.keys(element.style) as Breakpoints[];

      breakpoints.forEach((breakpoint) => {
        const styles = element.style[breakpoint] || {};

        const mappedBreakpoint =
          mappedBreakpointsContainer[breakpoint] + this.markerToRemoveColon;

        const className =
          (element.type === "layout"
            ? ".landing-page"
            : `.${element.type}-${element.id}`) + this.markerToRemoveColon;

        this.css = {
          ...this.css,
          [mappedBreakpoint]: {
            ...(this.css?.[mappedBreakpoint] || {}),
            [className]: {
              ...(transformObjectToKebabCase(styles) || {}),
            },
          },
        };
      });

      if (element?.children?.length) {
        for (const child of element?.children) {
          buildCSS(child);
        }
      }
    };

    buildCSS(this.tree);

    return this.formatStyleObjectToString(this.css);
  }
}

const mixinsPlatforms = [VtexIoCodeConverter, VtexIoStylesConverter];

export const Converter = mixinsPlatforms.reduce(
  (Base, Mixin) => Mixin(Base),
  ConverterBase
) as CombineMixins<typeof ConverterBase, typeof mixinsPlatforms>;
