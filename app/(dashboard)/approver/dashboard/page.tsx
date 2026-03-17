import {
  CheckCircle2,
  Clock3,
  FileBarChart2,
  XCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/server";
import { getUnitName, type UnitRelation } from "@/lib/data/approval-helpers";

type PendingQueueRow = {
  id: string;
  request_code: string;
  destination: string;
  purpose: string;
  unit: UnitRelation;
};

type ApprovalStats = {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  reviewedCount: number;
};

async function getApproverDashboardData(): Promise<{
  stats: ApprovalStats;
  pendingQueue: PendingQueueRow[];
}> {
  const supabase = await createClient();

  const { count: pendingCount } = await supabase
    .from("requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: approvedCount } = await supabase
    .from("approvals")
    .select("*", { count: "exact", head: true })
    .eq("decision", "approved");

  const { count: rejectedCount } = await supabase
    .from("approvals")
    .select("*", { count: "exact", head: true })
    .eq("decision", "rejected");

  const { count: reviewedCount } = await supabase
    .from("approvals")
    .select("*", { count: "exact", head: true });

  const { data: queueData } = await supabase
    .from("requests")
    .select(`
      id,
      request_code,
      destination,
      purpose,
      unit:units(name)
    `)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    stats: {
      pendingCount: pendingCount ?? 0,
      approvedCount: approvedCount ?? 0,
      rejectedCount: rejectedCount ?? 0,
      reviewedCount: reviewedCount ?? 0,
    },
    pendingQueue: (queueData ?? []) as PendingQueueRow[],
  };
}

export default async function ApproverDashboardPage() {
  const { stats, pendingQueue } = await getApproverDashboardData();

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
            value={String(stats.pendingCount)}
            helper="Awaiting your review"
            icon={<Clock3 className="h-5 w-5" />}
          />
          <StatCard
            label="Approved Requests"
            value={String(stats.approvedCount)}
            helper="Requests approved so far"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <StatCard
            label="Rejected Requests"
            value={String(stats.rejectedCount)}
            helper="Requests declined so far"
            icon={<XCircle className="h-5 w-5" />}
          />
          <StatCard
            label="Reviewed Total"
            value={String(stats.reviewedCount)}
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
              {pendingQueue.length > 0 ? (
                pendingQueue.map((item) => (
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
                          {item.destination}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {item.purpose}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Requesting unit: {getUnitName(item.unit)}
                        </p>
                      </div>

                      <StatusBadge status="Pending" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    No pending requests at the moment.
                  </p>
                </div>
              )}
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