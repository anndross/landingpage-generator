import { create } from "zustand";
import { PreviewElement } from "../Editor/context";

export type Layout = {
  id: string;
  name: string;
  children: PreviewElement[];
};

export interface LayoutsContextI {
  layouts: Layout[];
  setLayouts: (layouts: Layout[]) => void;
}

export const useLayouts = create<LayoutsContextI>((set) => ({
  layouts: [],
  setLayouts: (layouts) => set(() => ({ layouts: layouts })),
}));
