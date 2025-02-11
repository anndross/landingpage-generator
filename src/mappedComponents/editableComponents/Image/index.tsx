import { ImageProps } from "@/modules/Editor/Preview/context";

export const Image = ({}: ImageProps) => {
  return (
    <section
      className="w-full h-72 bg-zinc-700"
      onDrop={(event) => {}}
      onDragOver={(event) => event.preventDefault()}
    ></section>
  );
};
