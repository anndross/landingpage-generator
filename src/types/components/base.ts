import { ItemInterface } from "react-sortablejs";

export interface BaseProps extends ItemInterface {
  id: string;
  type: "text" | "image" | "container";
  indexPath: number[]; // Referência a árvore
}
