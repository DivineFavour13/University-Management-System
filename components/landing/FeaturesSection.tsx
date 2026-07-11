"use client";

import { motion } from "framer-motion";
import { BookOpen, ClipboardCheck, Award, FileText, Megaphone, BarChart3 } from "lucide-react";

const features = [
  { icon: <BookOpen className="h-8 w-8" />, title: "Course Management", description: "Create, organize, and manage courses across all departments with intuitive scheduling and enrollment tools." },
  { icon: <ClipboardCheck className="h-8 w-8" />, title: "Attendance Tracking", description: "Mark and monitor student attendance with automated reports, alerts, and real-time analytics." },
  { icon: <Award className="h-8 w-8" />, title: "Grade Management", description: "Streamline grading workflows with weighted calculations, gradebooks, and instant GPA computation." },
  { icon: <FileText className="h-8 w-8" />, title: "Assignment Submission", description: "Students submit assignments, faculty grade with feedback, and everything stays organized in one place." },
  { icon: <Megaphone className="h-8 w-8" />, title: "Notice Board", description: "Broadcast announcements to specific roles, departments, or the entire university community." },
  { icon: <BarChart3 className="h-8 w-8" />, title: "Reports & Analytics", description: "Generate comprehensive reports on enrollment, attendance, grades, and financials with beautiful charts." },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Everything You Need</h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">A complete suite of tools designed to streamline every aspect of university operations.</p>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative rounded-2xl border border-border bg-surface/50 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted leading-relaxed">{feature.description}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
