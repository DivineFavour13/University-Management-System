"use client";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Settings, Save } from "lucide-react";

export default function SettingsPage() {
  const [academicYear, setAcademicYear] = useState("2024/2025");
  const [currentSemester, setCurrentSemester] = useState("FALL");
  const [regStart, setRegStart] = useState("2024-08-01");
  const [regEnd, setRegEnd] = useState("2024-09-15");

  return (
    <div className="space-y-8">
      <PageHeader title="System Settings" description="Configure academic year, semester dates, and system-wide settings" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">Academic Configuration</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Academic Year</label>
            <input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Current Semester</label>
            <select value={currentSemester} onChange={(e) => setCurrentSemester(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="FALL">Fall</option>
              <option value="SPRING">Spring</option>
              <option value="SUMMER">Summer</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Registration Start</label>
              <input type="date" value={regStart} onChange={(e) => setRegStart(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Registration End</label>
              <input type="date" value={regEnd} onChange={(e) => setRegEnd(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
          <h3 className="font-semibold text-foreground mb-2">System Toggles</h3>
          {[
            { label: "Allow New Registrations", desc: "Students can create new accounts", default: true },
            { label: "Course Enrollment Open", desc: "Students can enroll in courses", default: true },
            { label: "Grade Portal Active", desc: "Students can view published grades", default: true },
            { label: "Maintenance Mode", desc: "Only admins can access the system", default: false },
          ].map((toggle) => (
            <div key={toggle.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{toggle.label}</p>
                <p className="text-xs text-muted">{toggle.desc}</p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggle.default ? "bg-primary" : "bg-border"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggle.default ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
