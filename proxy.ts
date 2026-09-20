import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminSessionCookieName, verifySessionToken } from "@/lib/auth-core";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(adminSessionCookieName())?.value;
  const ok = await verifySessionToken(token);
  if (!ok) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};