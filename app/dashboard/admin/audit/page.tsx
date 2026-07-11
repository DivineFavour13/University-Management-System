"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Shield } from "lucide-react";

const mockLogs = [
  { id: "1", user: "Dr. Adebayo", action: "GRADE_PUBLISHED", entity: "Course", entityId: "CS201", detail: "Published grades for Data Structures", createdAt: "2024-12-15 14:32:01" },
  { id: "2", user: "Admin", action: "USER_CREATED", entity: "User", entityId: "USR-0892", detail: "New student account created", createdAt: "2024-12-15 13:10:45" },
  { id: "3", user: "Registrar", action: "ENROLLMENT_APPROVED", entity: "Enrollment", entityId: "ENR-441", detail: "Student enrolled in ENG101", createdAt: "2024-12-15 11:22:18" },
  { id: "4", user: "Bursar", action: "HOLD_PLACED", entity: "Student", entityId: "STU-0234", detail: "Financial hold placed — outstanding balance", createdAt: "2024-12-14 16:05:33" },
  { id: "5", user: "Dr. Chukwu", action: "ATTENDANCE_MARKED", entity: "Course", entityId: "ENG101", detail: "Attendance marked for Dec 14", createdAt: "2024-12-14 09:15:00" },
  { id: "6", user: "Admin", action: "ROLE_CHANGED", entity: "User", entityId: "USR-0321", detail: "Role changed from STUDENT to FACULTY", createdAt: "2024-12-13 10:44:22" },
];

const actionColor: Record<string, string> = {
  GRADE_PUBLISHED: "text-success bg-success/10",
  USER_CREATED: "text-primary bg-primary/10",
  ENROLLMENT_APPROVED: "text-success bg-success/10",
  HOLD_PLACED: "text-danger bg-danger/10",
  ATTENDANCE_MARKED: "text-warning bg-warning/10",
  ROLE_CHANGED: "text-accent bg-accent/10",
};

export default function AuditPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Audit Log" description="Track all system actions for compliance and security" />
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-background/50">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{mockLogs.length} recent actions</span>
          <span className="text-xs text-muted ml-auto">Read-only · Updated in real time</span>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr>
              {["Timestamp", "User", "Action", "Entity", "Detail"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockLogs.map((log) => (
              <tr key={log.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-muted">{log.createdAt}</td>
                <td className="px-6 py-4 font-medium text-foreground">{log.user}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${actionColor[log.action] ?? "text-muted bg-border"}`}>
                    {log.action.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted">{log.entity} <span className="font-mono text-xs">#{log.entityId}</span></td>
                <td className="px-6 py-4 text-muted">{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
