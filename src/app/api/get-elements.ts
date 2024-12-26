import { database } from "../tmp_db/database";

export async function GET() {
  return Response.json(database);
}
