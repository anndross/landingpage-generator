import { ItemInterface } from "react-sortablejs";

export interface BaseProps extends ItemInterface {
  id: string;
  type: "text" | "image" | "container" | "link";
  indexPath: number[]; // Referência a árvore
}
