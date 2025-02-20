import { Layout, LayoutsContextI } from "../../LayoutsContext";

interface PreviewProps {
  layout: Layout;
}

export function Preview({ layout }: PreviewProps) {
  return (
    <a className="w-80 h-56 flex flex-col rounded-lg cursor-pointer bg-white shadow-md border border-zinc-100">
      <img
        className="rounded-t-md w-full h-auto"
        src={layout.screenshot}
        alt=""
      />
      <div className="w-full h-full flex items-center p-2">
        <span>{layout.title}</span>
      </div>
    </a>
  );
}
