"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleCreateLayout = async (formData: FormData) => {
  const token = (await cookies()).get("auth_token")?.value;
  const name = formData.get("name") || "";

  if (!name) throw new Error("O nome é obrigatório");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/private/preview/create`, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  revalidateTag("get-layouts");
};
