"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";

const students = [
  { id: "STU-001", name: "Chidi Okonkwo", gpa: 3.8, status: "ACTIVE", courses: 5, attendance: 94 },
  { id: "STU-002", name: "Amaka Ezeh", gpa: 2.1, status: "ACTIVE", courses: 4, attendance: 72 },
  { id: "STU-003", name: "Tunde Fashola", gpa: 2.4, status: "PROVISIONAL", courses: 3, attendance: 80 },
  { id: "STU-004", name: "Ngozi Dike", gpa: 3.5, status: "ACTIVE", courses: 5, attendance: 91 },
];

export default function AdvisorStudentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="My Students" description="Academic profiles of all your advisees" />
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/50">
            <tr>
              {["ID", "Name", "GPA", "Courses", "Attendance", "Status", ""].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-muted">{s.id}</td>
                <td className="px-6 py-4 font-medium text-foreground">{s.name}</td>
                <td className={`px-6 py-4 font-semibold ${s.gpa < 2.5 ? "text-danger" : s.gpa >= 3.5 ? "text-success" : "text-foreground"}`}>{s.gpa.toFixed(2)}</td>
                <td className="px-6 py-4 text-muted">{s.courses}</td>
                <td className="px-6 py-4 text-muted">{s.attendance}%</td>
                <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/advisor/students/${s.id}`} className="text-xs text-primary hover:underline">View Profile →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
