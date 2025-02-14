import { Highlight, themes } from "prism-react-renderer";
import { codeConverter } from "./services/codeConverter";
import { useEditor } from "../../EditorContext";

export function PreviewCode() {
  const { preview, previewElements } = useEditor();

  const previewType = preview.type === "code" && preview.option;

  const mappedLanguages = {
    default: "json",
    "VTEX IO": "json",
  };

  const code = codeConverter(previewType, previewElements.children);

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
