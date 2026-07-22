"use client";

import { useEffect, useState, useTransition } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { Building2, Users, BookOpen, Plus, X } from "lucide-react";
import { getDepartments, createDepartment, deleteDepartment } from "@/actions/admin";

type Department = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  head: { firstName: string; lastName: string } | null;
  _count: { courses: number; studentProfiles: number; facultyProfiles: number };
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data as Department[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = () => {
    if (!name || !code) return;
    startTransition(async () => {
      await createDepartment({ name, code: code.toUpperCase(), description });
      setName("");
      setCode("");
      setDescription("");
      setShowForm(false);
      await loadData();
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteDepartment(id);
      await loadData();
    });
  };

  const totalFaculty = departments.reduce((a, d) => a + d._count.facultyProfiles, 0);
  const totalCourses = departments.reduce((a, d) => a + d._count.courses, 0);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-surface rounded" />
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-surface rounded-xl" />)}
        </div>
        <div className="h-64 bg-surface rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Departments"
        description="Manage university departments and their heads"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Department
          </button>
        }
      />

      {/* Create Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 space-y-4 mx-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Add Department</h3>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Department Name *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Code *</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. CS"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description..."
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCreate}
                disabled={isPending || !name || !code}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isPending ? "Creating..." : "Create Department"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-background transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard title="Total Departments" value={departments.length} icon={<Building2 className="h-5 w-5" />} trend={{ value: 0, label: "in database" }} />
        <StatsCard title="Total Faculty" value={totalFaculty} icon={<Users className="h-5 w-5" />} trend={{ value: 0, label: "in database" }} />
        <StatsCard title="Total Courses" value={totalCourses} icon={<BookOpen className="h-5 w-5" />} trend={{ value: 0, label: "in database" }} />
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        {departments.length === 0 ? (
          <div className="py-16 text-center text-muted text-sm">
            No departments yet. Click "Add Department" to create one.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-background/50">
              <tr>
                {["Department", "Code", "Head", "Faculty", "Students", "Courses", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{dept.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-mono bg-primary/10 text-primary">{dept.code}</span>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {dept.head ? `${dept.head.firstName} ${dept.head.lastName}` : "Not assigned"}
                  </td>
                  <td className="px-6 py-4 text-muted">{dept._count.facultyProfiles}</td>
                  <td className="px-6 py-4 text-muted">{dept._count.studentProfiles}</td>
                  <td className="px-6 py-4 text-muted">{dept._count.courses}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-primary hover:underline">Edit</button>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        disabled={isPending}
                        className="text-xs text-danger hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}