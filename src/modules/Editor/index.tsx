import { EditorContextI } from "./EditorContext";
import { LateralBar } from "./Manager";
import { Preview } from "./Preview";
import { Layout } from "./Preview/Layout";

export function Editor({
  layout,
}: {
  layout: EditorContextI["previewElements"];
}) {
  return (
    <main className="w-full h-screen flex items-center justify-left">
      <LateralBar />
      <Preview layout={layout}>
        <Layout />
      </Preview>
    </main>
  );
}
