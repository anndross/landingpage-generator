import database from "@/app/tmp_db/database";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body, database);
  database.push(body);
  console.log(body, database);

  return Response.json(body);
}
