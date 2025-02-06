import { db } from "@/config/firebase"; // Importe o arquivo de configuração
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(req: Request) {
  const body = await req.json();

  try {
    const docRef = doc(db, "elements", body.id);

    const data = {
      value: body.value,
      tag: body.tag,
    };

    await updateDoc(docRef, data);

    return Response.json(
      JSON.stringify({
        message: "Elemento atualizado com sucesso!",
        id: docRef.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
    return Response.json(
      JSON.stringify({
        message: "Erro ao adicionar elemento",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
