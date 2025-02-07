"use server";
import { Preview } from "./Preview";

export async function LayoutPreview() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const data = await fetch(`${baseUrl}/api/preview/get`, {
    next: {
      tags: ["get-preview"],
    },
  }).then((res) => res.json());

  return <Preview data={data[0]?.items || []} />;
}
