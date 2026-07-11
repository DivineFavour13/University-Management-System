"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Award, TrendingUp } from "lucide-react";

const grades = [
  { course: "Advanced Calculus", code: "MATH301", midterm: 92, final: 95, total: 94, letter: "A", credits: 4 },
  { course: "Data Structures", code: "CS201", midterm: 88, final: 93, total: 91, letter: "A-", credits: 3 },
  { course: "Linear Algebra", code: "MATH205", midterm: 85, final: 90, total: 88, letter: "B+", credits: 3 },
  { course: "Physics II", code: "PHYS202", midterm: 93, final: 96, total: 95, letter: "A", credits: 4 },
  { course: "Technical Writing", code: "ENG301", midterm: 96, final: 98, total: 97, letter: "A", credits: 2 },
];

function calculateGPA(grades: { letterGrade: string; credits: number }[]) {
  const points: Record<string, number> = { "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0 };
  let totalPoints = 0;
  let totalCredits = 0;
  grades.forEach((g) => {
    totalPoints += (points[g.letterGrade] || 0) * g.credits;
    totalCredits += g.credits;
  });
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
}

const letterColors: Record<string, string> = {
  "A": "text-success", "A-": "text-success", "B+": "text-warning", "B": "text-warning",
  "B-": "text-warning", "C+": "text-warning", "C": "text-warning", "C-": "text-warning",
  "D+": "text-danger", "D": "text-danger", "F": "text-danger",
};

export default function StudentGrades() {
  const gpa = calculateGPA(grades);
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Grades" description="Spring 2026 — Academic Performance" />

      <div className="grid gap-4 sm:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-surface p-6 text-center">
          <Award className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-4xl font-bold text-primary">{gpa}</p>
          <p className="text-sm text-muted mt-1">Current GPA</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-surface p-6 text-center">
          <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
          <p className="text-4xl font-bold text-success">{totalCredits}</p>
          <p className="text-sm text-muted mt-1">Total Credits</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-surface p-6 text-center">
          <p className="text-4xl font-bold text-accent">{grades.filter(g => g.letter.startsWith("A")).length}</p>
          <p className="text-sm text-muted mt-1">A Grades</p>
        </motion.div>
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">Course</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">Midterm</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">Final</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">Total</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">Grade</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">Credits</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-medium text-foreground">{grade.course}</p>
                    <p className="text-xs text-muted font-mono">{grade.code}</p>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-foreground">{grade.midterm}%</td>
                  <td className="px-4 py-4 text-center text-sm text-foreground">{grade.final}%</td>
                  <td className="px-4 py-4 text-center text-sm font-semibold text-foreground">{grade.total}%</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg font-bold ${letterColors[grade.letter] || "text-foreground"}`}>{grade.letter}</span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-muted">{grade.credits}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
