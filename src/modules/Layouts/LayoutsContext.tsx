import { create } from "zustand";

export type Layout = {
  id: string;
  title: string;
  screenshot: string;
};

export interface LayoutsContextI {
  layouts: Layout[];
  setLayouts: (layouts: Layout[]) => void;
}

export const useLayouts = create<LayoutsContextI>((set) => ({
  layouts: [
    {
      id: "1",
      title: "Layout 1",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDBmMYFsXC8jkjbbUI9zzo5qOD7xoKZtQg&s",
    },
    {
      id: "2",
      title: "Layout 2",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDBmMYFsXC8jkjbbUI9zzo5qOD7xoKZtQg&s",
    },
    {
      id: "3",
      title: "Layout 3",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDBmMYFsXC8jkjbbUI9zzo5qOD7xoKZtQg&s",
    },
    {
      id: "4",
      title: "Layout 4",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDBmMYFsXC8jkjbbUI9zzo5qOD7xoKZtQg&s",
    },
    {
      id: "5",
      title: "Layout 5",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDBmMYFsXC8jkjbbUI9zzo5qOD7xoKZtQg&s",
    },
    {
      id: "6",
      title: "Layout 6",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDBmMYFsXC8jkjbbUI9zzo5qOD7xoKZtQg&s",
    },
    {
      id: "7",
      title: "Layout 7",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDBmMYFsXC8jkjbbUI9zzo5qOD7xoKZtQg&s",
    },
  ],
  setLayouts: (layouts) => set(() => ({ layouts: layouts })),
}));
