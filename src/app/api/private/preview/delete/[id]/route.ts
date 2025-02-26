import { messages } from "@/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";
import { Params } from "@/types/routeContext";

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    const { id } = await context.params;

    const { uid, email } = await firebase.auth().verifyIdToken(token || "");

    if (!id || typeof id !== "string") {
      return new Response(messages.missing_payload(["id"]), {
        status: 400,
      });
    }

    const layoutDocRef = db.collection("layouts").doc(id);

    const layoutData = (await layoutDocRef.get()).data();

    if (layoutData?.ownerId !== uid) {
      throw new Error(
        `O layout: ${layoutData?.name} não pertence ao usuário: ${email}`
      );
    }

    await layoutDocRef.delete();

    const userDocRef = db.collection("users").doc(uid);
    const data = (await userDocRef.get()).data();

    await userDocRef.update({
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
