"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { BookOpen, Users, ClipboardCheck, FileText } from "lucide-react";

const todayClasses = [
  { code: "CS101", name: "Intro to Programming", time: "9:00 AM - 10:30 AM", room: "Lab A", enrolled: 45 },
  { code: "CS301", name: "Algorithms", time: "2:00 PM - 3:30 PM", room: "Hall B", enrolled: 32 },
];

const pendingSubmissions = [
  { assignment: "Lab 5 - Sorting Algorithms", course: "CS301", submissions: 28, total: 32, due: "2024-12-10" },
  { assignment: "Project Proposal", course: "CS101", submissions: 40, total: 45, due: "2024-12-08" },
];

export default function FacultyPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Faculty Dashboard" description="Welcome back! Here's your teaching overview." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatsCard title="Active Courses" value="4" icon={<BookOpen className="h-5 w-5" />} trend={{ value: 0, label: "this semester" }} />
        <StatsCard title="Total Students" value="162" icon={<Users className="h-5 w-5" />} trend={{ value: 5, label: "vs last semester" }} />
        <StatsCard title="Attendance Rate" value="89%" icon={<ClipboardCheck className="h-5 w-5" />} trend={{ value: 2, label: "vs last month" }} />
        <StatsCard title="Pending Reviews" value="12" icon={<FileText className="h-5 w-5" />} trend={{ value: -3, label: "vs yesterday" }} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-4">Today&apos;s Classes</h3>
          <div className="space-y-3">
            {todayClasses.map((c) => (
              <div key={c.code} className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                <div>
                  <p className="font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted mt-0.5">{c.time} · {c.room}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">{c.code}</span>
                  <p className="text-xs text-muted mt-1">{c.enrolled} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-4">Pending Submissions to Grade</h3>
          <div className="space-y-3">
            {pendingSubmissions.map((s) => (
              <div key={s.assignment} className="p-4 rounded-lg bg-background border border-border">
                <div className="flex justify-between mb-2">
                  <p className="font-medium text-foreground text-sm">{s.assignment}</p>
                  <span className="text-xs text-muted">{s.course}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(s.submissions / s.total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted shrink-0">{s.submissions}/{s.total}</span>
                </div>
                <p className="text-xs text-muted mt-1">Due: {s.due}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
