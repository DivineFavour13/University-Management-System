"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Users, GraduationCap, BookOpen, DollarSign, UserCheck, ClipboardList, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  { icon: <Shield className="h-6 w-6" />, title: "Admin", description: "Full system control", permissions: ["User Management", "Department Control", "System Settings", "Audit Logs", "Global Reports"] },
  { icon: <ClipboardList className="h-6 w-6" />, title: "Registrar", description: "Student records & enrollment", permissions: ["Student Registration", "Enrollment Management", "Transcript Generation", "Graduation Clearance"] },
  { icon: <Users className="h-6 w-6" />, title: "Department Head", description: "Department oversight", permissions: ["Course Management", "Faculty Assignment", "Department Reports", "Performance Analytics"] },
  { icon: <BookOpen className="h-6 w-6" />, title: "Faculty", description: "Teaching & grading", permissions: ["Attendance Marking", "Assignment Creation", "Grade Entry", "Course Materials"] },
  { icon: <UserCheck className="h-6 w-6" />, title: "Advisor", description: "Student guidance", permissions: ["Student Profiles", "Course Overrides", "Academic Planning", "GPA Monitoring"] },
  { icon: <DollarSign className="h-6 w-6" />, title: "Bursar", description: "Financial management", permissions: ["Invoice Management", "Payment Processing", "Financial Holds", "Revenue Reports"] },
  { icon: <GraduationCap className="h-6 w-6" />, title: "Student", description: "Learning & progress", permissions: ["Course Enrollment", "Assignment Submission", "Grade Viewing", "Fee Payment"] },
  { icon: <Award className="h-6 w-6" />, title: "Alumni", description: "Graduate access", permissions: ["Transcript Requests", "Profile Updates", "Event Access", "Network Directory"] },
];

export function RolesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="roles" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Built for Every Role</h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">Tailored dashboards and permissions for every member of your university community.</p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative rounded-2xl border border-border bg-surface/50 p-6 transition-all hover:border-primary/30 hover:bg-surface cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">{role.icon}</div>
              <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm text-muted mt-1">{role.description}</p>
              <div className={cn("mt-4 space-y-1.5 overflow-hidden transition-all duration-300", hoveredIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                {role.permissions.map((perm, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    {perm}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
