import { EditorContextI, PreviewElement } from "./EditorContext";
import { LateralBar } from "./Manager";
import { Preview } from "./Preview";
import { Layout } from "./Preview/Layout";

interface EditorProps {
  layout: {
    children: PreviewElement[];
    name: string;
    id: string;
  };
}
export function Editor({ layout }: EditorProps) {
  console.log("Editorr", layout);
  return (
    <main className="w-full h-full flex items-center justify-left">
      <LateralBar />
      <Preview layout={layout} />
    </main>
  );
}
