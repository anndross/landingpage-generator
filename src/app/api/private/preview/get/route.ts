import { messages } from "@/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    const { uid } = await firebase.auth().verifyIdToken(token || "");

    const userData = (await db.collection("users").doc(uid).get()).data();

    const promises = userData?.layouts.map((id: string) => {
      return db.collection("layouts").doc(id).get();
    });

    const layouts = await Promise.all(promises).then((data) => {
      return data.map((e, idx) => ({
        name: e.data()?.name,
        id: userData?.layouts[idx],
        children: e.data()?.children,
      }));
    });

    return new Response(
      JSON.stringify({
        layouts: layouts,
      }),
      {
        status: 200,
      }
    );
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
