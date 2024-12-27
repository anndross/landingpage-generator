"use server";

import { revalidateTag } from "next/cache";
import { PreviewElements } from "../context";

export async function ElementsPreviewAction(state: PreviewElements[]) {
  const propsToRemove = ["chosen", "selected", "id"];

  const cleanedData = state.map((item) =>
    Object.fromEntries(
      Object.entries(item).filter(([key]) => !propsToRemove.includes(key))
    )
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  await fetch(`${baseUrl}/api/update-all-elements`, {
    method: "PUT",
    body: JSON.stringify(cleanedData),
  }).then(async (res) => console.log(res));

  revalidateTag("get-elements");
}
