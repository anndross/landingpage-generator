import { db } from "@/config/firebase";
import { deleteDoc, doc } from "firebase/firestore"

export async function DELETE(req: Request) {
    try {
        const body = await req.json()

        const id = body.id

        await deleteDoc(doc(db, "elements", id));

        return Response.json(
            JSON.stringify({
              message: `Elemento: ${id} deletado com sucesso`,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return Response.json(
            JSON.stringify({
              message: "Erro ao deletar o elemento",
              error: error,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}