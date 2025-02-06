import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

const previewCollection = collection(db, "preview");

export async function GET() {
  try {
    const snapshot = await getDocs(previewCollection);

    const elements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(elements,
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao pegar os elementos:", error);
    return new Response(
      JSON.stringify({
        message: "Erro ao pegar os elementos",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
