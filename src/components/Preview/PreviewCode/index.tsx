import { Highlight, themes } from "prism-react-renderer";
import { useContext } from "react";
import PreviewContext from "../context";
import { codeConverter } from "./services/codeConverter";

export function PreviewCode() {
  const { preview, previewElements } = useContext(PreviewContext);

  const previewType = preview.type === "code" && preview.option;

  const mappedLanguages = {
    default: "json",
    "VTEX IO": "json",
  };

  const code = codeConverter(previewType, previewElements);
  console.log("code", code, previewType, previewElements);

  return (
    <Highlight
      code={JSON.stringify(code, null, 2)}
      language={mappedLanguages[previewType || "default"]}
      theme={themes.github}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, width: "100%", height: "100%" }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
