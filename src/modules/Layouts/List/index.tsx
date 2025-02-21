import { PreviewElement } from "@/modules/Editor/EditorContext";
import { Preview } from "./Preview";

interface ListProps {
  data: PreviewElement[];
}

export function List({ data }: ListProps) {
  console.log("data", data);

  return (
    <div className="p-16 w-full h-full grid grid-cols-4 gap-10 justify-items-center">
      {data?.map((layout: any) => {
        return <Preview key={layout.id} layout={layout} />;
      })}
    </div>
  );
}
