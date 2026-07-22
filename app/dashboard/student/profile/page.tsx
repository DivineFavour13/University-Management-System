"use client";

import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getStudentProfile } from "@/actions/students";
import {
  Mail, Phone, MapPin, GraduationCap, Building2,
  User, Calendar, Edit2, Save, X, AlertTriangle
} from "lucide-react";

type StudentProfile = {
  id: string;
  studentId: string;
  status: string;
  createdAt: Date;
  department: { name: string; code: string } | null;
  advisor: { firstName: string; lastName: string } | null;
};

export default function StudentProfilePage() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Editable fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!isLoaded || !user) return;
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setPhone(user.primaryPhoneNumber?.phoneNumber ?? "");
    getStudentProfile()
      .then((p) => setProfile(p as StudentProfile))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isLoaded, user]);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await user?.update({ firstName, lastName });
        setEditing(false);
      } catch (err) {
        console.error(err);
      }
    });
  };

  if (!isLoaded || loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-80 bg-surface rounded-xl" />
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 bg-surface rounded-xl" />
            <div className="h-64 bg-surface rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "User";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-heading">My Profile</h1>
          <p className="text-sm text-muted mt-0.5">Manage your personal information</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface transition-colors"
          >
            <Edit2 className="h-4 w-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> {isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setFirstName(user.firstName ?? "");
                setLastName(user.lastName ?? "");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-surface transition-colors"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Identity Card */}
        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col items-center text-center gap-4 h-fit">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={fullName} className="h-24 w-24 rounded-full object-cover border-2 border-primary/30" />
          ) : (
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
              {initials}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-foreground font-heading">{fullName}</h2>
            <p className="text-xs font-mono text-muted mt-1">{profile?.studentId ?? "—"}</p>
            <div className="mt-2 flex justify-center">
              <StatusBadge status={profile?.status ?? "PROVISIONAL"} />
            </div>
          </div>
          <div className="w-full pt-3 border-t border-border space-y-1.5 text-left">
            <div className="flex justify-between text-xs">
              <span className="text-muted">Member since</span>
              <span className="text-foreground">
                {profile ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted">Last sign in</span>
              <span className="text-foreground">
                {new Date(user.lastSignInAt!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted">Session</span>
              <span className="text-foreground">2025/2026</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="text-xs font-medium text-muted mb-1.5 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> First Name
                </label>
                {editing ? (
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <p className="text-sm font-medium text-foreground px-3 py-2 rounded-lg bg-background border border-border">{user.firstName || "—"}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="text-xs font-medium text-muted mb-1.5 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Last Name
                </label>
                {editing ? (
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <p className="text-sm font-medium text-foreground px-3 py-2 rounded-lg bg-background border border-border">{user.lastName || "—"}</p>
                )}
              </div>

              {/* Email — read only */}
              <div>
                <label className="text-xs font-medium text-muted mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email
                </label>
                <p className="text-sm font-medium text-foreground px-3 py-2 rounded-lg bg-background border border-border break-all">
                  {user.primaryEmailAddress?.emailAddress || "—"}
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-medium text-muted mb-1.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Phone
                </label>
                {editing ? (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 801 234 5678"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <p className="text-sm font-medium text-foreground px-3 py-2 rounded-lg bg-background border border-border">
                    {user.primaryPhoneNumber?.phoneNumber || "Not provided"}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted mb-1.5 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Location
                </label>
                {editing ? (
                  <input
                    placeholder="e.g. Lagos, Nigeria"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  <p className="text-sm font-medium text-foreground px-3 py-2 rounded-lg bg-background border border-border">
                    Not provided
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-semibold text-foreground mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <GraduationCap className="h-3.5 w-3.5" />, label: "Student ID", value: profile?.studentId ?? "—" },
                { icon: <Building2 className="h-3.5 w-3.5" />, label: "Department", value: profile?.department?.name ?? "Not assigned" },
                { icon: <GraduationCap className="h-3.5 w-3.5" />, label: "Programme", value: profile?.department ? `B.Sc. ${profile.department.name}` : "Not assigned" },
                { icon: <User className="h-3.5 w-3.5" />, label: "Academic Advisor", value: profile?.advisor ? `${profile.advisor.firstName} ${profile.advisor.lastName}` : "Not assigned" },
                { icon: <Calendar className="h-3.5 w-3.5" />, label: "Enrollment Date", value: profile ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—" },
                { icon: <Calendar className="h-3.5 w-3.5" />, label: "Session", value: "2025/2026" },
              ].map((item) => (
                <div key={item.label}>
                  <label className="text-xs font-medium text-muted mb-1.5 flex items-center gap-1.5">
                    {item.icon} {item.label}
                  </label>
                  <p className="text-sm font-medium text-foreground px-3 py-2 rounded-lg bg-background border border-border">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Banner */}
          {profile?.status === "PROVISIONAL" && (
            <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
                <div>
                  <p className="text-sm font-medium text-warning">Account is PROVISIONAL</p>
                  <p className="text-xs text-muted mt-0.5">Complete your tuition payment to activate full access.</p>
                </div>
              </div>
              <a href="/dashboard/student/fees" className="px-4 py-2 rounded-lg bg-warning text-black text-sm font-semibold hover:bg-warning/90 transition-colors shrink-0">
                Pay Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}