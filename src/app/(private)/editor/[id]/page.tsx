import { Editor as EditorModule } from "@/modules/Editor";
import { Header } from "@/components/Header";
import { cookies } from "next/headers";

export default async function Editor({ params }: { params: { id: string } }) {
  const { id } = await params;

  const token = (await cookies()).get("auth_token")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/private/preview/get?id=${id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  if (!response.ok) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="uppercase text-xl m-auto">layout não encontrado!</h1>
      </div>
    );
  } else {
    const layout = await response.json();

    console.log("layouttt", {
      children: layout?.data?.children,
      name: layout?.data?.name,
      id: id,
    });

    return (
      <div className="w-full max-h-screen h-screen overflow-hidden">
        <Header />
        <EditorModule
          layout={{
            children: layout?.data?.children,
            name: layout?.data?.name,
            id: id,
          }}
        />
      </div>
    );
  }
}
