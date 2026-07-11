"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Users, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import Link from "next/link";

const advisees = [
  { id: "STU-001", name: "Chidi Okonkwo", dept: "CS", gpa: 3.8, status: "ACTIVE", courses: 5, flag: null },
  { id: "STU-002", name: "Amaka Ezeh", dept: "CS", gpa: 2.1, status: "ACTIVE", courses: 4, flag: "LOW_GPA" },
  { id: "STU-003", name: "Tunde Fashola", dept: "CS", gpa: 2.4, status: "PROVISIONAL", courses: 3, flag: "PAYMENT_PENDING" },
  { id: "STU-004", name: "Ngozi Dike", dept: "CS", gpa: 3.5, status: "ACTIVE", courses: 5, flag: null },
];

export default function AdvisorPage() {
  const flagged = advisees.filter((a) => a.flag !== null);

  return (
    <div className="space-y-8">
      <PageHeader title="Advisor Dashboard" description="Track your advisees' academic progress" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatsCard title="My Advisees" value={advisees.length} icon={<Users className="h-5 w-5" />} trend={{ value: 0, label: "this semester" }} />
        <StatsCard title="Flagged Students" value={flagged.length} icon={<AlertTriangle className="h-5 w-5" />} trend={{ value: 1, label: "vs last month" }} />
        <StatsCard title="Good Standing" value={advisees.filter((a) => a.gpa >= 3.0).length} icon={<CheckCircle className="h-5 w-5" />} trend={{ value: 0, label: "unchanged" }} />
        <StatsCard title="Pending Overrides" value="3" icon={<BookOpen className="h-5 w-5" />} trend={{ value: 2, label: "new this week" }} />
      </div>

      {flagged.length > 0 && (
        <div className="rounded-xl border border-danger/30 bg-danger/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-danger" />
            <h3 className="font-semibold text-danger text-sm">Students Requiring Attention</h3>
          </div>
          <div className="space-y-2">
            {flagged.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-background border border-danger/20">
                <div>
                  <p className="font-medium text-foreground text-sm">{s.name}</p>
                  <p className="text-xs text-danger">{s.flag === "LOW_GPA" ? `Low GPA: ${s.gpa}` : "Payment pending — PROVISIONAL status"}</p>
                </div>
                <Link href={`/dashboard/advisor/students/${s.id}`} className="text-xs text-primary hover:underline">View Profile →</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">All Advisees</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/50">
            <tr>
              {["Student ID", "Name", "GPA", "Courses", "Status", ""].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {advisees.map((s) => (
              <tr key={s.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-muted">{s.id}</td>
                <td className="px-6 py-4 font-medium text-foreground">{s.name}</td>
                <td className={`px-6 py-4 font-semibold ${s.gpa < 2.5 ? "text-danger" : s.gpa >= 3.5 ? "text-success" : "text-foreground"}`}>{s.gpa.toFixed(2)}</td>
                <td className="px-6 py-4 text-muted">{s.courses}</td>
                <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/advisor/students/${s.id}`} className="text-xs text-primary hover:underline">View →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
