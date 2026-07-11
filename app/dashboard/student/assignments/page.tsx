"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { FileText, Clock, Upload } from "lucide-react";

const assignments = [
  { id: "1", title: "Calculus Problem Set 4", course: "Advanced Calculus", code: "MATH301", dueDate: "2026-07-05", status: "PENDING" as const, totalMarks: 100 },
  { id: "2", title: "Binary Tree Implementation", course: "Data Structures", code: "CS201", dueDate: "2026-07-03", status: "SUBMITTED" as const, totalMarks: 150 },
  { id: "3", title: "Matrix Operations Lab", course: "Linear Algebra", code: "MATH205", dueDate: "2026-07-08", status: "PENDING" as const, totalMarks: 50 },
  { id: "4", title: "Electromagnetism Report", course: "Physics II", code: "PHYS202", dueDate: "2026-06-30", status: "OVERDUE" as const, totalMarks: 100 },
  { id: "5", title: "Technical Memo Draft", course: "Technical Writing", code: "ENG301", dueDate: "2026-07-10", status: "PENDING" as const, totalMarks: 75 },
];

const statusVariants = { PENDING: "warning" as const, SUBMITTED: "success" as const, GRADED: "info" as const, OVERDUE: "danger" as const };

export default function StudentAssignments() {
  return (
    <div className="space-y-6">
      <PageHeader title="Assignments" description="All assignments across your courses" />
      <div className="space-y-3">
        {assignments.map((assignment, i) => (
          <motion.div key={assignment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5 hover:border-primary/20 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                <StatusBadge variant={statusVariants[assignment.status]}>{assignment.status}</StatusBadge>
              </div>
              <p className="text-sm text-muted mt-0.5">{assignment.course} · {assignment.code}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Due {assignment.dueDate}</span>
                <span>{assignment.totalMarks} marks</span>
              </div>
            </div>
            {assignment.status === "PENDING" && (
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors flex-shrink-0">
                <Upload className="h-4 w-4" /> Submit
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
