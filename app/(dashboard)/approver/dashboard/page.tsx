import {
  CheckCircle2,
  Clock3,
  FileBarChart2,
  XCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";

export default function ApproverDashboardPage() {
  return (
    <DashboardShell
      role="approver"
      title="Approver Dashboard"
      subtitle="Review transport requests and make fast, informed approval decisions."
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Pending Requests"
            value="08"
            helper="Awaiting your review"
            icon={<Clock3 className="h-5 w-5" />}
          />
          <StatCard
            label="Approved Today"
            value="05"
            helper="Requests approved recently"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <StatCard
            label="Rejected Today"
            value="01"
            helper="Requests declined recently"
            icon={<XCircle className="h-5 w-5" />}
          />
          <StatCard
            label="Reviewed This Week"
            value="19"
            helper="Total processed requests"
            icon={<FileBarChart2 className="h-5 w-5" />}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Approval Queue Snapshot
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick view of requests currently waiting for action.
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  destination: "Central Abuja",
                  purpose: "Official meeting",
                  unit: "ICT",
                },
                {
                  destination: "Airport Road",
                  purpose: "Protocol movement",
                  unit: "Administration",
                },
                {
                  destination: "Gwarinpa",
                  purpose: "Logistics support",
                  unit: "Registry",
                },
              ].map((item) => (
                <div
                  key={`${item.destination}-${item.unit}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.destination}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.purpose}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Requesting unit: {item.unit}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Review Guidance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Consistent approval improves allocation speed and transparency.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Confirm the request is clearly official and complete.",
                "Check destination, timing, and passenger count carefully.",
                "Use the AI insights as support, not as the final authority.",
                "Reject incomplete or unclear requests with a brief reason.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}