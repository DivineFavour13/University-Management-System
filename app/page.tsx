"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/Navbar";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { RolesSection } from "@/components/landing/RolesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

// Dynamically import HeroScene to avoid SSR issues with Three.js
const HeroScene = dynamic(
  () => import("@/components/landing/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-background" /> }
);

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now in Public Beta
            </motion.div>
            <h1 className="font-heading text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl leading-tight">
              The Modern University,{" "}
              <span className="text-primary">Fully Managed.</span>
            </h1>
            <p className="mt-6 text-xl text-muted max-w-xl leading-relaxed">
              Streamline every aspect of your institution — from enrollment to graduation — with one powerful platform built for the future of education.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-surface transition-colors">
                <Play className="h-4 w-4 text-primary" /> Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorks />
      <RolesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
