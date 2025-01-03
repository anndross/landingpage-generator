import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

const elementsCollections = collection(db, "elements");

export async function GET() {
  try {
    const snapshot = await getDocs(elementsCollections);

    const elements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(
      JSON.stringify({
        elements,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao adicionar elemento:", error);
    return new Response(
      JSON.stringify({
        message: "Erro ao adicionar elemento",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
