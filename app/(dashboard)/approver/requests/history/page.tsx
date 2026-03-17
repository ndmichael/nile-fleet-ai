import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/server";
import {
  getRequestInfo,
  type RequestRelation,
} from "@/lib/data/approval-helpers";

type ApprovalHistoryRow = {
  id: string;
  decision: "approved" | "rejected";
  decided_at: string;
  request: RequestRelation;
};

export default async function ApprovalHistoryPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("approvals")
    .select(`
      id,
      decision,
      decided_at,
      request:requests(request_code, destination)
    `)
    .order("decided_at", { ascending: false });

  const approvals = (data ?? []) as ApprovalHistoryRow[];

  return (
    <DashboardShell
      role="approver"
      title="Approval History"
      subtitle="Review previously processed requests."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-slate-950">
          Processed Requests
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          A historical view of requests that have already been reviewed.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Request Code</th>
                <th className="px-4 py-3 font-medium">Destination</th>
                <th className="px-4 py-3 font-medium">Decision</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {approvals.length > 0 ? (
                approvals.map((approval) => {
                  const requestInfo = getRequestInfo(approval.request);

                  return (
                    <tr key={approval.id}>
                      <td className="px-4 py-4 text-slate-700">
                        {requestInfo.request_code}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {requestInfo.destination}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge
                          status={
                            approval.decision === "approved"
                              ? "Approved"
                              : "Rejected"
                          }
                        />
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {new Date(approval.decided_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No approval history found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}