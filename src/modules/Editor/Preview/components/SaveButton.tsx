import { Button } from "@/components/ui/button";
import { updateCurrentPreviewOnDB } from "@/services/editor/functions/save";
import { EditorStore, useEditorStore } from "../../store";
import { useCallback, useTransition } from "react";
import { debounce } from "lodash";

export function SaveButton() {
  const { layout } = useEditorStore();
  const [isPending, startTransition] = useTransition();

  const debouncedUpdate = useCallback(
    (root: EditorStore["layout"]) =>
      debounce(async () => await updateCurrentPreviewOnDB(root), 500)(),
    []
  );

  return (
    <Button
      onClick={() => startTransition(() => debouncedUpdate(layout))}
      variant="outline"
    >
      {isPending ? "Salvando..." : "Salvar"}
    </Button>
  );
}
