"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Users, FileText, GraduationCap, Clock } from "lucide-react";

const recentRegistrations = [
  { id: "STU-0891", name: "Chidi Okonkwo", dept: "Computer Science", date: "2024-12-15", status: "PROVISIONAL" },
  { id: "STU-0892", name: "Amaka Ezeh", dept: "Medicine", date: "2024-12-14", status: "ACTIVE" },
  { id: "STU-0893", name: "Tunde Fashola", dept: "Law", date: "2024-12-13", status: "PROVISIONAL" },
  { id: "STU-0894", name: "Ngozi Dike", dept: "Engineering", date: "2024-12-12", status: "ACTIVE" },
];

export default function RegistrarPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Registrar Dashboard" description="Manage student records, enrollments, and academic data" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatsCard title="Total Students" value="1,740" icon={<Users className="h-5 w-5" />} trend={{ value: 12, label: "this semester" }} />
        <StatsCard title="Pending Enrollments" value="34" icon={<Clock className="h-5 w-5" />} trend={{ value: -5, label: "vs yesterday" }} />
        <StatsCard title="Transcripts Issued" value="128" icon={<FileText className="h-5 w-5" />} trend={{ value: 8, label: "this month" }} />
        <StatsCard title="Graduation Pending" value="12" icon={<GraduationCap className="h-5 w-5" />} trend={{ value: 0, label: "this semester" }} />
      </div>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Registrations</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/50">
            <tr>
              {["Student ID", "Name", "Department", "Date", "Status"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentRegistrations.map((s) => (
              <tr key={s.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-muted">{s.id}</td>
                <td className="px-6 py-4 font-medium text-foreground">{s.name}</td>
                <td className="px-6 py-4 text-muted">{s.dept}</td>
                <td className="px-6 py-4 text-muted">{s.date}</td>
                <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
