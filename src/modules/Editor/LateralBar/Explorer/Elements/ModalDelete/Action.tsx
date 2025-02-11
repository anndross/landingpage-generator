"use server";

import { revalidateTag } from "next/cache";

export async function handleToDelete(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/elements/delete`, {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });

  const previewData = await fetch(`${baseUrl}/api/preview/get`, {
    method: "GET",
  }).then((res) => res.json());

  if (previewData?.[0]?.items.length) {
    const previewItems: { id: string }[] = previewData[0].items;

    const indexToDelete = previewItems.findIndex((data) => data.id === id);

    const newPreviewElements = previewItems.filter(
      (_, i) => i !== indexToDelete
    );

    await fetch(`${baseUrl}/api/preview/create`, {
      method: "POST",
      body: JSON.stringify({
        items: newPreviewElements,
      }),
    });

    revalidateTag("get-preview");
  }

  revalidateTag("get-elements");
}
