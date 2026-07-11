"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DollarSign, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const recentPayments = [
  { id: "PAY-001", student: "Chidi Okonkwo", amount: 450000, type: "TUITION", status: "COMPLETED", date: "2024-12-15" },
  { id: "PAY-002", student: "Amaka Ezeh", amount: 450000, type: "TUITION", status: "PENDING", date: "2024-12-14" },
  { id: "PAY-003", student: "Tunde Fashola", amount: 450000, type: "TUITION", status: "FAILED", date: "2024-12-13" },
  { id: "PAY-004", student: "Ngozi Dike", amount: 25000, type: "FEE", status: "COMPLETED", date: "2024-12-12" },
];

const activeHolds = [
  { student: "Emeka Nwosu", id: "STU-0341", reason: "Outstanding tuition balance", since: "2024-11-01" },
  { student: "Kemi Adeyemi", id: "STU-0412", reason: "Returned library books overdue", since: "2024-11-20" },
];

export default function BursarPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Bursar Dashboard" description="Financial overview and student account management" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatsCard title="Revenue (Semester)" value="₦782M" icon={<DollarSign className="h-5 w-5" />} trend={{ value: 8, label: "vs last semester" }} />
        <StatsCard title="Pending Payments" value="87" icon={<AlertCircle className="h-5 w-5" />} trend={{ value: -12, label: "vs last week" }} />
        <StatsCard title="Completed Today" value="34" icon={<CheckCircle className="h-5 w-5" />} trend={{ value: 5, label: "vs yesterday" }} />
        <StatsCard title="Active Holds" value={activeHolds.length} icon={<XCircle className="h-5 w-5" />} trend={{ value: 0, label: "unchanged" }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Recent Payments</h3>
          </div>
          <div className="divide-y divide-border">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-foreground text-sm">{p.student}</p>
                  <p className="text-xs text-muted">{p.id} · {p.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">₦{p.amount.toLocaleString()}</p>
                  <StatusBadge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Active Financial Holds</h3>
            <span className="text-xs bg-danger/10 text-danger px-2 py-1 rounded-full">{activeHolds.length} active</span>
          </div>
          <div className="divide-y divide-border">
            {activeHolds.map((hold) => (
              <div key={hold.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-foreground text-sm">{hold.student}</p>
                  <p className="text-xs text-muted">{hold.id}</p>
                  <p className="text-xs text-danger mt-0.5">{hold.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">Since {hold.since}</p>
                  <button className="text-xs text-success hover:underline mt-1">Lift Hold</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
