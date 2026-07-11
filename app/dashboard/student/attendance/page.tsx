"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const attendanceData = [
  { course: "Advanced Calculus", code: "MATH301", present: 18, absent: 1, late: 1, excused: 0, total: 20 },
  { course: "Data Structures", code: "CS201", present: 16, absent: 2, late: 2, excused: 0, total: 20 },
  { course: "Linear Algebra", code: "MATH205", present: 17, absent: 1, late: 2, excused: 0, total: 20 },
  { course: "Physics II", code: "PHYS202", present: 18, absent: 0, late: 1, excused: 1, total: 20 },
  { course: "Technical Writing", code: "ENG301", present: 19, absent: 0, late: 0, excused: 1, total: 20 },
];

function AttendanceBar({ present, absent, late, excused, total }: { present: number; absent: number; late: number; excused: number; total: number }) {
  const presentPct = (present / total) * 100;
  const latePct = (late / total) * 100;
  const excusedPct = (excused / total) * 100;
  const absentPct = (absent / total) * 100;

  return (
    <div className="w-full">
      <div className="flex h-3 rounded-full overflow-hidden bg-secondary">
        <div className="bg-success transition-all" style={{ width: `${presentPct}%` }} />
        <div className="bg-warning transition-all" style={{ width: `${latePct}%` }} />
        <div className="bg-blue-500 transition-all" style={{ width: `${excusedPct}%` }} />
        <div className="bg-danger transition-all" style={{ width: `${absentPct}%` }} />
      </div>
      <div className="flex gap-3 mt-2 text-xs">
        <span className="flex items-center gap-1 text-success"><CheckCircle2 className="h-3 w-3" /> {present}</span>
        <span className="flex items-center gap-1 text-danger"><XCircle className="h-3 w-3" /> {absent}</span>
        <span className="flex items-center gap-1 text-warning"><Clock className="h-3 w-3" /> {late}</span>
        <span className="flex items-center gap-1 text-blue-400"><AlertCircle className="h-3 w-3" /> {excused}</span>
      </div>
    </div>
  );
}

export default function StudentAttendance() {
  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Your attendance record across all courses" />
      <div className="space-y-4">
        {attendanceData.map((item, i) => {
          const rate = Math.round(((item.present + item.excused) / item.total) * 100);
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-surface p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="lg:w-64 flex-shrink-0">
                  <h3 className="font-semibold text-foreground">{item.course}</h3>
                  <p className="text-sm text-muted font-mono">{item.code}</p>
                </div>
                <div className="flex-1">
                  <AttendanceBar {...item} />
                </div>
                <div className="lg:w-24 text-right flex-shrink-0">
                  <p className={cn("text-2xl font-bold", rate >= 90 ? "text-success" : rate >= 75 ? "text-warning" : "text-danger")}>{rate}%</p>
                  <p className="text-xs text-muted">Attendance Rate</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
