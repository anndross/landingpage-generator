import { Editor as EditorModule } from "@/modules/Editor";
import { Header } from "@/components/Header";
import { Params } from "@/types/routeContext";

export default async function Editor(context: { params: Params }) {
  const { id } = await context.params;

  return (
    <div className="w-full max-h-screen h-screen">
      <Header />
      <EditorModule id={id} />
    </div>
  );
}
