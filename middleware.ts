import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

const roleRedirects: Record<string, string> = {
  SUPER_ADMIN: "/dashboard/admin",
  ADMIN: "/dashboard/admin",
  REGISTRAR: "/dashboard/registrar",
  DEPARTMENT_HEAD: "/dashboard/department-head",
  FACULTY: "/dashboard/faculty",
  ADVISOR: "/dashboard/advisor",
  BURSAR: "/dashboard/bursar",
  STUDENT: "/dashboard/student",
};

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return NextResponse.next();

  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Role-based redirect from /dashboard root
  if (req.nextUrl.pathname === "/dashboard") {
    const role = (sessionClaims?.metadata as { role?: string })?.role ?? "STUDENT";
    const redirect = roleRedirects[role] ?? "/dashboard/student";
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
