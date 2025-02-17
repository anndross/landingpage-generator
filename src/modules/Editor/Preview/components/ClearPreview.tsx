import { Button } from "@/components/ui/button";
import { AiOutlineClear } from "react-icons/ai";
import { useEditor } from "../../EditorContext";

export function ClearPreview() {
  const { setPreviewElements } = useEditor();

  return (
    <Button
      onClick={() => setPreviewElements({ children: [] })}
      variant="outline"
    >
      <AiOutlineClear />
    </Button>
  );
}
