"use client";

import { useAuth } from "@clerk/nextjs";
import type { UserRole } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export function RoleGate({
  children,
  allowedRoles,
  fallback = null,
}: RoleGateProps) {
  const { isLoaded } = useAuth();
  const role = useAuthStore((state) => state.role);

  if (!isLoaded) return null;

  if (!role || !allowedRoles.includes(role)) {
    return fallback;
  }

  return <>{children}</>;
}

export function useHasRole(roles: UserRole[]) {
  const role = useAuthStore((state) => state.role);
  return role ? roles.includes(role) : false;
}
