"use server";
import { EditorType } from "@/modules/Editor/context";
import { cookies } from "next/headers";

export async function updateCurrentPreviewOnDB(layout: EditorType["layout"]) {
  const token = (await cookies()).get("auth_token")?.value;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!layout.id) return;

  try {
    await fetch(`${baseUrl}/api/private/preview/update/${layout.id}`, {
      method: "PUT",
      body: JSON.stringify({
        style: layout.style,
        children: layout.children,
        name: layout.name,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar preview:", error);
  }
}
