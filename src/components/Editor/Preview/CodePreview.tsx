'use client';
import { Highlight, themes } from "prism-react-renderer";
import { useContext, useEffect, useState } from "react";
import CodeContext from "./context";

export function CodePreview() {
    const { code } = useContext(CodeContext)
    const codeString = JSON.stringify(code, null, 2)

    const [formattedCode, setFormattedCode] = useState<string>(codeString)

    useEffect(() => {
        setFormattedCode(codeString)
    }, [codeString])

    return (
        <Highlight code={formattedCode} language="json" theme={themes.github}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{...style, width: '100%', height: '100%' }}>
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