"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/useAuthStore";

export function Topbar() {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const role = useAuthStore((state) => state.role);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profileHref =
    role === "STUDENT"
      ? "/dashboard/student/profile"
      : role === "ADMIN" || role === "SUPER_ADMIN"
      ? "/dashboard/admin/profile"
      : role === "FACULTY"
      ? "/dashboard/faculty/profile"
      : role === "REGISTRAR"
      ? "/dashboard/registrar/profile"
      : role === "BURSAR"
      ? "/dashboard/bursar/profile"
      : role === "ADVISOR"
      ? "/dashboard/advisor/profile"
      : role === "DEPARTMENT_HEAD"
      ? "/dashboard/department-head/profile"
      : "/dashboard/admin/profile";

  const notifications = [
    { id: "1", title: "New enrollment request", time: "2 min ago", read: false },
    { id: "2", title: "Assignment deadline approaching", time: "1 hour ago", read: false },
    { id: "3", title: "System maintenance scheduled", time: "3 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md flex-1 hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-surface shadow-xl"
                >
                  <div className="border-b border-border p-4">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 border-b border-border p-4 last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer",
                          !notification.read && "bg-primary/5"
                        )}
                      >
                        <div
                          className={cn(
                            "mt-1 h-2 w-2 flex-shrink-0 rounded-full",
                            notification.read ? "bg-muted" : "bg-primary"
                          )}
                        />
                        <div>
                          <p className="text-sm text-foreground">{notification.title}</p>
                          <p className="text-xs text-muted mt-0.5">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border p-3">
                    <Link href="#" className="block text-center text-sm text-primary hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar → Profile link */}
          <Link
            href={profileHref}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-medium text-sm hover:ring-2 hover:ring-primary/50 transition-all overflow-hidden"
            title="View Profile"
          >
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
            ) : (
              user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U"
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background px-4 py-3 md:hidden"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}