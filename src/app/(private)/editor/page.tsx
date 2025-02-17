import { Editor as EditorModule } from "@/modules/Editor";
import { Header } from "@/components/Header";

export default async function Editor() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <EditorModule />
    </div>
  );
}
