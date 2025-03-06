"use client";
import { ImageProps } from "@/types/image";
import { GetSettingsProperty, GetStyleProperty, GetStyles } from "../hooks";

interface EditableImageProps {
  data: ImageProps;
}

export const Image = ({ data }: EditableImageProps) => {
  return (
    <a href="#">
      <img
        className={`${data.type}-${data.id}`}
        src={GetSettingsProperty(data, "src")}
        alt={GetSettingsProperty(data, "alt")}
        title={GetSettingsProperty(data, "title")}
        width={GetSettingsProperty(data, "width")}
        height={GetSettingsProperty(data, "height")}
        // style={{ ...GetStyles(data) }}
      />
    </a>
  );
};
