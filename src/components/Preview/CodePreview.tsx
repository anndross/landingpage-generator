interface CodePreviewProps {
    code: any
}

export function CodePreview({code}: CodePreviewProps) {

    return (
        <pre className="w-full h-full bg-slate-900 text-orange-600 rounded-lg">
            {code && JSON.stringify(code)}
        </pre>
    )
}