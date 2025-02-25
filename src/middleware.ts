import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  const url = request.nextUrl.clone().pathname;

  if (!token && url !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && url === "/login") {
    return NextResponse.redirect(new URL("/layouts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/editor/:path*", "/login", "/layouts"],
};
