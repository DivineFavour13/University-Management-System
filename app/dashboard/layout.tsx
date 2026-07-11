"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";
import { useSidebarStore } from "@/store/useSidebarStore";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { isCollapsed } = useSidebarStore();
  const setRole = useAuthStore((state) => state.setRole);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
      return;
    }
    if (isLoaded && userId && user) {
      // Read role from Clerk publicMetadata (set via Clerk webhook after DB sync)
      const role = (user.publicMetadata?.role as UserRole) ?? "STUDENT";
      setRole(role);
    }
  }, [isLoaded, userId, user, setRole, router]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 overflow-hidden",
          "lg:ml-[260px]",
          isCollapsed && "lg:ml-[72px]"
        )}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
