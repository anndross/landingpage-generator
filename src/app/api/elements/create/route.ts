import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";

const elementsCollection = collection(db, "elements");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const docRef = await addDoc(elementsCollection, body);
    console.info("Novo elemento adicionado com ID:", docRef.id);

    return new Response(
      JSON.stringify({
        message: "Elemento adicionado com sucesso!",
        id: docRef.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao adicionar elemento:", error);
    return Response.json(
      JSON.stringify({
        message: "Erro ao adicionar elemento",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
