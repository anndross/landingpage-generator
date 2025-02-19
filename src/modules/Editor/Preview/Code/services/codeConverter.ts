import richTextJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/rich-text.json";
import imageJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/image.json";
import flexLayoutJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/flex-layout.row.json";

import { Options, PreviewElement } from "@/modules/Editor/EditorContext";
import { TextProps } from "@/types/components/text";
import { ImageProps } from "@/types/components/image";

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
  function handleRichText(el: TextProps) {
    const richText = {
      [`rich-text#${el.id}`]: JSON.parse(
        JSON.stringify(richTextJson["rich-text"])
      ),
    };

    richText[`rich-text#${el.id}`]["props"]["text"] = el.settings.value || "";

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
        };

        return mappedTypesName[el.type];
      }) || [];

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

  function handleImage(el: ImageProps) {
    const image = {
      [`image#${el.id}`]: JSON.parse(JSON.stringify(imageJson["image"])),
    };

    image[`image#${el.id}`]["props"]["src"] = el.settings.src || "";
    image[`image#${el.id}`]["props"]["width"] = el.settings.width || "";
    image[`image#${el.id}`]["props"]["height"] = el.settings.height || "";
    image[`image#${el.id}`]["props"]["title"] = el.settings.title || "";
    image[`image#${el.id}`]["props"]["alt"] = el.settings.alt || "";

    return image;
  }

  const handlers: {
    [key in PreviewElement["type"]]: (el: PreviewElement) => object;
  } = {
    text: (data) => handleRichText(data as TextProps),
    container: (data) => handleFlexLayout(data as PreviewElement),
    image: (data) => handleImage(data as ImageProps),
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

  return page;
}
