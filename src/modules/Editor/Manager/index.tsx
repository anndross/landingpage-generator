import { Elements } from "./Elements";
import { SubEditor } from "./SubEditor";

export function LateralBar() {
  return (
    <aside className="h-screen p-3 w-64 shadow-sm border-r border-r-gray-200">
      <Elements />
      <SubEditor />
    </aside>
  );
}
