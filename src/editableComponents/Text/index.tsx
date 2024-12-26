import { ChangeEvent, useCallback, useState } from "react";

interface TextProps {
  value: string;
}

export function Text({ value }: TextProps) {
  const [content, setContent] = useState(value || "");
  const [isEditable, setIsEditable] = useState(false);

  const onContentBlur = useCallback((evt: ChangeEvent<HTMLHeadingElement>) => {
    setIsEditable(false);

    setContent(evt.currentTarget.innerHTML);
  }, []);

  return (
    <h1
      contentEditable={isEditable}
      onBlur={onContentBlur}
      onDoubleClick={() => setIsEditable(true)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
