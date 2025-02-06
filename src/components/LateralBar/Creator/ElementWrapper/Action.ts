"use server";

import { revalidateTag } from "next/cache";

export async function handleToAdd(form: FormData) {
  const value = form.get("value");
  const tag = form.get("tag");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/elements/create`, {
    method: "POST",
    body: JSON.stringify({
      value: value,
      tag: tag,
      type: "text",
    }),
  });

  revalidateTag("get-elements");
}
