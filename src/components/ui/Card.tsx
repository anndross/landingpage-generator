import { ElementType } from "react";

interface CardProps {
  name: string;
  icon: ElementType;
}

export function Card({ name, icon: Icon }: CardProps) {
  return (
    <div className="cursor-grab max-w-40 flex aspect-square select-none justify-center flex-col items-center w-full p-1 px-2 gap-1 border shadow-sm rounded-lg">
      <span className="text-zinc-600 cursor-grab text-sm uppercase font-medium">
        {name}
      </span>
      <Icon size={54} className="text-zinc-600" />
    </div>
  );
}
