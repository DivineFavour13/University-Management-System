"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import type { ColumnDef } from "@tanstack/react-table";
import { Users, BookOpen, Building2, GraduationCap, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { title: "Total Students", value: 1247, icon: <GraduationCap className="h-5 w-5" />, trend: "up" as const, trendValue: "+12% this year" },
  { title: "Total Faculty", value: 89, icon: <Users className="h-5 w-5" />, trend: "up" as const, trendValue: "+3 new hires" },
  { title: "Active Courses", value: 156, icon: <BookOpen className="h-5 w-5" />, trend: "neutral" as const, trendValue: "Spring 2026" },
  { title: "Departments", value: 12, icon: <Building2 className="h-5 w-5" />, trend: "neutral" as const, trendValue: "No change" },
];

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

const activities: ActivityItem[] = [
  { id: "1", user: "Dr. Sarah Chen", action: "published grades for", target: "MATH301", time: "2 min ago" },
  { id: "2", user: "Registrar Office", action: "enrolled student in", target: "CS201", time: "15 min ago" },
  { id: "3", user: "Admin", action: "created new course", target: "AI Ethics (CS450)", time: "1 hour ago" },
  { id: "4", user: "Bursar Office", action: "processed payment for", target: "STU-2024-001", time: "2 hours ago" },
  { id: "5", user: "Dr. James Wilson", action: "marked attendance for", target: "CS201", time: "3 hours ago" },
];

const columns: ColumnDef<ActivityItem>[] = [
  { accessorKey: "user", header: "User" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "target", header: "Target" },
  { accessorKey: "time", header: "Time" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader title="Admin Dashboard" description="System overview and key metrics" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} delay={i * 0.1} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <Link href="/dashboard/admin/audit" className="text-sm text-primary hover:underline flex items-center gap-1">View All <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <DataTable columns={columns} data={activities} pageSize={5} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Invite New User", href: "/dashboard/admin/users" },
              { label: "Create Course", href: "/dashboard/admin/courses" },
              { label: "Post Announcement", href: "/dashboard/admin/notices" },
              { label: "View Reports", href: "/dashboard/admin/reports" },
            ].map((action) => (
              <Link key={action.href} href={action.href}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm text-foreground hover:bg-secondary transition-colors">
                {action.label}
                <ArrowRight className="h-4 w-4 text-muted" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
