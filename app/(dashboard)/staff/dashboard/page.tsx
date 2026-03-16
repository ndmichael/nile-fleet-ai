import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  Sparkles,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";
import { DashboardPageToast } from "@/components/dashboard/dashboard-page-toast";
import { getStaffDashboardData } from "@/lib/data/get-staff-dashboard-data";
import { StatusBadge } from "@/components/shared/status-badge";

export default async function StaffDashboardPage() {
  const dashboardData = await getStaffDashboardData();

  return (
    <>
      <DashboardPageToast />

      <DashboardShell
        role="staff"
        title="Staff Dashboard"
        subtitle="Submit, monitor, and track official transport requests with AI-assisted insights."
      >
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Requests"
              value={String(dashboardData.totalRequests)}
              helper="All requests submitted by this staff user"
              icon={<ClipboardList className="h-5 w-5" />}
            />
            <StatCard
              label="Pending Approval"
              value={String(dashboardData.pendingRequests)}
              helper="Requests awaiting review"
              icon={<Clock3 className="h-5 w-5" />}
            />
            <StatCard
              label="Approved Requests"
              value={String(dashboardData.approvedRequests)}
              helper="Requests successfully approved"
              icon={<CheckCircle2 className="h-5 w-5" />}
            />
            <StatCard
              label="AI Suggestions Used"
              value={String(dashboardData.aiSuggestionsUsed)}
              helper="Requests supported by recommendation logic"
              icon={<Sparkles className="h-5 w-5" />}
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                    Recent Requests
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    A quick view of your latest vehicle request activity.
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr className="text-sm text-slate-500">
                      <th className="px-4 py-3 font-medium">Destination</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-sm">
                    {dashboardData.recentRequests.length > 0 ? (
                      dashboardData.recentRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-4 py-4 text-slate-700">
                            {request.destination}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {request.createdAt}
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status={request.status} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-10 text-center text-sm text-slate-500"
                        >
                          No recent requests found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  AI Insights
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Sample recommendation preview based on recent request patterns.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Estimated Duration
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                      1h 20m
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Suggested return window for a medium-distance official trip
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Recommended Vehicle
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                      Standard SUV
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Based on passenger count, route class, and trip purpose
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Quick Note
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Assigned vehicles and pool vehicles will be handled differently
                  during allocation. Final allocation is still subject to approval,
                  availability, and transport policy rules.
                </p>
              </div>
            </div>
          </section>
        </div>
      </DashboardShell>
    </>
  );
}