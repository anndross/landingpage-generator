import richTextJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/rich-text.json";
import imageJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/image.json";
import flexLayoutJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/flex-layout.row.json";

import { Options, PreviewElement } from "@/modules/Editor/EditorContext";

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
  function handleRichText(el: PreviewElement) {
    const richText = {
      [`rich-text#${el.id}`]: JSON.parse(
        JSON.stringify(richTextJson["rich-text"])
      ),
    };

    richText[`rich-text#${el.id}`]["props"]["text"] = el.settings.value || "";

    return richText;
  }

  function handleFlexLayout(element: PreviewElement) {
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

    const result = [flexLayout];

    if (element?.children?.length) {
      for (const el of element?.children as PreviewElement[]) {
        const mappedTypesElements = {
          text: handleRichText,
          container: handleFlexLayout,
          image: handleImage,
        };

        if (el?.children?.length) {
          const handleInstance = mappedTypesElements[el.type];

          const data = handleInstance(el);

          result.push(data);
        }
      }
    }

    const response = result.reduce((acc, currentValue) => {
      acc = {
        ...acc,
        ...currentValue,
      };

      return acc;
    }, {});

    return response;
  }

  function handleImage(el: PreviewElement) {
    if (el) imageJson["image"]["props"]["src"] = "";

    return imageJson;
  }

  const handlers: {
    [key in PreviewElement["type"]]: (el: PreviewElement) => object;
  } = {
    text: handleRichText,
    container: handleFlexLayout,
    image: handleImage,
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
    const [key, value] = Object.entries(item)[0];
    acc[key] = value;
    return acc;
  }, {});

  return page;
}
