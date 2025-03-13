"use client";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "../../store";

export function StyleButton() {
  const { editorFunctions, setEditorFunctions } = useEditorStore();
  return (
    <Button
      onClick={() => {
        setEditorFunctions({
          codeSelection: {
            ...editorFunctions.codeSelection,
            viewStyles: true,
          },
        });
      }}
      variant="outline"
    >
      CSS
    </Button>
  );
}
