import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function NewRequestPage() {
  return (
    <DashboardShell
      role="staff"
      title="Request Vehicle"
      subtitle="Submit a new official transport request."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Request form will be added next.
        </p>
      </div>
    </DashboardShell>
  );
}