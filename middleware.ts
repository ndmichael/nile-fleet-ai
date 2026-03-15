import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Middleware keeps the auth session fresh and lets us
 * protect dashboard routes before the page loads.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  const isDashboardPage =
    pathname.startsWith("/staff") ||
    pathname.startsWith("/approver") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/driver");

  // If a user is not logged in, block dashboard access.
  if (!user && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If a user is logged in, don't let them sit on the login page.
  // We will improve this later to redirect by actual role.
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/staff/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/staff/:path*",
    "/approver/:path*",
    "/admin/:path*",
    "/driver/:path*",
  ],
};