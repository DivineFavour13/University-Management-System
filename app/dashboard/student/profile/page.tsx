"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Mail, Phone, MapPin, Building2, GraduationCap, User, Calendar, CreditCard } from "lucide-react";
import { getStudentProfile } from "@/actions/students";

type StudentProfile = {
  id: string;
  studentId: string;
  status: string;
  departmentId: string | null;
  advisorId: string | null;
  createdAt: Date;
  department: { name: string; code: string } | null;
  advisor: { firstName: string; lastName: string } | null;
};

export default function StudentProfilePage() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;
    getStudentProfile()
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
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

  const infoCard = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
      <div className="text-primary mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-muted mb-0.5">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
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
          <p className="text-sm font-mono text-muted mt-1">{profile?.studentId ?? "—"}</p>
          <div className="mt-2 flex justify-center">
            <StatusBadge status={profile?.status ?? "PROVISIONAL"} />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-3 mt-2">
          <div className="p-3 rounded-lg bg-background border border-border text-center">
            <p className="text-xs text-muted mb-1">GPA</p>
            <p className="text-2xl font-bold text-primary">—</p>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border text-center">
            <p className="text-xs text-muted mb-1">Credits</p>
            <p className="text-2xl font-bold text-primary">0</p>
          </div>
        </div>
        <div className="w-full pt-2 border-t border-border text-xs text-muted text-left">
          <p>Member since {profile ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—"}</p>
        </div>
      </div>

      {/* Right — Info Panels */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Information */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {infoCard(<Mail className="h-4 w-4" />, "Email", user.primaryEmailAddress?.emailAddress ?? "—")}
            {infoCard(<Phone className="h-4 w-4" />, "Phone", user.primaryPhoneNumber?.phoneNumber ?? "Not provided")}
            {infoCard(<MapPin className="h-4 w-4" />, "Location", "Not provided")}
            {infoCard(<CreditCard className="h-4 w-4" />, "Clerk ID", user.id.slice(0, 16) + "...")}
          </div>
        </div>

        {/* Academic Information */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground mb-4">Academic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {infoCard(
              <Building2 className="h-4 w-4" />,
              "Department",
              profile?.department?.name ?? "Not assigned"
            )}
            {infoCard(
              <GraduationCap className="h-4 w-4" />,
              "Programme",
              profile?.department ? `B.Sc. ${profile.department.name}` : "Not assigned"
            )}
            {infoCard(
              <User className="h-4 w-4" />,
              "Academic Advisor",
              profile?.advisor
                ? `${profile.advisor.firstName} ${profile.advisor.lastName}`
                : "Not assigned"
            )}
            {infoCard(
              <Calendar className="h-4 w-4" />,
              "Enrollment Date",
              profile ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric"
              }) : "—"
            )}
          </div>
        </div>

        {/* Status Banner */}
        {profile?.status === "PROVISIONAL" && (
          <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warning">Account is PROVISIONAL</p>
              <p className="text-xs text-muted mt-0.5">Complete your tuition payment to activate full access.</p>
            </div>
            <a href="/dashboard/student/fees" className="px-4 py-2 rounded-lg bg-warning text-black text-sm font-semibold hover:bg-warning/90 transition-colors">
              Pay Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
