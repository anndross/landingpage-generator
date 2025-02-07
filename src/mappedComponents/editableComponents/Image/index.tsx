import { ImageElementI } from "@/components/Preview/context";

export const Image = ({}: ImageElementI) => {
  return (
    <section
      className="w-full h-72 bg-zinc-700"
      onDrop={(event) => console.log("onDropEvent: ", event)}
      onDragOver={(event) => event.preventDefault()}
    ></section>
  );
};
