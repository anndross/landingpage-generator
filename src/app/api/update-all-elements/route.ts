export async function PUT(req: Request) {
  const body = await req.json();
  console.log("bodyyyyyy", body);

  const res = await fetch("http://localhost:3333/elements/1", {
    method: "PUT",
    body: JSON.stringify({
      items: body,
    }),
  });

  console.log(res);

  return Response.json({ message: "updated!" });
}
