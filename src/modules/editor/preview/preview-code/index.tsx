import { Highlight, themes } from "prism-react-renderer";
import { useEditorStore } from "../../store";
import { Button } from "@/components/ui/button";
import { BsCopy } from "react-icons/bs";
import { Converter } from "@/modules/editor/services/converter";

export function PreviewCode() {
  const { editorFunctions, layout } = useEditorStore();

  const language = editorFunctions.codeSelection.language;

  const mappedLanguages = {
    default: "json",
    "VTEX IO": "json",
    CSS: "css",
  };

  const converter = new Converter(layout);

  const mappedCode = {
    "VTEX IO": {
      css: converter.getVtexIoStyles(),
      page: converter.vtexIoPage(),
    },
  };

  const viewStyles = editorFunctions.codeSelection.viewStyles;

  const currentCode = viewStyles
    ? mappedCode[language]?.css
    : mappedCode[language]?.page;

  return (
    <div className="relative">
      <Button
        onClick={() => navigator.clipboard.writeText("")}
        variant="outline"
        className="absolute top-0 right-0"
      >
        <BsCopy />
      </Button>

      <Highlight
        code={currentCode || ""}
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
