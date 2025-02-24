"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleDeleteLayout = async (formData: FormData) => {
  const token = (await cookies()).get("auth_token")?.value;

  const id = formData.get("id") || "";
  const name = formData.get("name") || "";
  const realName = formData.get("real-name") || "";

  if (realName !== name) throw new Error("O nome não coincide com o original.");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/private/preview/delete`, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

  revalidateTag("get-layouts");
};
