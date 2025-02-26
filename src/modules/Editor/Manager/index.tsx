import { Elements } from "./Elements";
import { SubEditor } from "./SubEditor";
import { Tree } from "./Tree";

export function Manager() {
  return (
    <aside className="h-full p-3 w-64 shadow-sm border-r border-r-gray-200">
      <Elements />
      <SubEditor />
      <Tree />
    </aside>
  );
}
