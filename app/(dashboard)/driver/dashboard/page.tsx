import { Clock3, Route, ShieldCheck, Truck } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";

export default function DriverDashboardPage() {
  return (
    <DashboardShell
      role="driver"
      title="Driver Dashboard"
      subtitle="View assigned trips, monitor trip progress, and update transport execution records."
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Assigned Trips"
            value="03"
            helper="Trips currently assigned to this driver"
            icon={<Truck className="h-5 w-5" />}
          />
          <StatCard
            label="Active Trips"
            value="01"
            helper="Trip currently in progress"
            icon={<Route className="h-5 w-5" />}
          />
          <StatCard
            label="Pending Start"
            value="01"
            helper="Trips waiting for departure"
            icon={<Clock3 className="h-5 w-5" />}
          />
          <StatCard
            label="Completed Today"
            value="02"
            helper="Trips successfully closed today"
            icon={<ShieldCheck className="h-5 w-5" />}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Current Trip Snapshot
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Operational summary of the most recent assigned trip.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    TRIP-001
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Route: Central Abuja
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Vehicle: Toyota Prado
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Departure: 09:00 AM
                  </p>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                  In Trip
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Driver Notes
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep trip records accurate and up to date.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Start the trip only when movement has actually begun.",
                "Record the trip return immediately after arrival.",
                "Delays and unusual events should be noted clearly.",
                "Trip completion updates feed the admin monitoring dashboard.",
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