import { DashboardPageToast } from "@/components/dashboard/dashboard-page-toast";
import {
  CarFront,
  ClipboardList,
  Route,
  TriangleAlert,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";

export default function AdminDashboardPage() {
  return (
    <>
        <DashboardPageToast />
        <DashboardShell
            role="admin"
            title="Admin Dashboard"
            subtitle="Manage allocations, vehicles, drivers, and active transport operations."
        >
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                label="Pending Allocation"
                value="06"
                helper="Approved requests awaiting vehicle assignment"
                icon={<ClipboardList className="h-5 w-5" />}
            />
            <StatCard
                label="Available Vehicles"
                value="18"
                helper="Vehicles currently available for assignment"
                icon={<CarFront className="h-5 w-5" />}
            />
            <StatCard
                label="Active Trips"
                value="04"
                helper="Trips currently in progress"
                icon={<Route className="h-5 w-5" />}
            />
            <StatCard
                label="Late Return Flags"
                value="02"
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
                {[
                    {
                    id: "REQ-021",
                    destination: "Central Abuja",
                    vehicle: "Standard SUV",
                    },
                    {
                    id: "REQ-022",
                    destination: "Airport Road",
                    vehicle: "Executive Sedan",
                    },
                    {
                    id: "REQ-023",
                    destination: "Gwarinpa",
                    vehicle: "Mini Bus",
                    },
                ].map((item) => (
                    <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                        <p className="text-sm font-semibold text-slate-900">
                            {item.id}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                            Destination: {item.destination}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            AI suggestion: {item.vehicle}
                        </p>
                        </div>

                        <StatusBadge status="Approved" />
                    </div>
                    </div>
                ))}
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
    </>
  );
}