import { Elements } from "./Elements";
import { CreateSection } from "./Creator";

export function LateralBar() {
  return (
    <aside className="h-screen p-3 w-80 shadow-sm border-r border-r-gray-200">
      <CreateSection />
      <Elements />
    </aside>
  );
}
