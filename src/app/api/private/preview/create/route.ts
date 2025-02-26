import { messages } from "@/helpers/exceptions";
import { db, firebase } from "@/config/firebase-admin";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    const { uid } = await firebase.auth().verifyIdToken(token || "");

    // Cria o novo layout
    const createdElement = await db
      .collection("layouts")
      .add({ name, children: [], ownerId: uid, type: "layout" });

    // Pega os dados do usuário
    const userData = (await db.collection("users").doc(uid).get()).data();

    // Atualiza o array de layouts do usuário com o id do novo layout
    await db
      .collection("users")
      .doc(uid)
      .update({ layouts: [...(userData?.layouts || []), createdElement.id] });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: messages.internal_error, error }),
      { status: 500 }
    );
  }
}
