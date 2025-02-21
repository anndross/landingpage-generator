import { db } from "@/config/firebase-admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return Response.json("O id é obrigatório", {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = (await db.collection("layouts").doc(id).get()).data();

    if (!data) {
      throw new Error("Layout não encontrado");
    }

    // const snapshot = await getDocs(previewCollection);

    // const elements = snapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));

    return Response.json(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao pegar os elementos:", error);
    return new Response(
      JSON.stringify({
        message: "Erro ao pegar o layout",
        error: (error as { message: string })?.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
