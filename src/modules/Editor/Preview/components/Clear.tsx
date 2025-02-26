import { Button } from "@/components/ui/button";
import { AiOutlineClear } from "react-icons/ai";
import { useEditor } from "../../context";
import layoutInitialConfig from "@/shared/editor/data/layout.json";
import { Preview } from "@/types/preview";

export function Clear() {
  const { setPreviewElements } = useEditor();

  return (
    <Button
      onClick={() => setPreviewElements(layoutInitialConfig as Preview)}
      variant="outline"
    >
      <AiOutlineClear />
    </Button>
  );
}
