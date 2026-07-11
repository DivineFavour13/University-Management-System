"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import type { UserRole } from "@/types";

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

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const redirected = useRef(false);

  useEffect(() => {
    if (!isLoaded || redirected.current) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }
    const role = (user.publicMetadata?.role as UserRole) ?? "STUDENT";
    const redirect = roleRedirects[role] ?? "/dashboard/student";
    redirected.current = true;
    router.replace(redirect);
  }, [isLoaded, user, router]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted">Loading your dashboard...</p>
      </div>
    </div>
  );
}
