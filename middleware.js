import { NextResponse } from "next/server";

export function middleware(request) {
  const authCookie = request.cookies.get("auth_user");
  const { pathname } = request.nextUrl;

  // 🔒 Protect checkout route
  if (pathname.startsWith("/checkout")) {
    if (!authCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout"],
};
