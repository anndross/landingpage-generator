import { ItemInterface } from "react-sortablejs";

export interface BaseProps extends ItemInterface {
  id: string;
  type: "text" | "image" | "wrapper";
  indexPath: number[]; // Referência ao elemento pai
}
