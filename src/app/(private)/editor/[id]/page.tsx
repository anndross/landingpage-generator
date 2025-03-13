import { Editor as EditorModule } from "@/modules/editor";
import { Header } from "@/components/Header";
import { Params } from "@/types/routeContext";

export default async function Editor(context: { params: Params }) {
  const { id } = await context.params;

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <EditorModule id={id} />
    </div>
  );
}
