"use client";
import { useEditor } from "@/modules/Editor/EditorContext";
import { ImageProps } from "@/types/components/image";

interface EditableImageProps {
  data: ImageProps;
}

export const Image = ({ data }: EditableImageProps) => {
  return (
    <a href="#">
      <img
        src={data.settings.src}
        alt={data.settings.alt}
        title={data.settings.title}
        width={data.settings.width}
        height={data.settings.height}
      />
    </a>
  );
};
