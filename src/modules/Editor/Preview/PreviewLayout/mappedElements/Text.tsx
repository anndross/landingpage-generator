import { TextProps } from "@/types/text";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useEditor } from "@/modules/Editor/context";
import DOMPurify from "isomorphic-dompurify";

interface EditableTextProps {
  data: TextProps;
}

export function Text({
  data,
  data: {
    settings: { as: AS, value },
  },
}: EditableTextProps) {
  const { layout, setLayout } = useEditor();

  console.log("teste sanitizedContent");

  const [editableContent, setEditableContent] = useState(value || "");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setEditableContent(value || "");
  }, [data]);

  const onContentBlur = useCallback(
    (evt: ChangeEvent<HTMLHeadingElement>) => {
      setIsEditable(false);

      setEditableContent(evt.currentTarget.innerText);

      setLayout({
        ...data,
        settings: { ...data.settings, value: evt.currentTarget.innerText },
      });
    },
    [layout]
  );
  const sanitizer = DOMPurify.sanitize;

  const sanitizedContent = sanitizer(editableContent);
  console.log("teste", { sanitizedContent });

  const props = {
    contentEditable: isEditable,
    onBlur: onContentBlur,
    onDoubleClick: () => setIsEditable(true),
    dangerouslySetInnerHTML: { __html: sanitizedContent },
  };

  return <AS {...props} style={{ ...data.style }} />;
}
