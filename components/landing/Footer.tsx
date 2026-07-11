"use client";

import Link from "next/link";
import { GraduationCap, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading text-lg font-bold text-foreground">UniManage</span>
            </Link>
            <p className="text-sm text-muted">The modern university management system built for the future of education.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Integrations", "Changelog"].map((item) => (
                <li key={item}><Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "API Reference", "Support", "Status"].map((item) => (
                <li key={item}><Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex gap-3">
              <Link href="#" className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">© 2026 UniManage. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="text-sm text-muted hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
