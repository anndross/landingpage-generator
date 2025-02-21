import { cookies } from "next/headers";
import { List } from "./List";
import { Search } from "./Search";

export async function Layouts() {
  const token = (await cookies()).get("auth_token");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/preview/get-all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
    next: { tags: ["get-layouts"] },
  });

  const { layouts } = await response.json();

  return (
    <div>
      <Search data={layouts || []} />
      <List data={layouts || []} />
    </div>
  );
}
