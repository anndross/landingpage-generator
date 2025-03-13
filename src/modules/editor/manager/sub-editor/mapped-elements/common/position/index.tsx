import { PositionDirection } from "./PositionDirection";
import { PositionHorizontal } from "./PositionHorizontal";
import { PositionVertical } from "./PositionVertical";

export function Position() {
  return (
    <div className="flex flex-col gap-3">
      <PositionDirection />
      <PositionHorizontal />
      <PositionVertical />
    </div>
  );
}
