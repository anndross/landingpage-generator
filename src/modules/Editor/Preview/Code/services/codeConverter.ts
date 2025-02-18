import richTextJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/rich-text.json";
import imageJson from "@/modules/Editor/Preview/Code/mappedElements/vtexIo/image.json";
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
  function richText(el: PreviewElement) {
    const richText = {
      [`rich-text#${el.id}`]: JSON.parse(
        JSON.stringify(richTextJson["rich-text"])
      ),
    };

    richText[`rich-text#${el.id}`]["props"]["text"] = el.settings.value || "";

    return richText;
  }

  function image(el: PreviewElement) {
    if (el) imageJson["image"]["props"]["src"] = "";

    return imageJson;
  }

  const components: {
    [key in PreviewElement["type"]]: (el: PreviewElement) => object;
  } = {
    text: richText,
    image: image,
    wrapper: () => ({}),
  };

  const mappedElements = elements.map((el) => {
    const instance = components[el.type];

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
