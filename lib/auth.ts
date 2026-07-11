import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types";

/**
 * Get the current user's role from Clerk publicMetadata.
 * Use in Server Components and Server Actions.
 */
export async function getRole(): Promise<UserRole> {
  const { sessionClaims } = await auth();
  return ((sessionClaims?.metadata as { role?: string })?.role as UserRole) ?? "STUDENT";
}

/**
 * Require a specific role in a Server Component.
 * Redirects to /dashboard if unauthorized.
 */
export async function requireRole(...roles: UserRole[]) {
  const role = await getRole();
  if (!roles.includes(role)) {
    redirect("/dashboard");
  }
  return role;
}

/**
 * Get full Clerk user object on the server.
 */
export async function getServerUser() {
  return await currentUser();
}

/**
 * Check if the current user has a given role (non-redirecting).
 */
export async function hasRole(...roles: UserRole[]): Promise<boolean> {
  const role = await getRole();
  return roles.includes(role);
}

export const ADMIN_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];
export const STAFF_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "REGISTRAR", "DEPARTMENT_HEAD", "FACULTY", "ADVISOR", "BURSAR"];
