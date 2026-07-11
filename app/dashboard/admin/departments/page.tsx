"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { Building2, Users, BookOpen, Plus } from "lucide-react";

const mockDepartments = [
  { id: "1", name: "Computer Science", code: "CS", head: "Dr. Adebayo", faculty: 12, students: 340, courses: 28 },
  { id: "2", name: "Engineering", code: "ENG", head: "Dr. Okafor", faculty: 18, students: 520, courses: 35 },
  { id: "3", name: "Business Administration", code: "BUS", head: "Dr. Nwosu", faculty: 10, students: 410, courses: 22 },
  { id: "4", name: "Medicine", code: "MED", head: "Dr. Adeleke", faculty: 25, students: 280, courses: 45 },
  { id: "5", name: "Law", code: "LAW", head: "Dr. Eze", faculty: 8, students: 190, courses: 18 },
];

export default function DepartmentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Departments"
        description="Manage university departments and their heads"
        action={<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" />Add Department</button>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard title="Total Departments" value={mockDepartments.length} icon={<Building2 className="h-5 w-5" />} trend={{ value: 0, label: "this year" }} />
        <StatsCard title="Total Faculty" value={mockDepartments.reduce((a, d) => a + d.faculty, 0)} icon={<Users className="h-5 w-5" />} trend={{ value: 5, label: "vs last year" }} />
        <StatsCard title="Total Courses" value={mockDepartments.reduce((a, d) => a + d.courses, 0)} icon={<BookOpen className="h-5 w-5" />} trend={{ value: 8, label: "vs last year" }} />
      </div>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/50">
            <tr>
              {["Department", "Code", "Head", "Faculty", "Students", "Courses", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockDepartments.map((dept) => (
              <tr key={dept.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{dept.name}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded text-xs font-mono bg-primary/10 text-primary">{dept.code}</span></td>
                <td className="px-6 py-4 text-muted">{dept.head}</td>
                <td className="px-6 py-4 text-muted">{dept.faculty}</td>
                <td className="px-6 py-4 text-muted">{dept.students}</td>
                <td className="px-6 py-4 text-muted">{dept.courses}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-primary hover:underline">Edit</button>
                    <button className="text-xs text-danger hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
