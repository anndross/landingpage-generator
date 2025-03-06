import { VtexIoCodeConverter } from "@/services/editor/converter/platform/vtex-io/code";
import { VtexIoStylesConverter } from "./platform/vtex-io/styles";
import { Breakpoints, EditorStore, ElementsType } from "@/modules/Editor/store";
import { mappedBreakpoints } from "@/shared/editor/mappedBreakpoints";
import { transformObjectToKebabCase } from "@/helpers/kebabCase";

export type BreakpointValue =
  (typeof mappedBreakpoints)[keyof typeof mappedBreakpoints];

export type StylesObject = {
  [key in BreakpointValue]: { [key: string]: { [key: string]: string } };
};

export type Constructor<T = {}> = abstract new (...args: any[]) => T;

export type Mixin<T extends Constructor> = (Base: T) => T;

type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never;

type CombineMixins<Base extends Constructor, Mixins extends Mixin<any>[]> = {
  new (
    ...args: ConstructorParameters<Base>
  ): InstanceType<Base> &
    UnionToIntersection<InstanceType<ReturnType<Mixins[number]>>>;
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
    return JSON.stringify(styles, null, 2)
      .replace(/"/g, "")
      .replace(/@@@:/g, " ")
      .replace(/,/g, ";")
      .slice(1, -1);
  }

  /**
   * @description Cria os estilos do layout com base na árvore criada pelo editor.
   * @returns Retorna a folha de estilo com breakpoints e suas propriedades atreladas à respectiva classe.
   */
  getStyles(): string {
    const buildCSS = (element: EditorStore["layout"] | ElementsType) => {
      console.log("styless children", element.children);
      console.log("styless element", element);

      const breakpoints = Object.keys(element.style) as Breakpoints[];

      breakpoints.forEach((breakpoint) => {
        const styles = element.style[breakpoint] || {};

        const mappedBreakpoint =
          mappedBreakpoints[breakpoint] + this.markerToRemoveColon;

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
    // console.log("styless", this.tree.children);

    return this.formatStyleObjectToString(this.css);
  }
}

const mixinsPlatforms = [VtexIoCodeConverter, VtexIoStylesConverter];

export const Converter = mixinsPlatforms.reduce(
  (Base, Mixin) => Mixin(Base),
  ConverterBase
) as CombineMixins<typeof ConverterBase, typeof mixinsPlatforms>;
