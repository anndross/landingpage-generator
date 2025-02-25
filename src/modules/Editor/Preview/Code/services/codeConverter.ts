import richTextJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/rich-text.json";
import imageJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/image.json";
import flexLayoutJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/flex-layout.row.json";
import linkJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/link.json";

import { Options, PreviewElement } from "@/modules/Editor/context";
import { TextProps } from "@/types/components/text";
import { ImageProps } from "@/types/components/image";
import { LinkProps } from "@/types/components/link";
import { mapStyles } from "./utils/mapStyles";

export function codeConverter(
  type: Options["code"] | false,
  elements: PreviewElement[] | undefined
) {
  const methods = {
    "VTEX IO": vtexIoConverter,
  };

  if (!type || !elements) return null;

  const instance = methods[type];

  return instance(elements);
}

export function vtexIoConverter(elements: PreviewElement[]) {
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

  function handleFlexLayout(element: PreviewElement, result: object[] = []) {
    const flexLayout = {
      [`flex-layout.row#${element.id}`]: JSON.parse(
        JSON.stringify(flexLayoutJson["flex-layout.row"])
      ),
    };

    flexLayout[`flex-layout.row#${element.id}`]["children"] =
      element?.children.map((el: PreviewElement) => {
        const mappedTypesName = {
          text: `rich-text#${el.id}`,
          container: `flex-layout.row#${el.id}`,
          image: `image#${el.id}`,
          link: `link#${el.id}`,
        };

        return mappedTypesName[el.type];
      }) || [];
    flexLayout[`flex-layout.row#${element.id}`]["props"]["blockClass"] =
      element.id;

    flexLayoutStyle += `
      .vtex-flex-layout-0-x-flexRow--${element.id} ${JSON.stringify(mapStyles(element.style), null, 2).replaceAll(",", ";").replaceAll(`"`, "")}
    `.trim();
    flexLayoutStyle += "\n\n";

    result.push(flexLayout);

    if (element?.children?.length) {
      for (const el of element?.children as PreviewElement[]) {
        const mappedTypesElements: {
          [key in PreviewElement["type"]]: (
            el: PreviewElement,
            result?: object[]
          ) => object;
        } = {
          text: (data) => handleRichText(data as TextProps),
          container: (data, result?: object[]) =>
            handleFlexLayout(data as PreviewElement, result),
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
    [key in PreviewElement["type"]]: (el: PreviewElement) => object;
  } = {
    text: (data) => handleRichText(data as TextProps),
    container: (data) => handleFlexLayout(data as PreviewElement),
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
