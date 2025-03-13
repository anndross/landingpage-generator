"use server";

import { Element } from "@/types/element";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function editAction(
  name: string,
  id: string,
  children: Element[]
) {
  const token = (await cookies()).get("auth_token")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/private/preview/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      children: children,
    }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  revalidateTag("get-layouts");
}
