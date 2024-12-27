import { ChangeEvent, useCallback, useState } from "react";

interface TextProps {
  content: string;
}

export function Text({ content }: TextProps) {
  const [editableContent, setEditableContent] = useState(content || "");
  const [isEditable, setIsEditable] = useState(false);

  const onContentBlur = useCallback((evt: ChangeEvent<HTMLHeadingElement>) => {
    setIsEditable(false);

    setEditableContent(evt.currentTarget.innerHTML);
  }, []);

  return (
    <h1
      contentEditable={isEditable}
      onBlur={onContentBlur}
      onDoubleClick={() => setIsEditable(true)}
      dangerouslySetInnerHTML={{ __html: editableContent }}
    />
  );
}
