"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "outline";

interface StatusBadgeProps {
  status?: string;
  children?: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  outline: "bg-transparent text-muted border-border",
};

const statusVariantMap: Record<string, BadgeVariant> = {
  // Student lifecycle
  ACTIVE: "success",
  PROVISIONAL: "warning",
  SUSPENDED: "danger",
  ALUMNI: "info",
  // Generic
  INACTIVE: "outline",
  PENDING: "warning",
  COMPLETED: "success",
  FAILED: "danger",
  REFUNDED: "info",
  // Roles
  ADMIN: "default",
  SUPER_ADMIN: "default",
  FACULTY: "info",
  STUDENT: "success",
  REGISTRAR: "warning",
  DEPARTMENT_HEAD: "info",
  ADVISOR: "info",
  BURSAR: "warning",
  // Semesters
  FALL: "default",
  SPRING: "success",
  SUMMER: "warning",
  // Attendance
  PRESENT: "success",
  ABSENT: "danger",
  LATE: "warning",
  EXCUSED: "info",
  // Assignment
  SUBMITTED: "success",
  GRADED: "info",
  OVERDUE: "danger",
  // Generic targets
  HIGH: "danger",
  MEDIUM: "warning",
  LOW: "success",
};

export function StatusBadge({ status, children, variant, className }: StatusBadgeProps) {
  const resolvedVariant = variant ?? (status ? statusVariantMap[status] ?? "default" : "default");
  const label = children ?? (status ? status.replace(/_/g, " ") : "");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[resolvedVariant],
        className
      )}
    >
      {label}
    </span>
  );
}
