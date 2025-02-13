"use server";

import { AvailableTags } from "@/types/components/text";
import { revalidateTag } from "next/cache";

interface HandleToUpdateProps {
  tag: AvailableTags;
  value: string;
  id: string;
}

export async function handleToUpdate(data: HandleToUpdateProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${baseUrl}/api/elements/update`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      type: "text",
    }),
  });

  revalidateTag("get-elements");
}
