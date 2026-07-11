"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { BookOpen, Clock, Award, Bell, AlertCircle, ArrowRight } from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    { title: "Enrolled Courses", value: 5, icon: <BookOpen className="h-5 w-5" />, trend: "up" as const, trendValue: "+2 this semester" },
    { title: "Attendance Rate", value: "92%", icon: <Clock className="h-5 w-5" />, trend: "up" as const, trendValue: "+3% from last month" },
    { title: "Current GPA", value: "3.7", icon: <Award className="h-5 w-5" />, trend: "neutral" as const, trendValue: "Top 15%" },
    { title: "Unread Notices", value: 3, icon: <Bell className="h-5 w-5" />, trend: "down" as const, trendValue: "2 new today" },
  ];

  const courses = [
    { id: "1", name: "Advanced Calculus", code: "MATH301", faculty: "Dr. Sarah Chen", schedule: "Mon/Wed 10:00 AM", attendance: 95 },
    { id: "2", name: "Data Structures", code: "CS201", faculty: "Prof. James Wilson", schedule: "Tue/Thu 2:00 PM", attendance: 88 },
    { id: "3", name: "Linear Algebra", code: "MATH205", faculty: "Dr. Maria Garcia", schedule: "Mon/Wed 1:00 PM", attendance: 92 },
  ];

  const notices = [
    { id: "1", title: "Midterm Exam Schedule Released", date: "2026-06-25", target: "All Students" },
    { id: "2", title: "Library Hours Extended for Finals", date: "2026-06-24", target: "All Students" },
    { id: "3", title: "Summer Registration Opens Monday", date: "2026-06-23", target: "All Students" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Student Dashboard" description="Welcome back! Here's your academic overview." />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-warning/30 bg-warning/5 p-4 flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Your status is <StatusBadge variant="warning">PROVISIONAL</StatusBadge></p>
          <p className="text-xs text-muted mt-0.5">Complete your tuition payment to activate full access.</p>
        </div>
        <Link href="/dashboard/student/fees" className="rounded-lg bg-warning px-4 py-2 text-sm font-medium text-black hover:bg-warning/90 transition-colors">Pay Now</Link>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} delay={i * 0.1} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Today's Classes</h3>
            <Link href="/dashboard/student/timetable" className="text-sm text-primary hover:underline flex items-center gap-1">View All <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">{course.code}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{course.name}</p>
                  <p className="text-sm text-muted">{course.faculty} · {course.schedule}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-success">{course.attendance}%</p>
                  <p className="text-xs text-muted">Attendance</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Notices</h3>
            <Link href="/dashboard/student/notices" className="text-sm text-primary hover:underline flex items-center gap-1">All <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="space-y-3">
            {notices.map((notice) => (
              <div key={notice.id} className="border-l-2 border-primary pl-4 py-1">
                <p className="text-sm font-medium text-foreground">{notice.title}</p>
                <p className="text-xs text-muted mt-0.5">{notice.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Grades</h3>
          <Link href="/dashboard/student/grades" className="text-sm text-primary hover:underline flex items-center gap-1">View All <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { course: "Advanced Calculus", grade: "A", score: 94 },
            { course: "Data Structures", grade: "A-", score: 91 },
            { course: "Linear Algebra", grade: "B+", score: 88 },
            { course: "Physics II", grade: "A", score: 95 },
          ].map((item, i) => (
            <div key={i} className="rounded-lg border border-border p-4 text-center hover:bg-secondary/30 transition-colors">
              <p className="text-sm text-muted">{item.course}</p>
              <p className="text-3xl font-bold text-primary mt-1">{item.grade}</p>
              <p className="text-xs text-muted mt-1">{item.score}%</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
