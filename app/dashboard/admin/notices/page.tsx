"use client";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Megaphone, Plus, Pin } from "lucide-react";

const mockNotices = [
  { id: "1", title: "Semester Registration Open", content: "Registration for the Spring 2025 semester is now open. All students must register before January 15th.", target: ["STUDENT"], priority: "HIGH", publishedAt: "2024-12-01", expiresAt: "2025-01-15", pinned: true },
  { id: "2", title: "Faculty Meeting — January 8", content: "Mandatory faculty meeting in the main hall at 10am.", target: ["FACULTY", "DEPARTMENT_HEAD"], priority: "MEDIUM", publishedAt: "2024-12-10", expiresAt: "2025-01-08", pinned: false },
  { id: "3", title: "Library Holiday Hours", content: "The library will operate reduced hours during the holiday period.", target: ["STUDENT", "FACULTY"], priority: "LOW", publishedAt: "2024-12-05", expiresAt: "2025-01-05", pinned: false },
];

const priorityColor: Record<string, string> = {
  HIGH: "text-danger bg-danger/10",
  MEDIUM: "text-warning bg-warning/10",
  LOW: "text-success bg-success/10",
};

export default function NoticesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Notice Board"
        description="Publish announcements to specific roles"
        action={<button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" />New Notice</button>}
      />

      {showForm && (
        <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Create Notice</h3>
          <input className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Notice title..." />
          <textarea className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary h-24 resize-none" placeholder="Notice content..." />
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Publish</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-background transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {mockNotices.map((notice) => (
          <div key={notice.id} className="rounded-xl border border-border bg-surface p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Megaphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {notice.pinned && <Pin className="h-3.5 w-3.5 text-accent" />}
                    <h3 className="font-semibold text-foreground">{notice.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColor[notice.priority]}`}>{notice.priority}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                    <span>Published: {notice.publishedAt}</span>
                    <span>Expires: {notice.expiresAt}</span>
                    <div className="flex gap-1">{notice.target.map((t) => <StatusBadge key={t} status={t} />)}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="text-xs text-primary hover:underline">Edit</button>
                <button className="text-xs text-danger hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
