import { Button } from "@/components/ui/button";
import { AiOutlineClear } from "react-icons/ai";
import { INITIAL_LAYOUT, useEditor } from "../../context";

export function Clear() {
  const { setLayout, layout } = useEditor();

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
