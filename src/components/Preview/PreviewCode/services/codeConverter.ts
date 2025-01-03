import { Options, PreviewElements } from "@/components/Preview/context";

import richTextJson from "@/mappedComponents/vtexIo/rich-text.json";
import imageJson from "@/mappedComponents/vtexIo/image.json";

export function codeConverter(
  type: Options["code"] | false,
  elements: PreviewElements[] | undefined
) {
  const methods = {
    "VTEX IO": vtexIoConverter,
  };

  if (!type || !elements) return null;

  const instance = methods[type];

  return instance(elements);
}

export function vtexIoConverter(elements: PreviewElements[]) {
  function richText(el: PreviewElements) {
    const richText = {
      [`rich-text#${el.id}`]: JSON.parse(
        JSON.stringify(richTextJson["rich-text"])
      ),
    };

    richText[`rich-text#${el.id}`]["props"]["text"] = el.value || "";

    return richText;
  }

  function image(el: PreviewElements) {
    if (el) imageJson["image"]["props"]["src"] = "";

    return imageJson;
  }

  const components = {
    text: richText,
    image: image,
  };

  const mappedElements = elements.map((el) => {
    const instance = components[el.type];
    console.log("mappedElements", instance, el);
    return instance(el);
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
