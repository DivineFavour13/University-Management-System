"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { createCheckoutSession, getPaymentHistory } from "@/actions/payments";
import { getStudentProfile } from "@/actions/students";
import { CreditCard, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

type Payment = {
  id: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  semester: string;
  academicYear: string;
  description: string | null;
  createdAt: Date;
};

type StudentProfile = {
  status: string;
  studentId: string;
} | null;

export default function FeesPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");

  const [payments, setPayments] = useState<Payment[]>([]);
  const [profile, setProfile] = useState<StudentProfile>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    Promise.all([getPaymentHistory(), getStudentProfile()])
      .then(([p, s]) => {
        setPayments(p as Payment[]);
        setProfile(s as StudentProfile);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePayNow = async () => {
    setPaying(true);
    try {
      await createCheckoutSession();
    } catch (err) {
      console.error(err);
      setPaying(false);
    }
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);

  const statusIcon: Record<string, React.ReactNode> = {
    COMPLETED: <CheckCircle className="h-4 w-4 text-success" />,
    PENDING: <Clock className="h-4 w-4 text-warning" />,
    FAILED: <XCircle className="h-4 w-4 text-danger" />,
    REFUNDED: <AlertTriangle className="h-4 w-4 text-muted" />,
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-surface rounded" />
        <div className="h-48 bg-surface rounded-xl" />
        <div className="h-64 bg-surface rounded-xl" />
      </div>
    );
  }

  const isActive = profile?.status === "ACTIVE";
  const isProvisional = profile?.status === "PROVISIONAL";

  return (
    <div className="space-y-8">
      <PageHeader title="Fees & Payments" description="Manage your tuition payments and view payment history" />

      {/* Success / Cancel banners */}
      {success && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-success/30 bg-success/10">
          <CheckCircle className="h-5 w-5 text-success shrink-0" />
          <div>
            <p className="font-semibold text-success">Payment Successful!</p>
            <p className="text-sm text-muted">Your account is now active. Welcome to UniManage!</p>
          </div>
        </div>
      )}
      {cancelled && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-warning/30 bg-warning/10">
          <XCircle className="h-5 w-5 text-warning shrink-0" />
          <p className="text-sm text-warning">Payment was cancelled. You can try again below.</p>
        </div>
      )}

      {/* Current Invoice */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground">Current Semester Invoice</h3>
            <p className="text-sm text-muted mt-0.5">Fall 2025/2026 Tuition Fee</p>
          </div>
          <StatusBadge status={profile?.status ?? "PROVISIONAL"} />
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-muted text-sm">Tuition Fee</span>
            <span className="font-medium text-foreground">₦500,000.00</span>
          </div>
          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-muted text-sm">Semester</span>
            <span className="font-medium text-foreground">Fall 2025/2026</span>
          </div>
          <div className="flex justify-between py-3 border-b border-border">
            <span className="text-muted text-sm">Student ID</span>
            <span className="font-mono text-sm text-foreground">{profile?.studentId ?? "—"}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-semibold text-foreground">Total Due</span>
            <span className="font-bold text-xl text-foreground">₦500,000.00</span>
          </div>
        </div>

        {isActive ? (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
            <CheckCircle className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-success">Tuition paid — Account is fully active</p>
          </div>
        ) : isProvisional ? (
          <button
            onClick={handlePayNow}
            disabled={paying}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-black font-semibold hover:bg-accent/90 transition-colors disabled:opacity-60"
          >
            <CreditCard className="h-4 w-4" />
            {paying ? "Redirecting to Stripe..." : "Pay Now — ₦500,000"}
          </button>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-danger/10 border border-danger/20">
            <AlertTriangle className="h-5 w-5 text-danger" />
            <p className="text-sm text-danger">Account suspended — contact the Bursar's office</p>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Payment History</h3>
        </div>
        {payments.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted text-sm">No payment records yet</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-background/50">
              <tr>
                {["Date", "Description", "Amount", "Type", "Status"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 text-muted">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-foreground">{p.description ?? `${p.type} — ${p.academicYear}`}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{formatAmount(p.amount)}</td>
                  <td className="px-6 py-4"><StatusBadge status={p.type} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {statusIcon[p.status]}
                      <StatusBadge status={p.status} />
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
