export function vtexIoConverter(layout: EditorStore["layout"]) {
    let bodyColStyle =
      "/* ==================== BODY COL ==================== */\n";
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
        .vtex-rich-text-0-x-${mappedTags[el?.settings?.as || "p"]}--${el.id} ${el.} ${JSON.stringify(mapStyles(el.style[]), null, 2).replaceAll(",", ";").replaceAll(`"`, "")}
      `.trim();
      richTextStyle += "\n\n";
  
      return richText;
    }
  
    function handleFlexLayout(
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
        for (const el of element?.children as ElementsType[]) {
          const mappedTypeslayout: {
            [key in ElementsType["type"]]: (
              el: ElementsType,
              result?: object[]
            ) => object;
          } = {
            text: (data) => handleRichText(data as TextProps),
            container: (data, result?: object[]) =>
              handleFlexLayout(data as ElementsType, result),
            image: (data) => handleImage(data as ImageProps),
            link: (data) => handleLink(data as LinkProps),
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
  
    function handleImage(element: ImageProps) {
      const image = {
        [`image#${element.id}`]: JSON.parse(JSON.stringify(imageJson["image"])),
      };
  
      image[`image#${element.id}`]["props"]["src"] = element.settings.src || "";
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
      [key in ElementsType["type"]]: (el: ElementsType) => object;
    } = {
      text: (data) => handleRichText(data as TextProps),
      container: (data) => handleFlexLayout(data as ElementsType),
      image: (data) => handleImage(data as ImageProps),
      link: (data) => handleLink(data as LinkProps),
    };
  
    const mappedlayout = layout.children.map((el) => {
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
        children: mappedlayout.map((el) => Object.keys(el)[0]),
        props: {
          blockClass: ["col-landing-page"],
        },
      },
    };
  
    bodyColStyle += `
      .vtex-flex-layout-0-x-flexCol--col-landing-page ${JSON.stringify(
        mapStyles(layout?.style || {}),
        null,
        2
      )
        .replaceAll(",", ";")
        .replaceAll(`"`, "")}
    `.trim();
    bodyColStyle += "\n\n";
    bodyColStyle += `
    .vtex-flex-layout-0-x-flexColChild--col-landing-page {
      width: 100%;
      height: 100%;
    }
        `.trim();
    bodyColStyle += "\n\n";
  
    const page = [mappedPage, ...mappedlayout].reduce((acc: any, item: any) => {
      return {
        ...acc,
        ...item,
      };
    }, {});
  
    return {
      code: page,
      style: `${bodyColStyle}\n${richTextStyle}\n${flexLayoutStyle}\n${imageStyle}\n${linkStyle}`,
    };
  }

  







class VtexIOMethods {

}