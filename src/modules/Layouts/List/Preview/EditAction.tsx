"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleUpdateLayout = async (formData: FormData) => {
  const token = (await cookies()).get("auth_token")?.value;

  const name = formData.get("name") || "";
  const children = formData.get("children") || [];
  const id = formData.get("id") || "";

  if (!name) throw new Error("O nome é obrigatório");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/private/preview/update`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      id: id,
      children: JSON.parse(children as string),
    }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  revalidateTag("get-layouts");
};
