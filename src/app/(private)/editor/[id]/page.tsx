import { Editor as EditorModule } from "@/modules/Editor";
import { Header } from "@/components/Header";
import { cookies } from "next/headers";

export default async function Editor({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="w-full max-h-screen h-screen">
      <Header />
      <EditorModule id={id} />
    </div>
  );
}
