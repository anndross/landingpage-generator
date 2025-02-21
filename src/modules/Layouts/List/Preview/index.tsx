import Link from "next/link";
import { Layout } from "../../LayoutsContext";

interface PreviewProps {
  layout: Layout;
}

export function Preview({ layout }: PreviewProps) {
  console.log("layout", layout);
  return (
    <Link
      href={`/editor/${layout.id}`}
      className="w-80 h-56 flex flex-col rounded-lg cursor-pointer bg-white shadow-md border border-zinc-100"
    >
      <div className="w-full h-full flex items-center p-2">
        <span>{layout.name}</span>
      </div>
    </Link>
  );
}
