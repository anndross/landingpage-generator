"use server";

import { revalidateTag } from "next/cache";

export async function handleToUpdate(form: FormData, id: string) {
  const value = form.get("value");
  const tag = form.get("tag");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/elements/update`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      value: value,
      tag: tag,
      type: "text",
    }),
  });

  revalidateTag("get-elements");
}