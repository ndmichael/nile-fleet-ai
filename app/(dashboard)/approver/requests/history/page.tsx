import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";

const historyRows = [
  {
    id: "REQ-011",
    destination: "Airport Road",
    decision: "Approved" as const,
    date: "10 Jan 2026",
  },
  {
    id: "REQ-010",
    destination: "Central Abuja",
    decision: "Rejected" as const,
    date: "09 Jan 2026",
  },
  {
    id: "REQ-009",
    destination: "Gwarinpa",
    decision: "Approved" as const,
    date: "08 Jan 2026",
  },
];

export default function ApprovalHistoryPage() {
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
                <th className="px-4 py-3 font-medium">Request ID</th>
                <th className="px-4 py-3 font-medium">Destination</th>
                <th className="px-4 py-3 font-medium">Decision</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {historyRows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-4 text-slate-700">{row.id}</td>
                  <td className="px-4 py-4 text-slate-700">
                    {row.destination}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={row.decision} />
                  </td>
                  <td className="px-4 py-4 text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}