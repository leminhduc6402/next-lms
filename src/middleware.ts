import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const user = req.auth?.user;
  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  if (user && user.role !== "ADMIN" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|verify|$).*)",
  ],
};
