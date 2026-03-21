import { unstable_noStore as noStore } from "next/cache";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/server";

type TripMonitorRow = {
  id: string;
  actual_departure_at: string | null;
  actual_return_at: string | null;
  late_return: boolean;
  request:
    | {
        destination: string;
        status: string;
        request_code: string;
      }
    | {
        destination: string;
        status: string;
        request_code: string;
      }[]
    | null;
  allocation:
    | {
        driver:
          | {
              profile:
                | {
                    full_name: string;
                  }
                | {
                    full_name: string;
                  }[]
                | null;
            }
          | {
              profile:
                | {
                    full_name: string;
                  }
                | {
                    full_name: string;
                  }[]
                | null;
            }[]
          | null;
        vehicle:
          | {
              make: string | null;
              model: string | null;
              plate_no: string;
            }
          | {
              make: string | null;
              model: string | null;
              plate_no: string;
            }[]
          | null;
      }
    | {
        driver:
          | {
              profile:
                | {
                    full_name: string;
                  }
                | {
                    full_name: string;
                  }[]
                | null;
            }
          | {
              profile:
                | {
                    full_name: string;
                  }
                | {
                    full_name: string;
                  }[]
                | null;
            }[]
          | null;
        vehicle:
          | {
              make: string | null;
              model: string | null;
              plate_no: string;
            }
          | {
              make: string | null;
              model: string | null;
              plate_no: string;
            }[]
          | null;
      }[]
    | null;
};

function getRequestInfo(request: TripMonitorRow["request"]) {
  const resolved = Array.isArray(request) ? request[0] : request;

  return {
    requestCode: resolved?.request_code ?? "N/A",
    destination: resolved?.destination ?? "Unknown Route",
    status: resolved?.status ?? "completed",
  };
}

function getAllocationInfo(allocation: TripMonitorRow["allocation"]) {
  const resolvedAllocation = Array.isArray(allocation)
    ? allocation[0]
    : allocation;

  const vehicle = Array.isArray(resolvedAllocation?.vehicle)
    ? resolvedAllocation?.vehicle[0]
    : resolvedAllocation?.vehicle;

  const driver = Array.isArray(resolvedAllocation?.driver)
    ? resolvedAllocation?.driver[0]
    : resolvedAllocation?.driver;

  const profile = Array.isArray(driver?.profile)
    ? driver?.profile[0]
    : driver?.profile;

  return {
    vehicleLabel:
      `${vehicle?.make ?? ""} ${vehicle?.model ?? ""} (${vehicle?.plate_no ?? ""})`.trim() ||
      "Unknown Vehicle",
    driverName: profile?.full_name ?? "Unknown Driver",
  };
}

function mapRequestStatus(
  status: string
): "Allocated" | "In Trip" | "Completed" | "Approved" | "Rejected" | "Pending" {
  switch (status) {
    case "allocated":
      return "Allocated";
    case "in_trip":
      return "In Trip";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "pending":
      return "Pending";
    default:
      return "Completed";
  }
}

export default async function TripsPage() {
  noStore();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("trips")
    .select(
      `
      id,
      actual_departure_at,
      actual_return_at,
      late_return,
      request:requests(
        request_code,
        destination,
        status
      ),
      allocation:allocations(
        driver:drivers(
          profile:profiles(full_name)
        ),
        vehicle:vehicles(make, model, plate_no)
      )
    `
    )
    .order("created_at", { ascending: false });

  const trips = (data ?? []) as TripMonitorRow[];

  console.log({ adminTripsError: error });

  return (
    <DashboardShell
      role="admin"
      title="Trips Monitor"
      subtitle="Track active, allocated, and completed transport movements."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-slate-950">
          Trip Activity
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Current and recent trip activity across the fleet.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Trip ID</th>
                <th className="px-4 py-3 font-medium">Request Code</th>
                <th className="px-4 py-3 font-medium">Route</th>
                <th className="px-4 py-3 font-medium">Vehicle</th>
                <th className="px-4 py-3 font-medium">Driver</th>
                <th className="px-4 py-3 font-medium">Departure</th>
                <th className="px-4 py-3 font-medium">Return</th>
                <th className="px-4 py-3 font-medium">Late</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {trips.length > 0 ? (
                trips.map((trip) => {
                  const requestInfo = getRequestInfo(trip.request);
                  const allocationInfo = getAllocationInfo(trip.allocation);

                  return (
                    <tr key={trip.id}>
                      <td className="px-4 py-4 text-slate-700">{trip.id}</td>
                      <td className="px-4 py-4 text-slate-700">
                        {requestInfo.requestCode}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {requestInfo.destination}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {allocationInfo.vehicleLabel}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {allocationInfo.driverName}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {trip.actual_departure_at
                          ? new Date(trip.actual_departure_at).toLocaleString()
                          : "Not started"}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {trip.actual_return_at
                          ? new Date(trip.actual_return_at).toLocaleString()
                          : "Not returned"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            trip.late_return
                              ? "bg-red-50 text-red-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {trip.late_return ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge
                          status={mapRequestStatus(requestInfo.status)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No trip activity found yet.
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