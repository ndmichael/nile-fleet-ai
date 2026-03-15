import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";
import { BarChart3, CarFront, Clock3, Route } from "lucide-react";

export default function ReportsPage() {
  return (
    <DashboardShell
      role="admin"
      title="Reports"
      subtitle="Review transport trends, usage performance, and operational summaries."
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Trips This Month"
            value="42"
            helper="Total fleet movements recorded"
            icon={<Route className="h-5 w-5" />}
          />
          <StatCard
            label="Vehicle Utilization"
            value="78%"
            helper="Average fleet usage rate"
            icon={<CarFront className="h-5 w-5" />}
          />
          <StatCard
            label="Average Duration"
            value="1h 18m"
            helper="Average trip time this month"
            icon={<Clock3 className="h-5 w-5" />}
          />
          <StatCard
            label="AI Accuracy Snapshot"
            value="84%"
            helper="ETA estimate alignment sample"
            icon={<BarChart3 className="h-5 w-5" />}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Operational Summary
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Summary-level insight for reporting and administrative review.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Pool vehicles handled the majority of official transport requests.",
                "Most late-return incidents occurred on medium-to-long trips.",
                "AI recommendations aligned best with approved non-luxury allocations.",
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Reporting Note
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These reports are placeholders for now. Once the database is wired
              properly, this page will reflect real trip counts, utilization
              rates, delays, and AI recommendation performance.
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}