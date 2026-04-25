import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

// Define protected routes
const protectedRoutes = ["/checkout", "/profile"];
const adminRoutes = ["/admin"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect to login if not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to home if not admin
  if (isAdminRoute && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Redirect to home if already logged in and trying to access auth pages
  if (
    (path.startsWith("/login") || path.startsWith("/signup")) &&
    session?.userId
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
