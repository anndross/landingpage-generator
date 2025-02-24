import { messages } from "@/app/api/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
      return new Response(messages.no_token, { status: 401 });
    }

    const decodedToken = await firebase.auth().verifyIdToken(token);

    if (decodedToken.exp < Date.now() / 1000) {
      return new Response(messages.exp_token, { status: 401 });
    }

    const userId = decodedToken.uid;

    // Cria o novo layout
    const createdElement = await db
      .collection("layouts")
      .add({ name, children: [] });

    // Pega os dados do usuário
    const userData = (
      await db.collection("users").doc(decodedToken.uid).get()
    ).data();

    // Atualiza o array de layouts do usuário com o id do novo layout
    await db
      .collection("users")
      .doc(userId)
      .update({ layouts: [...(userData?.layouts || []), createdElement.id] });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: messages.internal_error, error }),
      { status: 500 }
    );
  }
}
