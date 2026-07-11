"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  // Support both APIs
  trend?: "up" | "down" | "neutral" | { value: number; label: string };
  trendValue?: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StatsCard({ title, value, description, trend, trendValue, icon, className, delay = 0 }: StatsCardProps) {
  // Normalize trend to a consistent shape
  let trendDir: "up" | "down" | "neutral" | null = null;
  let trendLabel: string | null = null;

  if (trend) {
    if (typeof trend === "object") {
      trendDir = trend.value > 0 ? "up" : trend.value < 0 ? "down" : "neutral";
      trendLabel = `${trend.value > 0 ? "+" : ""}${trend.value} ${trend.label}`;
    } else {
      trendDir = trend;
      trendLabel = trendValue ?? null;
    }
  }

  const trendIcons = {
    up: <TrendingUp className="h-4 w-4 text-success" />,
    down: <TrendingDown className="h-4 w-4 text-danger" />,
    neutral: <Minus className="h-4 w-4 text-muted" />,
  };

  const trendColors = {
    up: "text-success",
    down: "text-danger",
    neutral: "text-muted",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("relative overflow-hidden rounded-xl border border-border bg-surface p-6", className)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && <p className="text-xs text-muted">{description}</p>}
          {trendDir && trendLabel && (
            <div className="flex items-center gap-1.5">
              {trendIcons[trendDir]}
              <span className={cn("text-sm font-medium", trendColors[trendDir])}>{trendLabel}</span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/5" />
    </motion.div>
  );
}
