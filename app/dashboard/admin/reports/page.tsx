"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, BookOpen, GraduationCap } from "lucide-react";

const enrollmentData = [
  { month: "Aug", students: 420 }, { month: "Sep", students: 890 }, { month: "Oct", students: 1200 },
  { month: "Nov", students: 1180 }, { month: "Dec", students: 1150 }, { month: "Jan", students: 980 },
];

const gradeData = [
  { grade: "A", count: 245 }, { grade: "B", count: 380 }, { grade: "C", count: 290 },
  { grade: "D", count: 120 }, { grade: "F", count: 45 },
];

const deptData = [
  { name: "CS", value: 340, color: "#3B82F6" },
  { name: "ENG", value: 520, color: "#F59E0B" },
  { name: "BUS", value: 410, color: "#10B981" },
  { name: "MED", value: 280, color: "#EF4444" },
  { name: "LAW", value: 190, color: "#8B5CF6" },
];

const tooltipStyle = { backgroundColor: "#111827", border: "1px solid #1F2937", borderRadius: "8px", color: "#F9FAFB" };

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Reports & Analytics" description="Institution-wide performance metrics" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatsCard title="Total Students" value="1,740" icon={<Users className="h-5 w-5" />} trend={{ value: 12, label: "vs last year" }} />
        <StatsCard title="Active Courses" value="148" icon={<BookOpen className="h-5 w-5" />} trend={{ value: 8, label: "vs last year" }} />
        <StatsCard title="Avg Attendance" value="87%" icon={<TrendingUp className="h-5 w-5" />} trend={{ value: 3, label: "vs last month" }} />
        <StatsCard title="Graduation Rate" value="94%" icon={<GraduationCap className="h-5 w-5" />} trend={{ value: 2, label: "vs last year" }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-6">Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={enrollmentData}>
              <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-6">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={gradeData}>
              <XAxis dataKey="grade" stroke="#6B7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-6">Students by Department</h3>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                  {deptData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 shrink-0">
              {deptData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-muted">{d.name}</span>
                  <span className="font-medium text-foreground ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-4">Key Metrics</h3>
          <div className="space-y-4">
            {[
              { label: "Course Completion Rate", value: 92, color: "#10B981" },
              { label: "Assignment Submission Rate", value: 78, color: "#3B82F6" },
              { label: "Student Satisfaction", value: 85, color: "#F59E0B" },
              { label: "Faculty Performance", value: 91, color: "#8B5CF6" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted">{m.label}</span>
                  <span className="font-medium text-foreground">{m.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${m.value}%`, backgroundColor: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
