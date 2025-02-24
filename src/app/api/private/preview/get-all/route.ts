import { messages } from "@/app/api/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
      return new Response(messages.no_token, { status: 401 });
    }

    const decodedToken = await firebase.auth().verifyIdToken(token);

    if (decodedToken.exp < Date.now() / 1000) {
      return new Response(messages.exp_token, { status: 401 });
    }

    const userData = (
      await db.collection("users").doc(decodedToken.uid).get()
    ).data();

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
