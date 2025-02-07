import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

const elementsCollection = collection(db, "elements");

export async function GET() {
  try {
    const snapshot = await getDocs(elementsCollection);

    const elements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(elements, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
