"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Ready to Modernize Your University?</h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">Join thousands of institutions already using UniManage to transform their academic operations.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-colors">
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="#" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground hover:bg-surface transition-colors">
              Watch Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
