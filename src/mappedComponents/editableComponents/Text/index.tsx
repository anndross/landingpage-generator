import { AvailableTags } from "@/types/components/text";
import { ChangeEvent, JSX, useCallback, useState } from "react";

type AS = Extract<keyof JSX.IntrinsicElements, AvailableTags>;
interface TextProps {
  value: string;
  as: AS;
}

export function Text({ value, as: AS }: TextProps) {
  const [editableContent, setEditableContent] = useState(value || "");
  const [isEditable, setIsEditable] = useState(false);

  const onContentBlur = useCallback((evt: ChangeEvent<HTMLHeadingElement>) => {
    setIsEditable(false);

    setEditableContent(evt.currentTarget.innerHTML);
  }, []);

  const props = {
    contentEditable: isEditable,
    onBlur: onContentBlur,
    onDoubleClick: () => setIsEditable(true),
    dangerouslySetInnerHTML: { __html: editableContent },
  };

  return <AS {...props} />;
}
