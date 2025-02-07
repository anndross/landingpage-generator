import { AvailableTags } from "@/types/components/text";
import { ChangeEvent, JSX, useCallback, useContext, useState } from "react";
import { handleToUpdate } from "./Action";
import PreviewContext from "@/components/Preview/context";

type AS = Extract<keyof JSX.IntrinsicElements, AvailableTags>;
interface TextProps {
  value: string;
  as: AS;
  id: string;
}

export function Text({ id, value, as: AS }: TextProps) {
  const { previewElements, setPreviewElements } = useContext(PreviewContext);

  const [editableContent, setEditableContent] = useState(value || "");
  const [isEditable, setIsEditable] = useState(false);

  const onContentBlur = useCallback(
    (evt: ChangeEvent<HTMLHeadingElement>) => {
      setIsEditable(false);

      setEditableContent(evt.currentTarget.innerHTML);

      handleToUpdate({
        value: evt.currentTarget.innerHTML,
        id,
        tag: AS,
      });

      if (previewElements) {
        const newPreviewElements = [...previewElements];

        const indexOfElementOnPreviewData = previewElements?.findIndex(
          (data) => data.id === id
        );
        newPreviewElements[indexOfElementOnPreviewData].value =
          evt.currentTarget.innerHTML;

        setPreviewElements(newPreviewElements);
      }
    },
    [previewElements]
  );

  const props = {
    contentEditable: isEditable,
    onBlur: onContentBlur,
    onDoubleClick: () => setIsEditable(true),
    dangerouslySetInnerHTML: { __html: editableContent },
  };

  return <AS {...props} />;
}
