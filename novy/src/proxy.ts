import { NextResponse, type NextRequest } from "next/server";
import { localeFromPathname, stripLocalePrefix } from "@/i18n/paths";
import { isLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // A production rewrite may pass through Proxy again at the stripped path.
  // Keep the locale forwarded by the first pass for that internal request.
  const forwardedLocale = request.headers.get("x-novyx-locale");
  const urlLocale = localeFromPathname(pathname);
  const locale = urlLocale !== "en" ? urlLocale : isLocale(forwardedLocale) ? forwardedLocale : urlLocale;
  const strippedPath = stripLocalePrefix(pathname);

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const canonical = request.nextUrl.clone();
    canonical.pathname = strippedPath;
    return NextResponse.redirect(canonical, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-novyx-locale", locale);

  if (urlLocale === "en") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (
    strippedPath !== "/" &&
    strippedPath !== "/about" &&
    strippedPath !== "/products" &&
    !strippedPath.startsWith("/products/") &&
    strippedPath !== "/calculator" &&
    strippedPath !== "/contact"
  ) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = strippedPath;
  return NextResponse.rewrite(destination, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/products/:path*",
    "/calculator",
    "/contact",
    "/en/:path*",
    "/de/:path*",
    "/fr/:path*",
  ],
};
