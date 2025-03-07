import { ItemInterface } from "react-sortablejs";

export interface BaseProps extends ItemInterface {
  id: string;
  type: "text" | "image" | "container" | "link";
  index: string[] | []; // Referência a árvore
}
