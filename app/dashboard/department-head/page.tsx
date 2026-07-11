"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

const deptFaculty = [
  { name: "Dr. Adeyemi", courses: 3, students: 127, rating: 4.8 },
  { name: "Dr. Bello", courses: 2, students: 76, rating: 4.5 },
  { name: "Dr. Chukwu", courses: 4, students: 155, rating: 4.2 },
  { name: "Dr. Dada", courses: 2, students: 88, rating: 4.7 },
];

const deptCourses = [
  { code: "CS101", name: "Intro to Programming", enrolled: 45, attendance: 92 },
  { code: "CS201", name: "Data Structures", enrolled: 38, attendance: 87 },
  { code: "CS301", name: "Algorithms", enrolled: 32, attendance: 84 },
  { code: "CS401", name: "Operating Systems", enrolled: 28, attendance: 91 },
];

export default function DepartmentHeadPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Department Head Dashboard" description="Computer Science Department Overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatsCard title="Faculty Members" value={deptFaculty.length} icon={<Users className="h-5 w-5" />} trend={{ value: 1, label: "new this year" }} />
        <StatsCard title="Active Courses" value={deptCourses.length} icon={<BookOpen className="h-5 w-5" />} trend={{ value: 2, label: "vs last semester" }} />
        <StatsCard title="Enrolled Students" value="340" icon={<GraduationCap className="h-5 w-5" />} trend={{ value: 15, label: "vs last semester" }} />
        <StatsCard title="Avg Attendance" value="89%" icon={<TrendingUp className="h-5 w-5" />} trend={{ value: 3, label: "vs last month" }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Faculty Performance</h3>
          </div>
          <div className="divide-y divide-border">
            {deptFaculty.map((f) => (
              <div key={f.name} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-foreground text-sm">{f.name}</p>
                  <p className="text-xs text-muted">{f.courses} courses · {f.students} students</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-accent">{f.rating}/5.0</p>
                  <p className="text-xs text-muted">Student Rating</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Course Attendance</h3>
          </div>
          <div className="divide-y divide-border">
            {deptCourses.map((c) => (
              <div key={c.code} className="px-6 py-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs text-primary">{c.code}</span>
                    <span className="text-sm text-foreground ml-2">{c.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${c.attendance >= 90 ? "text-success" : c.attendance >= 80 ? "text-warning" : "text-danger"}`}>{c.attendance}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className={`h-full rounded-full ${c.attendance >= 90 ? "bg-success" : c.attendance >= 80 ? "bg-warning" : "bg-danger"}`} style={{ width: `${c.attendance}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
