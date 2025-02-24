import { messages } from "@/app/api/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    const { children, name, id } = await req.json();

    if (!token) {
      return new Response(messages.no_token, { status: 401 });
    }

    const decodedToken = await firebase.auth().verifyIdToken(token);

    if (decodedToken.exp < Date.now() / 1000) {
      return new Response(messages.exp_token, { status: 401 });
    }

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
      .update({ children: children, name: name });

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
