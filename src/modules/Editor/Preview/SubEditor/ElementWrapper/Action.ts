"use server";

import { revalidateTag } from "next/cache";

export async function handleToAdd(form: FormData) {
  const dir = form.get("direction");
  const vertical = form.get("vertical");
  const horizontal = form.get("horizontal");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/elements/create`, {
    method: "POST",
    body: JSON.stringify({
      vertical,
      dir,
      horizontal,
      type: "wrapper",
    }),
  });

  revalidateTag("get-elements");
}
