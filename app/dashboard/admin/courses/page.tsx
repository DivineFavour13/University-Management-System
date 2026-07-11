"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { BookOpen, Users, GraduationCap, Plus } from "lucide-react";

const mockCourses = [
  { id: "1", code: "CS101", name: "Intro to Programming", dept: "Computer Science", faculty: "Dr. Adeyemi", credits: 3, enrolled: 45, semester: "FALL" },
  { id: "2", code: "CS201", name: "Data Structures", dept: "Computer Science", faculty: "Dr. Bello", credits: 3, enrolled: 38, semester: "FALL" },
  { id: "3", code: "ENG101", name: "Engineering Math", dept: "Engineering", faculty: "Dr. Chukwu", credits: 4, enrolled: 62, semester: "FALL" },
  { id: "4", code: "BUS101", name: "Principles of Management", dept: "Business", faculty: "Dr. Dada", credits: 3, enrolled: 55, semester: "SPRING" },
  { id: "5", code: "MED201", name: "Anatomy I", dept: "Medicine", faculty: "Dr. Emeka", credits: 5, enrolled: 30, semester: "FALL" },
];

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Course Management"
        description="Manage all courses across departments"
        action={<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" />Add Course</button>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard title="Total Courses" value={mockCourses.length} icon={<BookOpen className="h-5 w-5" />} trend={{ value: 8, label: "vs last semester" }} />
        <StatsCard title="Total Enrollments" value={mockCourses.reduce((a, c) => a + c.enrolled, 0)} icon={<Users className="h-5 w-5" />} trend={{ value: 12, label: "vs last semester" }} />
        <StatsCard title="Avg Class Size" value={Math.round(mockCourses.reduce((a, c) => a + c.enrolled, 0) / mockCourses.length)} icon={<GraduationCap className="h-5 w-5" />} trend={{ value: 3, label: "vs last semester" }} />
      </div>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/50">
            <tr>
              {["Code", "Course Name", "Department", "Faculty", "Credits", "Enrolled", "Semester", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockCourses.map((course) => (
              <tr key={course.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4"><span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 rounded">{course.code}</span></td>
                <td className="px-6 py-4 font-medium text-foreground">{course.name}</td>
                <td className="px-6 py-4 text-muted">{course.dept}</td>
                <td className="px-6 py-4 text-muted">{course.faculty}</td>
                <td className="px-6 py-4 text-center text-muted">{course.credits}</td>
                <td className="px-6 py-4 text-center text-muted">{course.enrolled}</td>
                <td className="px-6 py-4"><StatusBadge status={course.semester} /></td>
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
