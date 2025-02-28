export function mapStyles(cssData: object) {
  const newCssData = [];

  const mappedCSSData: { [key: string]: string } = {
    width: "width",
    height: "height",
    padding: "padding",
    margin: "margin",
    flexDirection: "flex-direction",
    justifyContent: "justify-content",
    alignItems: "align-items",
    backgroundColor: "background-color",
    borderRadius: "border-radius",
    borderWidth: "border-width",
    borderStyle: "border-style",
    borderColor: "border-color",
    color: "color",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontWeight: "font-weight",
    fontStyle: "font-style",
    textDecoration: "text-decoration",
    boxShadow: "box-shadow",
    opacity: "opacity",
    display: "display",
  };

  for (const [key, value] of Object.entries(cssData)) {
    newCssData.push([mappedCSSData[key], value]);
  }

  return Object.fromEntries(newCssData);
}
