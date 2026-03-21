import {
  CarFront,
  ClipboardList,
  Route,
  TriangleAlert,
} from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/server";

type QueueRow = {
  id: string;
  request_code: string;
  destination: string;
};

async function getAdminDashboardData() {
  noStore();

  const supabase = await createClient();

  const { data: approvedRequests, error: approvedRequestsError } =
    await supabase.from("requests").select("id").eq("status", "approved");

  const { data: availableVehicles, error: availableVehiclesError } =
    await supabase.from("vehicles").select("id").eq("status", "available");

  const { data: activeTrips, error: activeTripsError } = await supabase
    .from("requests")
    .select("id")
    .eq("status", "in_trip");

  const { data: lateTrips, error: lateTripsError } = await supabase
    .from("trips")
    .select("id")
    .eq("late_return", true);

  const { data: queueData, error: queueError } = await supabase
    .from("requests")
    .select("id, request_code, destination")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(5);

  console.log({
    approvedRequestsError,
    availableVehiclesError,
    activeTripsError,
    lateTripsError,
    queueError,
  });

  return {
    pendingAllocation: approvedRequests?.length ?? 0,
    availableVehicles: availableVehicles?.length ?? 0,
    activeTrips: activeTrips?.length ?? 0,
    lateFlags: lateTrips?.length ?? 0,
    queue: (queueData ?? []) as QueueRow[],
  };
}

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return (
    <DashboardShell
      role="admin"
      title="Admin Dashboard"
      subtitle="Manage allocations, vehicles, drivers, and active transport operations."
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Pending Allocation"
            value={String(data.pendingAllocation)}
            helper="Approved requests awaiting vehicle assignment"
            icon={<ClipboardList className="h-5 w-5" />}
          />
          <StatCard
            label="Available Vehicles"
            value={String(data.availableVehicles)}
            helper="Vehicles currently available for assignment"
            icon={<CarFront className="h-5 w-5" />}
          />
          <StatCard
            label="Active Trips"
            value={String(data.activeTrips)}
            helper="Trips currently in progress"
            icon={<Route className="h-5 w-5" />}
          />
          <StatCard
            label="Late Return Flags"
            value={String(data.lateFlags)}
            helper="Trips flagged for delay or review"
            icon={<TriangleAlert className="h-5 w-5" />}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Allocation Queue Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick operational view of requests waiting for allocation.
            </p>

            <div className="mt-6 space-y-4">
              {data.queue.length > 0 ? (
                data.queue.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {item.request_code}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          Destination: {item.destination}
                        </p>
                      </div>

                      <StatusBadge status="Approved" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    No approved requests waiting for allocation right now.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Admin Notes
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Use policy, availability, and AI guidance together during
              allocation.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Assigned vehicles should only be released when policy permits.",
                "Pool vehicles should be prioritized for general official duty.",
                "AI vehicle recommendation is advisory, not absolute.",
                "Trips with risk flags should be monitored more closely.",
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