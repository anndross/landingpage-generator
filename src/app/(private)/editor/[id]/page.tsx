import { Editor as EditorModule } from "@/modules/Editor";
import { Header } from "@/components/Header";
import { cookies } from "next/headers";

export default async function Editor({ params }: { params: { id: string } }) {
  const token = (await cookies()).get("auth_token")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/preview/get?id=${params?.id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      accept: "application/json",
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

    console.log("layout12312", layout);
    return (
      <div className="w-full min-h-screen">
        <Header />
        <EditorModule layout={layout?.data} />
      </div>
    );
  }
}
