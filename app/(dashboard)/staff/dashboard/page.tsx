import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  Sparkles,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";
import { DashboardPageToast } from "@/components/dashboard/dashboard-page-toast";

export default function StaffDashboardPage() {
  return (
    <>
        <DashboardPageToast />
        <DashboardShell
        role="staff"
        title="Staff Dashboard"
        subtitle="Submit, monitor, and track official transport requests with AI-assisted insights."
        >
        <div className="space-y-6">
            {/* Top metrics */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                label="Total Requests"
                value="14"
                helper="All requests submitted by this staff user"
                icon={<ClipboardList className="h-5 w-5" />}
            />
            <StatCard
                label="Pending Approval"
                value="03"
                helper="Requests awaiting review"
                icon={<Clock3 className="h-5 w-5" />}
            />
            <StatCard
                label="Approved Requests"
                value="09"
                helper="Requests successfully approved"
                icon={<CheckCircle2 className="h-5 w-5" />}
            />
            <StatCard
                label="AI Suggestions Used"
                value="11"
                helper="Requests supported by recommendation logic"
                icon={<Sparkles className="h-5 w-5" />}
            />
            </section>

            {/* Main content area */}
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
                    <tr>
                        <td className="px-4 py-4 text-slate-700">Central Abuja</td>
                        <td className="px-4 py-4 text-slate-500">12 Jan 2026</td>
                        <td className="px-4 py-4">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                            Pending
                        </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 text-slate-700">Airport Road</td>
                        <td className="px-4 py-4 text-slate-500">10 Jan 2026</td>
                        <td className="px-4 py-4">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                            Approved
                        </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 text-slate-700">Gwarinpa</td>
                        <td className="px-4 py-4 text-slate-500">08 Jan 2026</td>
                        <td className="px-4 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            Allocated
                        </span>
                        </td>
                    </tr>
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