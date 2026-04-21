import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isPublicFile(pathname: string) {
  return /\.[a-z0-9]+$/i.test(pathname);
}

export function middleware(request: NextRequest) {
  const hostHeader =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const host = hostHeader.toLowerCase().split(":")[0] ?? "";
  const { pathname } = request.nextUrl;

  if (host.startsWith("brand.") && pathname !== "/brand" && !pathname.startsWith("/brand/")) {
    if (pathname.startsWith("/_next") || isPublicFile(pathname)) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/brand" : `/brand${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
