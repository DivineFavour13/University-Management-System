"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, GraduationCap } from "lucide-react";

const steps = [
  { icon: <UserPlus className="h-8 w-8" />, title: "Register", description: "Create your account in seconds. Choose your role — student, faculty, or administrator." },
  { icon: <BookOpen className="h-8 w-8" />, title: "Enroll", description: "Browse courses, check prerequisites, and enroll with a single click. Advisors review and approve." },
  { icon: <GraduationCap className="h-8 w-8" />, title: "Learn", description: "Access assignments, track attendance, view grades, and stay connected with your university community." },
];

export function HowItWorks() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">Getting started is simple. Three steps to transform your university experience.</p>
        </motion.div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 hidden lg:block">
            <div className="mx-auto h-0.5 w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="grid gap-8 lg:grid-cols-3 relative">
            {steps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.2 }} className="relative text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-4 ring-background">{step.icon}</div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white lg:hidden">{index + 1}</div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
