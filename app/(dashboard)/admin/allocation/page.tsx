import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AIInsightsCard } from "@/components/ai/ai-insights-card";
import { StatusBadge } from "@/components/shared/status-badge";

const allocationRows = [
  {
    id: "REQ-021",
    destination: "Central Abuja",
    unit: "ICT",
    passengers: 4,
    aiVehicle: "Standard SUV",
  },
  {
    id: "REQ-022",
    destination: "Airport Road",
    unit: "Administration",
    passengers: 2,
    aiVehicle: "Executive Sedan",
  },
  {
    id: "REQ-023",
    destination: "Gwarinpa",
    unit: "Registry",
    passengers: 8,
    aiVehicle: "Mini Bus",
  },
];

export default function AllocationBoardPage() {
  return (
    <DashboardShell
      role="admin"
      title="Allocation Board"
      subtitle="Assign vehicles and drivers to approved transport requests."
    >
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                Approved Requests Awaiting Allocation
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review request details, assign vehicles, and attach drivers.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {allocationRows.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-slate-900">
                        {row.id}
                      </p>
                      <StatusBadge status="Approved" />
                    </div>

                    <p className="mt-3 text-sm text-slate-700">
                      Destination: {row.destination}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Unit: {row.unit}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Passengers: {row.passengers}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      AI recommendation: {row.aiVehicle}
                    </p>
                  </div>

                  <div className="grid min-w-\[260px\] gap-3">
                    <select className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
                      <option>Select vehicle</option>
                      <option>Toyota Prado - Pool</option>
                      <option>Honda Accord - Assigned</option>
                      <option>Toyota Hiace - Pool</option>
                    </select>

                    <select className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
                      <option>Select driver</option>
                      <option>Driver A</option>
                      <option>Driver B</option>
                      <option>Driver C</option>
                    </select>

                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                    >
                      Confirm Allocation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <AIInsightsCard
            estimatedDuration="1h 30m"
            recommendedVehicle="Standard SUV"
            riskLevel="Low"
            note="Suggested allocation is based on distance, passenger count, and trip classification. Confirm policy fit before final assignment."
          />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Allocation Reminder
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Pool vehicles should generally serve shared official trips, while
              assigned vehicles should only be used under approved exceptions.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}