import { Element } from "@/types/element";
import { create } from "zustand";

export type Layout = {
  id: string;
  name: string;
  children: Element[];
};

export interface LayoutsContextI {
  layouts: Layout[];
  setLayouts: (layouts: Layout[]) => void;
}

export const useLayouts = create<LayoutsContextI>((set) => ({
  layouts: [],
  setLayouts: (layouts) => set(() => ({ layouts: layouts })),
}));
