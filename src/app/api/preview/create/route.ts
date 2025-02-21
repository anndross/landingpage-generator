import { db, firebase } from "@/config/firebase-admin";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
      return new Response("Não autorizado", { status: 401 });
    }

    const decodedToken = await firebase.auth().verifyIdToken(token);

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
      JSON.stringify({ message: "Erro ao criar o preview", error }),
      { status: 500 }
    );
  }
}

// import { db } from "@/config/firebase";
// import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

// const previewCollection = collection(db, "preview");

// export async function POST(req: Request) {
//   async function deleteAllDocuments() {
//     const querySnapshot = await getDocs(previewCollection);
//     querySnapshot.forEach(async (doc) => {
//       await deleteDoc(doc.ref);
//     });
//   }

//   try {
//     const body = await req.json();

//     await deleteAllDocuments();

//     const docRef = await addDoc(previewCollection, body);

//     console.info("Preview adicionado com ID:", docRef.id);

//     return new Response(
//       JSON.stringify({
//         message: "Preview adicionado com sucesso!",
//         id: docRef.id,
//       }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Erro ao adicionar o preview:", error);
//     return Response.json(
//       JSON.stringify({
//         message: "Erro ao adicionar o preview",
//         error: error,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
