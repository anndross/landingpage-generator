import richTextJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/rich-text.json";
import imageJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/image.json";
import flexLayoutRowJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/flex-layout.row.json";
import flexLayoutColJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/flex-layout.col.json";
import linkJson from "@/modules/Editor/Preview/PreviewCode/mappedElements/vtexIo/link.json";

import { Options } from "@/modules/Editor/context";
import { TextProps } from "@/types/text";
import { ImageProps } from "@/types/image";
import { LinkProps } from "@/types/link";
import { mapStyles } from "./utils/mapStyles";
import { Element } from "@/types/element";

export function codeConverter(
  type: Options["code"] | false,
  elements: Element[] | undefined
) {
  const methods = {
    "VTEX IO": vtexIoConverter,
  };

  if (!type || !elements) return null;

  const instance = methods[type];

  return instance(elements);
}

export function vtexIoConverter(elements: Element[]) {
  let richTextStyle =
    "/* ==================== RICH TEXT ==================== */\n";
  let flexLayoutStyle =
    "/* ==================== FLEX LAYOUT ==================== */\n";
  let imageStyle = "/* ==================== IMAGE ==================== */\n";
  let linkStyle = "/* ==================== LINK ==================== */\n";

  function handleRichText(el: TextProps) {
    const richText = {
      [`rich-text#${el.id}`]: JSON.parse(
        JSON.stringify(richTextJson["rich-text"])
      ),
    };

    richText[`rich-text#${el.id}`]["props"]["text"] = el.settings.value || "";
    richText[`rich-text#${el.id}`]["props"]["blockClass"] = el.id;

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

    richTextStyle += `
      .vtex-rich-text-0-x-${mappedTags[el?.settings?.as || "p"]}--${el.id} ${JSON.stringify(mapStyles(el.style), null, 2).replaceAll(",", ";").replaceAll(`"`, "")}
    `.trim();
    richTextStyle += "\n\n";

    return richText;
  }

  function handleFlexLayout(element: Element, result: object[] = []) {
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
      element?.children.map((el: Element) => {
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

    flexLayoutStyle += `
      .vtex-flex-layout-0-x-flexCol--${element.id} ${JSON.stringify(mapStyles(element.style), null, 2).replaceAll(",", ";").replaceAll(`"`, "")}
    `.trim();
    flexLayoutStyle += "\n\n";

    flexLayoutStyle += `
.vtex-flex-layout-0-x-flexColChild--${element.id} {
  width: fit-content !important;
  height: fit-content !important;
}
    `.trim();
    flexLayoutStyle += "\n\n";

    result.push(flexLayoutRow, flexLayoutCol);

    if (element?.children?.length) {
      for (const el of element?.children as Element[]) {
        const mappedTypesElements: {
          [key in Element["type"]]: (el: Element, result?: object[]) => object;
        } = {
          text: (data) => handleRichText(data as TextProps),
          container: (data, result?: object[]) =>
            handleFlexLayout(data as Element, result),
          image: (data) => handleImage(data as ImageProps),
          link: (data) => handleLink(data as LinkProps),
        };

        const handleInstance = mappedTypesElements[el.type];

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

  function handleImage(element: ImageProps) {
    const image = {
      [`image#${element.id}`]: JSON.parse(JSON.stringify(imageJson["image"])),
    };

    image[`image#${element.id}`]["props"]["src"] = element.settings.src || "";
    image[`image#${element.id}`]["props"]["width"] = element.style.width || "";
    image[`image#${element.id}`]["props"]["height"] =
      element.style.height || "";
    image[`image#${element.id}`]["props"]["title"] =
      element.settings.title || "";
    image[`image#${element.id}`]["props"]["alt"] = element.settings.alt || "";
    image[`image#${element.id}`]["props"]["blockClass"] = element.id;

    imageStyle += `
      .vtex-store-components-3-x-imageElement--${element.id} ${JSON.stringify(mapStyles(element.style), null, 2).replaceAll(",", ";").replaceAll(`"`, "")}
    `.trim();
    imageStyle += "\n\n";

    return image;
  }

  function handleLink(element: LinkProps) {
    const link = {
      [`link#${element.id}`]: JSON.parse(JSON.stringify(linkJson["link"])),
    };

    link[`link#${element.id}`]["props"]["href"] = element.settings.href || "";
    link[`link#${element.id}`]["props"]["label"] = element.settings.value || "";
    link[`link#${element.id}`]["props"]["blockClass"] = element.id;

    linkStyle += `
      .vtex-store-link-0-x-link--${element.id} ${JSON.stringify(mapStyles(element.style), null, 2).replaceAll(",", ";").replaceAll(`"`, "")}
    `.trim();
    linkStyle += "\n\n";

    return link;
  }

  const handlers: {
    [key in Element["type"]]: (el: Element) => object;
  } = {
    text: (data) => handleRichText(data as TextProps),
    container: (data) => handleFlexLayout(data as Element),
    image: (data) => handleImage(data as ImageProps),
    link: (data) => handleLink(data as LinkProps),
  };

  const mappedElements = elements.map((el) => {
    const handlerFn = handlers[el.type];

    return handlerFn(el);
  });

  const mappedPage = {
    "store.custom#landing-page": {
      children: mappedElements.map((el) => Object.keys(el)[0]),
    },
  };

  const page = [mappedPage, ...mappedElements].reduce((acc: any, item: any) => {
    return {
      ...acc,
      ...item,
    };
  }, {});

  return {
    code: page,
    style: `${richTextStyle}\n${flexLayoutStyle}\n${imageStyle}\n${linkStyle}`,
  };
}
