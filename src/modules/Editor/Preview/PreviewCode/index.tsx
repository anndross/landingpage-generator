import { Highlight, themes } from "prism-react-renderer";
import { codeConverter } from "./services/codeConverter";
import { useEditorStore } from "../../store";
import { Button } from "@/components/ui/button";
import { BsCopy } from "react-icons/bs";

export function PreviewCode() {
  const { editorFunctions, layout } = useEditorStore();

  const language =
    !editorFunctions.viewLayout && editorFunctions.codeSelection.language;

  const mappedLanguages = {
    default: "json",
    "VTEX IO": "json",
    CSS: "css",
  };

  const { code, style } = (language && codeConverter(language, layout)) || {
    code: null,
    style: null,
  };

  const viewStyles = editorFunctions.codeSelection.viewStyles;

  const currentCode = viewStyles ? style || "" : JSON.stringify(code, null, 2);

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
        language={viewStyles ? "css" : mappedLanguages[language || "default"]}
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
