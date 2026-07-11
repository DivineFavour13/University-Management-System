"use client";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Check, X, Clock, AlertCircle } from "lucide-react";

const courses = [
  { id: "cs101", code: "CS101", name: "Intro to Programming" },
  { id: "cs301", code: "CS301", name: "Algorithms" },
];

const students = [
  { id: "1", name: "Chidi Okonkwo", matricNo: "CS/2022/001" },
  { id: "2", name: "Amaka Ezeh", matricNo: "CS/2022/002" },
  { id: "3", name: "Tunde Fashola", matricNo: "CS/2022/003" },
  { id: "4", name: "Ngozi Dike", matricNo: "CS/2022/004" },
  { id: "5", name: "Emeka Nwosu", matricNo: "CS/2022/005" },
];

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

const statusConfig: Record<AttendanceStatus, { label: string; color: string; icon: React.ReactNode }> = {
  PRESENT: { label: "Present", color: "bg-success/20 text-success border-success/30", icon: <Check className="h-3.5 w-3.5" /> },
  ABSENT: { label: "Absent", color: "bg-danger/20 text-danger border-danger/30", icon: <X className="h-3.5 w-3.5" /> },
  LATE: { label: "Late", color: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="h-3.5 w-3.5" /> },
  EXCUSED: { label: "Excused", color: "bg-primary/20 text-primary border-primary/30", icon: <AlertCircle className="h-3.5 w-3.5" /> },
};

export default function AttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]!.id);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0] ?? "");
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});

  const markAll = (status: AttendanceStatus) => {
    const all: Record<string, AttendanceStatus> = {};
    students.forEach((s) => { all[s.id] = status; });
    setAttendance(all);
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Mark Attendance" description="Record student attendance per class session" />

      <div className="flex flex-wrap gap-4">
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
          {courses.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        <div className="flex gap-2 ml-auto">
          {(["PRESENT", "ABSENT"] as AttendanceStatus[]).map((s) => (
            <button key={s} onClick={() => markAll(s)}
              className={`text-xs px-3 py-2 rounded-lg border transition-colors ${statusConfig[s].color}`}>
              Mark All {statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-background/50 flex justify-between">
          <span className="text-sm font-medium text-foreground">{students.length} students</span>
          <span className="text-sm text-muted">
            {Object.values(attendance).filter((s) => s === "PRESENT").length} present
          </span>
        </div>
        <div className="divide-y divide-border">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-foreground">{student.name}</p>
                <p className="text-xs font-mono text-muted">{student.matricNo}</p>
              </div>
              <div className="flex gap-2">
                {(Object.keys(statusConfig) as AttendanceStatus[]).map((status) => (
                  <button key={status} onClick={() => setAttendance((prev) => ({ ...prev, [student.id]: status }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      attendance[student.id] === status ? statusConfig[status].color : "border-border text-muted hover:border-primary/50"
                    }`}>
                    {statusConfig[status].icon} {statusConfig[status].label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
          Save Attendance
        </button>
      </div>
    </div>
  );
}
