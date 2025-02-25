"use client";
import { Button } from "@/components/ui/button";
import { useEditor } from "../../context";

export function StyleButton() {
  const { setPreview } = useEditor();
  return (
    <Button
      onClick={() => {
        setPreview({
          style: true,
        });
      }}
      variant="outline"
    >
      CSS
    </Button>
  );
}
