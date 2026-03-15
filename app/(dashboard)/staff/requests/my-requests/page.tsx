import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function MyRequestsPage() {
  return (
    <DashboardShell
      role="staff"
      title="My Requests"
      subtitle="Track all requests submitted by this staff user."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Request listing page will be added next.
        </p>
      </div>
    </DashboardShell>
  );
}