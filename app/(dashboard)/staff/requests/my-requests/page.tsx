import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { getCurrentProfile } from "@/lib/data/get-current-profile";
import { createClient } from "@/lib/supabase/server";

export default async function MyRequestsPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  let requests: Array<{
    id: string;
    request_code: string;
    destination: string;
    purpose: string;
    created_at: string;
    status: "Pending" | "Approved" | "Rejected" | "Allocated" | "In Trip" | "Completed";
  }> = [];

  if (profile) {
    const { data } = await supabase
      .from("requests")
      .select("id, request_code, destination, purpose, created_at, status")
      .eq("staff_profile_id", profile.id)
      .order("created_at", { ascending: false });

    requests =
      data?.map((row) => ({
        id: row.id,
        request_code: row.request_code,
        destination: row.destination,
        purpose: row.purpose,
        created_at: new Date(row.created_at).toLocaleDateString(),
        status:
          row.status === "pending"
            ? "Pending"
            : row.status === "approved"
            ? "Approved"
            : row.status === "rejected"
            ? "Rejected"
            : row.status === "allocated"
            ? "Allocated"
            : row.status === "in_trip"
            ? "In Trip"
            : "Completed",
      })) ?? [];
  }

  return (
    <DashboardShell
      role="staff"
      title="My Requests"
      subtitle="Track all requests submitted by this staff user."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-slate-950">
          Submitted Requests
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your most recent transport requests and current statuses.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Request Code</th>
                <th className="px-4 py-3 font-medium">Destination</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-4 py-4 text-slate-700">
                      {request.request_code}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {request.destination}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {request.purpose}
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {request.created_at}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/staff/requests/${request.id}`}
                        className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No transport requests found yet.
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