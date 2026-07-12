"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, useClerk } from "@clerk/nextjs";
import { useAuthStore } from "@/store/useAuthStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  Megaphone,
  BarChart3,
  ClipboardList,
  Settings,
  GraduationCap,
  FileText,
  UserCheck,
  DollarSign,
  CalendarDays,
  ClipboardCheck,
  Award,
  Bell,
  CreditCard,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Shield,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const adminRoles: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

const navItems: NavItem[] = [
  // Admin
  { label: "Dashboard", href: "/dashboard/admin", icon: <LayoutDashboard className="h-5 w-5" />, roles: adminRoles },
  { label: "Users", href: "/dashboard/admin/users", icon: <Users className="h-5 w-5" />, roles: adminRoles },
  { label: "Departments", href: "/dashboard/admin/departments", icon: <Building2 className="h-5 w-5" />, roles: adminRoles },
  { label: "Courses", href: "/dashboard/admin/courses", icon: <BookOpen className="h-5 w-5" />, roles: adminRoles },
  { label: "Notices", href: "/dashboard/admin/notices", icon: <Megaphone className="h-5 w-5" />, roles: adminRoles },
  { label: "Reports", href: "/dashboard/admin/reports", icon: <BarChart3 className="h-5 w-5" />, roles: adminRoles },
  { label: "Audit Log", href: "/dashboard/admin/audit", icon: <ClipboardList className="h-5 w-5" />, roles: adminRoles },
  { label: "Profile", href: "/dashboard/admin/profile", icon: <UserCircle className="h-5 w-5" />, roles: adminRoles },
  { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="h-5 w-5" />, roles: adminRoles },

  // Registrar
  { label: "Dashboard", href: "/dashboard/registrar", icon: <LayoutDashboard className="h-5 w-5" />, roles: ["REGISTRAR"] },
  { label: "Students", href: "/dashboard/registrar/students", icon: <GraduationCap className="h-5 w-5" />, roles: ["REGISTRAR"] },
  { label: "Enrollments", href: "/dashboard/registrar/enrollments", icon: <FileText className="h-5 w-5" />, roles: ["REGISTRAR"] },
  { label: "Transcripts", href: "/dashboard/registrar/transcripts", icon: <Award className="h-5 w-5" />, roles: ["REGISTRAR"] },
  { label: "Graduation", href: "/dashboard/registrar/graduation", icon: <UserCheck className="h-5 w-5" />, roles: ["REGISTRAR"] },

  // Department Head
  { label: "Dashboard", href: "/dashboard/department-head", icon: <LayoutDashboard className="h-5 w-5" />, roles: ["DEPARTMENT_HEAD"] },
  { label: "Department", href: "/dashboard/department-head/department", icon: <Building2 className="h-5 w-5" />, roles: ["DEPARTMENT_HEAD"] },
  { label: "Courses", href: "/dashboard/department-head/courses", icon: <BookOpen className="h-5 w-5" />, roles: ["DEPARTMENT_HEAD"] },
  { label: "Faculty", href: "/dashboard/department-head/faculty", icon: <Users className="h-5 w-5" />, roles: ["DEPARTMENT_HEAD"] },
  { label: "Reports", href: "/dashboard/department-head/reports", icon: <BarChart3 className="h-5 w-5" />, roles: ["DEPARTMENT_HEAD"] },

  // Faculty
  { label: "Dashboard", href: "/dashboard/faculty", icon: <LayoutDashboard className="h-5 w-5" />, roles: ["FACULTY"] },
  { label: "My Courses", href: "/dashboard/faculty/courses", icon: <BookOpen className="h-5 w-5" />, roles: ["FACULTY"] },
  { label: "Attendance", href: "/dashboard/faculty/attendance", icon: <ClipboardCheck className="h-5 w-5" />, roles: ["FACULTY"] },
  { label: "Assignments", href: "/dashboard/faculty/assignments", icon: <FileText className="h-5 w-5" />, roles: ["FACULTY"] },
  { label: "Submissions", href: "/dashboard/faculty/submissions", icon: <ClipboardList className="h-5 w-5" />, roles: ["FACULTY"] },
  { label: "Grades", href: "/dashboard/faculty/grades", icon: <Award className="h-5 w-5" />, roles: ["FACULTY"] },
  { label: "Timetable", href: "/dashboard/faculty/timetable", icon: <CalendarDays className="h-5 w-5" />, roles: ["FACULTY"] },

  // Advisor
  { label: "Dashboard", href: "/dashboard/advisor", icon: <LayoutDashboard className="h-5 w-5" />, roles: ["ADVISOR"] },
  { label: "My Students", href: "/dashboard/advisor/students", icon: <Users className="h-5 w-5" />, roles: ["ADVISOR"] },
  { label: "Overrides", href: "/dashboard/advisor/overrides", icon: <Shield className="h-5 w-5" />, roles: ["ADVISOR"] },

  // Bursar
  { label: "Dashboard", href: "/dashboard/bursar", icon: <LayoutDashboard className="h-5 w-5" />, roles: ["BURSAR"] },
  { label: "Accounts", href: "/dashboard/bursar/accounts", icon: <Users className="h-5 w-5" />, roles: ["BURSAR"] },
  { label: "Invoices", href: "/dashboard/bursar/invoices", icon: <FileText className="h-5 w-5" />, roles: ["BURSAR"] },
  { label: "Payments", href: "/dashboard/bursar/payments", icon: <CreditCard className="h-5 w-5" />, roles: ["BURSAR"] },
  { label: "Holds", href: "/dashboard/bursar/holds", icon: <Shield className="h-5 w-5" />, roles: ["BURSAR"] },

  // Student
  { label: "Dashboard", href: "/dashboard/student", icon: <LayoutDashboard className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "My Courses", href: "/dashboard/student/courses", icon: <BookOpen className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "Timetable", href: "/dashboard/student/timetable", icon: <CalendarDays className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "Assignments", href: "/dashboard/student/assignments", icon: <FileText className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "Grades", href: "/dashboard/student/grades", icon: <Award className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "Attendance", href: "/dashboard/student/attendance", icon: <ClipboardCheck className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "Fees", href: "/dashboard/student/fees", icon: <DollarSign className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "Notices", href: "/dashboard/student/notices", icon: <Bell className="h-5 w-5" />, roles: ["STUDENT"] },
  { label: "Profile", href: "/dashboard/student/profile", icon: <UserCircle className="h-5 w-5" />, roles: ["STUDENT"] },
];

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrator",
  REGISTRAR: "Registrar",
  DEPARTMENT_HEAD: "Department Head",
  FACULTY: "Faculty",
  ADVISOR: "Advisor",
  BURSAR: "Bursar",
  STUDENT: "Student",
};

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const role = useAuthStore((state) => state.role);
  const { user } = useUser();
  const { signOut } = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredNav = navItems.filter((item) =>
    role ? item.roles.includes(role) : false
  );

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <span className="font-heading text-lg font-bold text-foreground whitespace-nowrap">
                UniManage
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleCollapse}
          className="ml-auto hidden rounded-lg p-1 text-muted hover:bg-secondary hover:text-foreground lg:block"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {filteredNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-secondary hover:text-foreground"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile + Sign Out */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-medium text-sm">
            {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U"}
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || "User"}
                </p>
                {role && (
                  <p className="text-xs text-muted">{roleLabels[role]}</p>
                )}
                <button
                  onClick={() => signOut({ redirectUrl: "/sign-in" })}
                  className="flex items-center gap-1 text-xs text-danger hover:underline mt-1"
                >
                  <LogOut className="h-3 w-3" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-surface p-2 text-foreground shadow-lg border border-border lg:hidden"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-[280px] bg-background border-r border-border lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 72 : 260 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 z-30 hidden h-full border-r border-border bg-background lg:block"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}