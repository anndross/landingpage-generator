import { messages } from "@/helpers/exceptions";
import { db, firebase } from "@/configs/firebase-admin";
import { Params } from "@/types/routeContext";

export async function GET(req: Request, context: { params: Params }) {
  try {
    const { id } = await context.params;

    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
      return Response.json(messages.no_token, {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!id) {
      return Response.json(messages.missing_parameters(["id"]), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = (await db.collection("layouts").doc(id).get()).data();

    if (!data) {
      throw new Error("Layout não encontrado");
    }

    return Response.json(
      { data },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: messages.internal_error,
        error: (error as { message: string })?.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
