import { create } from "zustand";

export type Layout = {
  id: string;
  name: string;
};

export interface LayoutsContextI {
  layouts: Layout[];
  setLayouts: (layouts: Layout[]) => void;
}

export const useLayouts = create<LayoutsContextI>((set) => ({
  layouts: [],
  setLayouts: (layouts) => set(() => ({ layouts: layouts })),
}));
