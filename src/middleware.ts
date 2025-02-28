import { NextRequest, NextResponse } from "next/server";

async function checkToken(token: string) {
  return !!token.length;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  //   const tokenResponse = await fetch(
  //     `${baseUrl}/api/public/auth/verify-token`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token }),
  //     }
  //   );

  //   const { isValid } = await tokenResponse.json();

  //   return isValid;
  // } catch {
  //   return false;
  // }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("auth_token")?.value;

  if (
    url.pathname.startsWith("/editor") ||
    url.pathname.startsWith("/layouts")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const isValid = await checkToken(token);

    if (!isValid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  if (url.pathname.startsWith("/api/private")) {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ message: "Não autorizado!" }, { status: 401 });
    }

    const isValid = await checkToken(token);

    if (!isValid) {
      return NextResponse.json({ message: "Token inválido!" }, { status: 403 });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/private/:path*",
    "/layouts",
    "/editor",
    "/((?!_next|favicon.ico).*)",
  ],
};
