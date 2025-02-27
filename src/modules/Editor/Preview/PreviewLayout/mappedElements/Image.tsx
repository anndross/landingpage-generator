"use client";
import { useEditor } from "@/modules/Editor/context";
import { ImageProps } from "@/types/image";

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
        width={data.style.width}
        height={data.style.height}
        style={{ ...data.style }}
      />
    </a>
  );
};
