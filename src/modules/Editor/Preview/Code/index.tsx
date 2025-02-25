import { Highlight, themes } from "prism-react-renderer";
import { codeConverter } from "./services/codeConverter";
import { useEditor } from "../../context";
import { Button } from "@/components/ui/button";
import { BsCopy } from "react-icons/bs";
import { useState } from "react";

export function PreviewCode() {
  const { preview, previewElements } = useEditor();
  const [showAlert, setShowAlert] = useState(false);

  const previewType = preview.type === "code" && preview.option;

  const mappedLanguages = {
    default: "json",
    "VTEX IO": "json",
    CSS: "css",
  };

  const { code, style } = codeConverter(
    previewType,
    previewElements.children
  ) || {
    code: null,
    style: null,
  };

  const currentCode = preview.style
    ? style || ""
    : JSON.stringify(code, null, 2);

  return (
    <div className="relative">
      <Button
        onClick={() => navigator.clipboard.writeText(currentCode || "")}
        variant="outline"
        className="absolute top-0 right-0"
      >
        <BsCopy />
      </Button>

      <Highlight
        code={currentCode}
        language={
          preview.style ? "css" : mappedLanguages[previewType || "default"]
        }
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
    </div>
  );
}
