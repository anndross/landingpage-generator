import { AppearanceBackground } from "./AppearanceBackground";
import { AppearanceOpacity } from "./AppearanceOpacity";
import { AppearanceRadius } from "./AppearanceRadius";

export function Appearance() {
  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Aparência</span>
      <div className="flex flex-col gap-2">
        <AppearanceBackground />
        <div className="flex gap-2">
          <AppearanceOpacity />
          <AppearanceRadius />
        </div>
      </div>
    </div>
  );
}
