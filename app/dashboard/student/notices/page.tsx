"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Bell, Calendar, User } from "lucide-react";

const notices = [
  { id: "1", title: "Midterm Exam Schedule Released", content: "The midterm examination schedule for Spring 2026 has been finalized. Please review your exam dates and locations.", date: "2026-06-25", author: "Registrar Office", target: "All Students", priority: "HIGH" as const },
  { id: "2", title: "Library Hours Extended for Finals", content: "The university library will extend its operating hours until midnight during the final examination period (July 10-24).", date: "2026-06-24", author: "Library Services", target: "All Students", priority: "NORMAL" as const },
  { id: "3", title: "Summer Registration Opens Monday", content: "Registration for Summer 2026 courses opens on Monday, June 30th at 9:00 AM. Early registration is encouraged.", date: "2026-06-23", author: "Academic Affairs", target: "All Students", priority: "NORMAL" as const },
  { id: "4", title: "Campus Maintenance Notice", content: "The Science Building will be closed for maintenance on July 5-6. Alternative classrooms will be assigned.", date: "2026-06-22", author: "Facilities Management", target: "All Students", priority: "LOW" as const },
  { id: "5", title: "Scholarship Application Deadline", content: "Applications for the Fall 2026 Merit Scholarship close on July 15. Don't miss this opportunity!", date: "2026-06-20", author: "Financial Aid", target: "All Students", priority: "HIGH" as const },
];

const priorityColors = { HIGH: "danger" as const, NORMAL: "default" as const, LOW: "info" as const };

export default function StudentNotices() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notices" description="Announcements and updates from your university" />
      <div className="space-y-4">
        {notices.map((notice, i) => (
          <motion.div key={notice.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-surface p-6 hover:border-primary/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-foreground">{notice.title}</h3>
                  <StatusBadge variant={priorityColors[notice.priority]}>{notice.priority}</StatusBadge>
                </div>
                <p className="text-sm text-muted leading-relaxed">{notice.content}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{notice.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{notice.author}</span>
                  <span>{notice.target}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
