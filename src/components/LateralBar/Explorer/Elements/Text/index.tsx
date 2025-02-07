import { DeleteModal } from "../ModalDelete";
import { ModalEditor } from "./ModalEditor";

export interface TextProps {
  value: string | undefined;
  id: string;
  tag: string | undefined;
}

export function Text({ value, id, tag }: TextProps) {
  return (
    <div
      title={value}
      className="flex select-none justify-between items-center w-full p-1 px-2 gap-1 border shadow-sm rounded-lg"
      key={id}
      id={id}
    >
      <span className="truncate w-full cursor-grab">{value}</span>
      <DeleteModal id={id} />
      <ModalEditor id={id} value={value} tag={tag} />
    </div>
  );
}
