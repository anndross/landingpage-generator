export async function GET() {
  const [{ items }] = await fetch("http://localhost:3333/elements/").then(
    (res) => res.json()
  );
  console.log("items:::", "items");
  return Response.json(items);
}
