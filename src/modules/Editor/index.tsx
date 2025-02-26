import { cookies } from "next/headers";
import { Manager } from "./Manager";
import { Preview, PreviewProps } from "./Preview";
import { EditableElement } from "./context";

interface EditorProps {
  id: string;
}

export async function Editor({ id }: EditorProps) {
  const token = (await cookies()).get("auth_token")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/private/preview/get/${id}`, {
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

    if (!layout?.data) {
      return <div>Carregando layout...</div>;
    }

    return (
      <main className="w-full h-full flex items-center justify-left">
        <Manager />
        <Preview
          layout={
            {
              ...layout.data,
              id: id,
            } as PreviewProps["layout"]
          }
        />
      </main>
    );
  }
}
