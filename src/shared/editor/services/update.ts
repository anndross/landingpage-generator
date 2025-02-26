"use server";

import { Preview } from "@/types/preview";
import { cookies } from "next/headers";

export async function updateCurrentPreviewOnDB(preview: Preview) {
  const token = (await cookies()).get("auth_token")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/private/preview/update/${preview?.id}`, {
    method: "PUT",
    body: JSON.stringify({
      style: preview?.style,
      children: preview?.children,
      name: preview?.name,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
