import { GenericElement } from "../GenericElement";
import { DeleteModal } from "../ModalDelete";
import { ModalEditor } from "./ModalEditor";
import { CiTextAlignLeft } from "react-icons/ci";

export function Text() {
  return <GenericElement name="Texto" icon={CiTextAlignLeft} />;
}
