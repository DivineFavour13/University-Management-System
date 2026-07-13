"use client";

import { useUser } from "@clerk/nextjs";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Mail, Phone, MapPin, CreditCard, Shield, Calendar } from "lucide-react";

export default function AdminProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
        <div className="h-96 bg-surface rounded-xl" />
        <div className="lg:col-span-2 space-y-4">
          <div className="h-48 bg-surface rounded-xl" />
          <div className="h-64 bg-surface rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "User";
  const role = (user.publicMetadata?.role as string) ?? "ADMIN";

  const infoCard = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
      <div className="text-primary mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-muted mb-0.5">{label}</p>
        <p className="text-sm font-medium text-foreground break-all">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left — Identity Card */}
      <div className="rounded-xl border border-border bg-surface p-6 flex flex-col items-center text-center gap-4">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt={fullName} className="h-24 w-24 rounded-full object-cover border-2 border-primary/30" />
        ) : (
          <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
            {initials}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-foreground font-heading">{fullName}</h2>
          <p className="text-sm text-muted mt-1">{user.primaryEmailAddress?.emailAddress}</p>
          <div className="mt-2 flex justify-center">
            <StatusBadge status={role} />
          </div>
        </div>
        <div className="w-full pt-2 border-t border-border text-xs text-muted text-left space-y-1">
          <p>Joined {new Date(user.createdAt!).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          <p>Last signed in {new Date(user.lastSignInAt!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </div>

      {/* Right — Info Panels */}
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {infoCard(<Mail className="h-4 w-4" />, "Email", user.primaryEmailAddress?.emailAddress ?? "—")}
            {infoCard(<Phone className="h-4 w-4" />, "Phone", user.primaryPhoneNumber?.phoneNumber ?? "Not provided")}
            {infoCard(<MapPin className="h-4 w-4" />, "Location", "Not provided")}
            {infoCard(<Calendar className="h-4 w-4" />, "Member Since", new Date(user.createdAt!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-4">Account Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {infoCard(<Shield className="h-4 w-4" />, "Role", role.replace(/_/g, " "))}
            {infoCard(<CreditCard className="h-4 w-4" />, "Clerk ID", user.id.slice(0, 20) + "...")}
          </div>
        </div>
      </div>
    </div>
  );
}