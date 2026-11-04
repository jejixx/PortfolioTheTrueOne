import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, isValidSession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login" || pathname.startsWith("/login/")) {
    return NextResponse.next();
  }

  const authenticated = await isValidSession(
    request.cookies.get(AUTH_COOKIE)?.value,
  );

  if (authenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
