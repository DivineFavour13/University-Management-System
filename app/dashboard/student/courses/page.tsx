"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { BookOpen, Clock, User, TrendingUp } from "lucide-react";

const courses = [
  { id: "1", name: "Advanced Calculus", code: "MATH301", faculty: "Dr. Sarah Chen", schedule: "Mon/Wed 10:00 AM - 11:30 AM", credits: 4, attendance: 95, grade: "A" },
  { id: "2", name: "Data Structures & Algorithms", code: "CS201", faculty: "Prof. James Wilson", schedule: "Tue/Thu 2:00 PM - 3:30 PM", credits: 3, attendance: 88, grade: "A-" },
  { id: "3", name: "Linear Algebra", code: "MATH205", faculty: "Dr. Maria Garcia", schedule: "Mon/Wed 1:00 PM - 2:30 PM", credits: 3, attendance: 92, grade: "B+" },
  { id: "4", name: "Physics II: Electromagnetism", code: "PHYS202", faculty: "Dr. Robert Kim", schedule: "Tue/Thu 9:00 AM - 10:30 AM", credits: 4, attendance: 90, grade: "A" },
  { id: "5", name: "Technical Writing", code: "ENG301", faculty: "Prof. Emily Davis", schedule: "Fri 10:00 AM - 12:00 PM", credits: 2, attendance: 98, grade: "A" },
];

export default function StudentCourses() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Courses" description="Your enrolled courses for Spring 2026" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, i) => (
          <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="group rounded-xl border border-border bg-surface p-6 hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <StatusBadge variant={course.grade.startsWith("A") ? "success" : course.grade.startsWith("B") ? "warning" : "default"}>{course.grade}</StatusBadge>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{course.name}</h3>
            <p className="text-sm text-muted font-mono mt-1">{course.code}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted"><User className="h-4 w-4" />{course.faculty}</div>
              <div className="flex items-center gap-2 text-sm text-muted"><Clock className="h-4 w-4" />{course.schedule}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">{course.attendance}%</span>
                <span className="text-xs text-muted">attendance</span>
              </div>
              <span className="text-sm text-muted">{course.credits} credits</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
