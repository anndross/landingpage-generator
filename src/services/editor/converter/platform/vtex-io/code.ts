import { ConverterBase } from "@/services/editor/converter/";
import { TextProps } from "@/types/text";
import richTextJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/rich-text.json";
import flexLayoutRowJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/flex-layout.row.json";
import flexLayoutColJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/flex-layout.col.json";
import imageJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/image.json";
import linkJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/link.json";

import { EditorStore, ElementsType } from "@/modules/Editor/store";
import { LinkProps } from "@/types/link";
import { ImageProps } from "@/types/image";
import { Constructor } from "@/types/mixins";

export const VtexIoCodeConverter = (Base: Constructor<ConverterBase>) =>
  class extends Base {
    private handleRichText(el: TextProps) {
      const richText = {
        [`rich-text#${el.id}`]: JSON.parse(
          JSON.stringify(richTextJson["rich-text"])
        ),
      };

      richText[`rich-text#${el.id}`]["props"]["text"] = el.settings.value || "";
      richText[`rich-text#${el.id}`]["props"]["blockClass"] = el.id;

      return richText;
    }

    private handleImage(element: ImageProps) {
      const image = {
        [`image#${element.id}`]: JSON.parse(JSON.stringify(imageJson["image"])),
      };

      image[`image#${element.id}`]["props"]["src"] = element.settings.src || "";
      image[`image#${element.id}`]["props"]["title"] =
        element.settings.title || "";
      image[`image#${element.id}`]["props"]["alt"] = element.settings.alt || "";
      image[`image#${element.id}`]["props"]["blockClass"] = element.id;

      return image;
    }

    private handleLink(element: LinkProps) {
      const link = {
        [`link#${element.id}`]: JSON.parse(JSON.stringify(linkJson["link"])),
      };

      link[`link#${element.id}`]["props"]["href"] = element.settings.href || "";
      link[`link#${element.id}`]["props"]["label"] =
        element.settings.value || "";
      link[`link#${element.id}`]["props"]["blockClass"] = element.id;

      return link;
    }

    private handleFlexLayout(
      element: EditorStore["layout"] | ElementsType,
      result: object[] = []
    ) {
      const flexLayoutCol = {
        [`flex-layout.col#${element.id}`]: JSON.parse(
          JSON.stringify(flexLayoutColJson["flex-layout.col"])
        ),
      };

      const flexLayoutRow = {
        [`flex-layout.row#${element.id}`]: JSON.parse(
          JSON.stringify(flexLayoutRowJson["flex-layout.row"])
        ),
      };

      flexLayoutCol[`flex-layout.col#${element.id}`]["children"] =
        element?.children?.map((el: ElementsType) => {
          const mappedTypesName = {
            text: `rich-text#${el.id}`,
            container: `flex-layout.row#${el.id}`,
            image: `image#${el.id}`,
            link: `link#${el.id}`,
          };

          return mappedTypesName[el.type];
        }) || [];
      flexLayoutRow[`flex-layout.row#${element.id}`]["children"] = [
        `flex-layout.col#${element.id}`,
      ];

      flexLayoutCol[`flex-layout.col#${element.id}`]["props"]["blockClass"] =
        element.id;
      flexLayoutRow[`flex-layout.row#${element.id}`]["props"]["blockClass"] =
        element.id;

      result.push(flexLayoutRow, flexLayoutCol);

      if (element?.children?.length) {
        for (const el of element?.children as ElementsType[]) {
          const mappedTypeslayout: {
            [key in ElementsType["type"]]: (
              el: ElementsType,
              result?: object[]
            ) => object;
          } = {
            text: (data) => this.handleRichText(data as TextProps),
            container: (data, result?: object[]) =>
              this.handleFlexLayout(data as ElementsType, result),
            image: (data) => this.handleImage(data as ImageProps),
            link: (data) => this.handleLink(data as LinkProps),
          };

          const handleInstance = mappedTypeslayout[el.type];

          const data = handleInstance(el, result);

          result.push(data);
        }
      }

      const response = result.reduce((acc, currentValue) => {
        return {
          ...acc,
          ...currentValue,
        };
      }, {});

      return response;
    }

    vtexIoPage(): string {
      const handlers: {
        [key in ElementsType["type"]]: (el: ElementsType) => object;
      } = {
        text: (data) => this.handleRichText(data as TextProps),
        container: (data) => this.handleFlexLayout(data as ElementsType),
        image: (data) => this.handleImage(data as ImageProps),
        link: (data) => this.handleLink(data as LinkProps),
      };

      const mappedlayout = this.tree.children.map((el: ElementsType) => {
        const handlerFn = handlers[el.type];

        return handlerFn(el);
      });

      const mappedPage = {
        "store.custom#landing-page": {
          children: ["flex-layout.row#landing-page"],
        },
        "flex-layout.row#landing-page": {
          children: ["flex-layout.col#landing-page"],
        },
        "flex-layout.col#landing-page": {
          children: mappedlayout.map((el: object) => Object.keys(el)[0]),
          props: {
            blockClass: ["col-landing-page"],
          },
        },
      };

      const code = [mappedPage, ...mappedlayout].reduce((acc, item) => {
        return {
          ...acc,
          ...item,
        };
      }, {});

      return JSON.stringify(code, null, 2);
    }
  };
