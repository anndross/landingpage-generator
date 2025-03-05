import { Button } from "@/components/ui/button";
import { AiOutlineClear } from "react-icons/ai";
import { INITIAL_LAYOUT, useEditorStore } from "../../store";

export function Clear() {
  const { setLayout, layout } = useEditorStore();

  return (
    <Button
      onClick={() => {
        setLayout({
          ...INITIAL_LAYOUT,
          name: layout.name,
          id: layout.id,
        });
      }}
      variant="outline"
    >
      <AiOutlineClear />
    </Button>
  );
}
