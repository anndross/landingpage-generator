import { Explorer } from "./Explorer";

export async function Elements() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const data = await fetch(`${baseUrl}/api/elements/get`, {
    next: {
      tags: ["get-elements"],
    },
  }).then((res) => res.json());

  return <Explorer data={data} />;
}
