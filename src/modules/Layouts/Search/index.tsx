"use client";

import { Input } from "@/components/ui/input";
import { Layout, useLayouts } from "../LayoutsContext";
import { useEffect, useRef } from "react";

interface SearchProps {
  data: Layout[];
}

export function Search({ data }: SearchProps) {
  const { layouts, setLayouts } = useLayouts();

  useEffect(() => {
    setLayouts(data);
  }, [data]);

  return (
    <Input
      onChange={(evt) => {
        if (evt.target.value === "") {
          return setLayouts(data);
        }

        const newData = layouts.filter((layout) => {
          return layout.name
            .toLowerCase()
            .includes(evt.target?.value.toLowerCase());
        });

        setLayouts(newData);
      }}
      className="h-full"
      placeholder="Pesquise seus layouts..."
    />
  );
}
