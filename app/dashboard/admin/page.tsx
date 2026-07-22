"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Users, BookOpen, Building2, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAdminStats } from "@/actions/admin";

type AuditLog = {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  createdAt: Date;
  user: { firstName: string; lastName: string };
};

type Stats = {
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  totalDepartments: number;
  recentAuditLogs: AuditLog[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Admin Dashboard" description="System overview and key metrics" />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={loading ? "—" : stats?.totalStudents ?? 0}
          icon={<GraduationCap className="h-5 w-5" />}
          trend="neutral"
          trendValue="from database"
        />
        <StatsCard
          title="Total Faculty"
          value={loading ? "—" : stats?.totalFaculty ?? 0}
          icon={<Users className="h-5 w-5" />}
          trend="neutral"
          trendValue="from database"
        />
        <StatsCard
          title="Active Courses"
          value={loading ? "—" : stats?.totalCourses ?? 0}
          icon={<BookOpen className="h-5 w-5" />}
          trend="neutral"
          trendValue="from database"
        />
        <StatsCard
          title="Departments"
          value={loading ? "—" : stats?.totalDepartments ?? 0}
          icon={<Building2 className="h-5 w-5" />}
          trend="neutral"
          trendValue="from database"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-xl border border-border bg-surface p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <Link
              href="/dashboard/admin/audit"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-background rounded-lg animate-pulse" />
              ))}
            </div>
          ) : stats?.recentAuditLogs.length === 0 ? (
            <div className="py-12 text-center text-muted text-sm">
              No activity yet — actions taken in the system will appear here.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  {["User", "Action", "Entity", "Time"].map((h) => (
                    <th key={h} className="pb-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats?.recentAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-background/50 transition-colors">
                    <td className="py-3 font-medium text-foreground">
                      {log.user.firstName} {log.user.lastName}
                    </td>
                    <td className="py-3 text-muted">
                      {log.action.replace(/_/g, " ")}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={log.entity} />
                    </td>
                    <td className="py-3 text-muted text-xs">
                      {new Date(log.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Invite New User", href: "/dashboard/admin/users" },
              { label: "Create Course", href: "/dashboard/admin/courses" },
              { label: "Post Announcement", href: "/dashboard/admin/notices" },
              { label: "View Reports", href: "/dashboard/admin/reports" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm text-foreground hover:bg-secondary transition-colors"
              >
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