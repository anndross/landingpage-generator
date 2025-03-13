"use client";

import { SpacingGap } from "./SpacingGap";
import { SpacingMargin } from "./SpacingMargin";
import { SpacingPadding } from "./SpacingPadding";

export function Spacing() {
  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Espaçamento</span>
      <div className="w-full flex flex-col gap-2">
        <SpacingGap />

        <div className="w-full flex gap-2">
          <SpacingMargin />
          <SpacingPadding />
        </div>
      </div>
    </div>
  );
}
