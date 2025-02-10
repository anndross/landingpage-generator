import { db } from "@/config/firebase";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const previewCollection = collection(db, "preview");

export async function POST(req: Request) {
  async function deleteAllDocuments() {
    const querySnapshot = await getDocs(previewCollection);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  try {
    const body = await req.json();

    await deleteAllDocuments();

    const docRef = await addDoc(previewCollection, body);

    console.info("Preview adicionado com ID:", docRef.id);

    return new Response(
      JSON.stringify({
        message: "Preview adicionado com sucesso!",
        id: docRef.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao adicionar o preview:", error);
    return Response.json(
      JSON.stringify({
        message: "Erro ao adicionar o preview",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
