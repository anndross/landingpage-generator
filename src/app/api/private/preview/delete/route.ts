import { messages } from "@/app/api/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";

export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    const { id } = await req.json();

    if (!token) {
      return new Response(messages.no_token, { status: 401 });
    }

    const decodedToken = await firebase.auth().verifyIdToken(token);
    if (decodedToken.exp < Date.now() / 1000) {
      return new Response(messages.exp_token, { status: 401 });
    }

    if (!id || typeof id !== "string") {
      return new Response(messages.missing_payload(["id"]), {
        status: 400,
      });
    }

    const userId = decodedToken.uid;

    await db.collection("layouts").doc(id).delete();

    const data = (await db.collection("users").doc(userId).get()).data();

    await db
      .collection("users")
      .doc(userId)
      .update({
        ...data,
        layouts:
          data?.layouts.filter((layoutId: string) => layoutId !== id) || [],
      });

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
