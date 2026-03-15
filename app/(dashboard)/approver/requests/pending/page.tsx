import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";

const pendingRequests = [
  {
    id: "REQ-001",
    destination: "Central Abuja",
    purpose: "Official meeting",
    date: "12 Jan 2026",
    unit: "ICT",
    status: "Pending" as const,
  },
  {
    id: "REQ-002",
    destination: "Airport Road",
    purpose: "Protocol movement",
    date: "13 Jan 2026",
    unit: "Administration",
    status: "Pending" as const,
  },
  {
    id: "REQ-003",
    destination: "Gwarinpa",
    purpose: "Logistics support",
    date: "14 Jan 2026",
    unit: "Registry",
    status: "Pending" as const,
  },
];

export default function PendingRequestsPage() {
  return (
    <DashboardShell
      role="approver"
      title="Pending Requests"
      subtitle="Review requests awaiting approval action."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Approval Queue
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a request to inspect details and make a decision.
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Request ID</th>
                <th className="px-4 py-3 font-medium">Destination</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {pendingRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-4 text-slate-700">{request.id}</td>
                  <td className="px-4 py-4 text-slate-700">
                    {request.destination}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {request.purpose}
                  </td>
                  <td className="px-4 py-4 text-slate-500">{request.unit}</td>
                  <td className="px-4 py-4 text-slate-500">{request.date}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/approver/requests/${request.id}`}
                      className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}