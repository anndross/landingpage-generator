import { Elements } from "./Explorer";
import { Creator } from "./Creator";

export function LateralBar() {
  return (
    <aside className="h-screen p-3 w-80 shadow-sm border-r border-r-gray-200">
      <Creator.Root>
        <Creator.ElementText key="Texto" />
        <Creator.ElementWrapper key="Container" />
      </Creator.Root>

      <Elements />
    </aside>
  );
}
