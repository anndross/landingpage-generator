import { TextProps } from "@/types/components/text";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useEditor } from "@/modules/Editor/EditorContext";

interface EditableTextProps {
  data: TextProps;
}

export function Text({
  data,
  data: {
    settings: { as: AS, value },
  },
}: EditableTextProps) {
  const {
    previewElements,
    useEditElement,
    preview: { canEdit },
  } = useEditor();

  const [editableContent, setEditableContent] = useState(value || "");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setEditableContent(value || "");
  }, [data]);

  const onContentBlur = useCallback(
    (evt: ChangeEvent<HTMLHeadingElement>) => {
      setIsEditable(false);

      setEditableContent(evt.currentTarget.innerHTML);

      useEditElement({
        ...data,
        settings: { ...data.settings, value: evt.currentTarget.innerHTML },
      });
    },
    [previewElements]
  );

  const props = {
    contentEditable: isEditable,
    onBlur: onContentBlur,
    onDoubleClick: () => setIsEditable(true),
    dangerouslySetInnerHTML: { __html: editableContent },
  };

  return (
    <AS
      {...props}
      style={{ ...data.style }}
      {...(AS === "a" && !canEdit
        ? ({ href: data?.settings?.link || "" } as any)
        : {})}
    />
  );
}
