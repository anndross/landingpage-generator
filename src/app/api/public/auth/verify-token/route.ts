import { firebase } from "@/config/firebase-admin";
import { messages } from "@/helpers/exceptions";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const decodedToken = await firebase.auth().verifyIdToken(token);

    const isValid = decodedToken.exp > Date.now() / 1000;

    if (!isValid) {
      throw new Error("Token expirado");
    }

    return new Response(JSON.stringify({ isValid }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: messages.internal_error }), {
      status: 500,
    });
  }
}
