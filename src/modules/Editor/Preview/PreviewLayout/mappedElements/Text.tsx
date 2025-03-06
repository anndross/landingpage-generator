import { TextProps } from "@/types/text";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useEditorStore } from "@/modules/Editor/store";
import DOMPurify from "isomorphic-dompurify";
import { UpdateSettings } from "../hooks";

interface EditableTextProps {
  data: TextProps;
}

export function Text({
  data,
  data: {
    settings: { as: AS, value },
  },
}: EditableTextProps) {
  const layout = useEditorStore((state) => state.layout);

  const [editableContent, setEditableContent] = useState(value || "");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setEditableContent(value || "");
  }, [data]);

  const onContentBlur = useCallback(
    (evt: ChangeEvent<HTMLHeadingElement>) => {
      setIsEditable(false);

      setEditableContent(evt.currentTarget.innerText);

      UpdateSettings(data, { value: evt.currentTarget.innerText });
    },
    [layout]
  );
  const sanitizer = DOMPurify.sanitize;

  const sanitizedContent = sanitizer(editableContent);

  const props = {
    contentEditable: isEditable,
    onBlur: onContentBlur,
    onDoubleClick: () => setIsEditable(true),
    dangerouslySetInnerHTML: { __html: sanitizedContent },
  };

  return <AS {...props} className={`${data.type}-${data.id}`} />;
}
