import { EditorProvider } from "./EditorContext";
import { LateralBar } from "./LateralBar";
import { Preview } from "./Preview";
import { Layout } from "./Preview/Layout";

export function Editor() {
  return (
    <EditorProvider>
      <main className="w-full h-screen flex items-center justify-left">
        <LateralBar />
        <Preview>
          <Layout />
        </Preview>
      </main>
    </EditorProvider>
  );
}
