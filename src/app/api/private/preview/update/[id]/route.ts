import { messages } from "@/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";
import { Params } from "@/types/routeContext";

export async function PUT(req: Request, context: { params: Params }) {
  try {
    const { id } = await context.params;

    const { children, name, style } = await req.json();

    if (
      (!children || !Array.isArray(children)) &&
      (!name || typeof name !== "string") &&
      (!id || typeof id !== "string")
    ) {
      return new Response(
        messages.missing_payload(["children", "name", "id"]),
        {
          status: 400,
        }
      );
    }

    console.log("PUT - id: ", id);
    await db
      .collection("layouts")
      .doc(id)
      .update({ children: children, name: name, style: style, type: "layout" });

    return new Response(messages.success, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: messages.internal_error,
        error: error,
      }),
      {
        status: 500,
      }
    );
  }
}
