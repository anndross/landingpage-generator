"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteAction(id: string) {
  const token = (await cookies()).get("auth_token")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/private/preview/delete/${id}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  revalidateTag("get-layouts");
}
