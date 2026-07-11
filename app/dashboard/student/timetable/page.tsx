"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { cn } from "@/lib/utils";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const schedule = [
  { day: "Monday", time: "10:00 AM", course: "Advanced Calculus", code: "MATH301", room: "Room 301", color: "bg-blue-500/20 border-blue-500/30 text-blue-400" },
  { day: "Monday", time: "1:00 PM", course: "Linear Algebra", code: "MATH205", room: "Room 205", color: "bg-purple-500/20 border-purple-500/30 text-purple-400" },
  { day: "Tuesday", time: "9:00 AM", course: "Physics II", code: "PHYS202", room: "Lab B", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" },
  { day: "Tuesday", time: "2:00 PM", course: "Data Structures", code: "CS201", room: "Lab 4", color: "bg-amber-500/20 border-amber-500/30 text-amber-400" },
  { day: "Wednesday", time: "10:00 AM", course: "Advanced Calculus", code: "MATH301", room: "Room 301", color: "bg-blue-500/20 border-blue-500/30 text-blue-400" },
  { day: "Wednesday", time: "1:00 PM", course: "Linear Algebra", code: "MATH205", room: "Room 205", color: "bg-purple-500/20 border-purple-500/30 text-purple-400" },
  { day: "Thursday", time: "9:00 AM", course: "Physics II", code: "PHYS202", room: "Lab B", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" },
  { day: "Thursday", time: "2:00 PM", course: "Data Structures", code: "CS201", room: "Lab 4", color: "bg-amber-500/20 border-amber-500/30 text-amber-400" },
  { day: "Friday", time: "10:00 AM", course: "Technical Writing", code: "ENG301", room: "Room 102", color: "bg-rose-500/20 border-rose-500/30 text-rose-400" },
];

export default function StudentTimetable() {
  return (
    <div className="space-y-6">
      <PageHeader title="Timetable" description="Spring 2026 — Weekly Schedule" />
      <div className="rounded-xl border border-border bg-surface overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 border-b border-border">
            <div className="p-3 text-xs font-semibold text-muted uppercase tracking-wider">Time</div>
            {days.map((day) => <div key={day} className="p-3 text-xs font-semibold text-muted uppercase tracking-wider text-center">{day}</div>)}
          </div>
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-6 border-b border-border last:border-0">
              <div className="p-3 text-sm text-muted border-r border-border">{time}</div>
              {days.map((day) => {
                const item = schedule.find((s) => s.day === day && s.time === time);
                return (
                  <div key={`${day}-${time}`} className="p-2 border-r border-border last:border-0 min-h-[80px]">
                    {item && (
                      <div className={cn("rounded-lg border p-2 text-xs", item.color)}>
                        <p className="font-semibold">{item.course}</p>
                        <p className="opacity-80 mt-0.5">{item.code}</p>
                        <p className="opacity-60 mt-0.5">{item.room}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
