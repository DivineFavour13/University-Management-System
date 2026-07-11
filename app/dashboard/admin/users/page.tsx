"use client";
import { useState, useEffect, useTransition } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Users, UserCheck, UserX, Search } from "lucide-react";
import { getUsers, getUserStats, updateUserRole, suspendStudent, activateStudent } from "@/actions/users";
import type { UserRole } from "@/types";

type DBUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  studentProfile: { status: string; studentId: string } | null;
  facultyProfile: { facultyId: string } | null;
};

type Stats = { total: number; active: number; suspended: number };

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [users, setUsers] = useState<DBUser[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, suspended: 0 });
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    try {
      const [usersData, statsData] = await Promise.all([getUsers(), getUserStats()]);
      setUsers(usersData as DBUser[]);
      setStats(statsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const filtered = users.filter((u) => {
    const name = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId: string, role: UserRole) => {
    startTransition(async () => {
      await updateUserRole(userId, role);
      await loadData();
    });
  };

  const handleSuspend = (userId: string, currentStatus: string) => {
    startTransition(async () => {
      if (currentStatus === "SUSPENDED") {
        await activateStudent(userId);
      } else {
        await suspendStudent(userId);
      }
      await loadData();
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-64 bg-surface rounded animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-surface rounded-xl animate-pulse" />)}
        </div>
        <div className="h-96 bg-surface rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Management"
        description="Manage all users across the university system"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard title="Total Users" value={stats.total} icon={<Users className="h-5 w-5" />} trend={{ value: 0, label: "total registered" }} />
        <StatsCard title="Active Students" value={stats.active} icon={<UserCheck className="h-5 w-5" />} trend={{ value: 0, label: "paid & active" }} />
        <StatsCard title="Suspended" value={stats.suspended} icon={<UserX className="h-5 w-5" />} trend={{ value: 0, label: "on hold" }} />
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
          <option value="REGISTRAR">Registrar</option>
          <option value="DEPARTMENT_HEAD">Dept Head</option>
          <option value="BURSAR">Bursar</option>
          <option value="ADVISOR">Advisor</option>
        </select>
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-background/50">
          <p className="text-sm text-muted">{filtered.length} user{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/50">
            <tr>
              {["Name", "Email", "Role", "Status", "Student ID", "Joined", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted">No users found</td>
              </tr>
            ) : filtered.map((user) => (
              <tr key={user.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 text-muted">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                    disabled={isPending}
                    className="text-xs bg-primary/10 text-primary border border-primary/20 rounded px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    {["STUDENT","FACULTY","ADMIN","REGISTRAR","DEPARTMENT_HEAD","ADVISOR","BURSAR","SUPER_ADMIN"].map(r => (
                      <option key={r} value={r}>{r.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.studentProfile?.status ?? "ACTIVE"} />
                </td>
                <td className="px-6 py-4 font-mono text-xs text-muted">
                  {user.studentProfile?.studentId ?? user.facultyProfile?.facultyId ?? "—"}
                </td>
                <td className="px-6 py-4 text-muted">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {user.studentProfile && (
                    <button
                      onClick={() => handleSuspend(user.id, user.studentProfile!.status)}
                      disabled={isPending}
                      className={`text-xs hover:underline ${user.studentProfile.status === "SUSPENDED" ? "text-success" : "text-danger"}`}
                    >
                      {user.studentProfile.status === "SUSPENDED" ? "Activate" : "Suspend"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
