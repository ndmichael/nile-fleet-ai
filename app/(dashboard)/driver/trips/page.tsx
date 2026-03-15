import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";

const assignedTrips = [
  {
    id: "TRIP-001",
    route: "Central Abuja",
    vehicle: "Toyota Prado",
    departure: "09:00 AM",
    status: "In Trip" as const,
  },
  {
    id: "TRIP-002",
    route: "Airport Road",
    vehicle: "Honda Accord",
    departure: "11:30 AM",
    status: "Allocated" as const,
  },
  {
    id: "TRIP-003",
    route: "Gwarinpa",
    vehicle: "Toyota Hiace",
    departure: "08:15 AM",
    status: "Completed" as const,
  },
];

export default function DriverTripsPage() {
  return (
    <DashboardShell
      role="driver"
      title="Assigned Trips"
      subtitle="View and update trips assigned to this driver."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-slate-950">
          Driver Trip List
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Open any assigned trip to record movement and return updates.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Trip ID</th>
                <th className="px-4 py-3 font-medium">Route</th>
                <th className="px-4 py-3 font-medium">Vehicle</th>
                <th className="px-4 py-3 font-medium">Departure</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {assignedTrips.map((trip) => (
                <tr key={trip.id}>
                  <td className="px-4 py-4 text-slate-700">{trip.id}</td>
                  <td className="px-4 py-4 text-slate-700">{trip.route}</td>
                  <td className="px-4 py-4 text-slate-600">{trip.vehicle}</td>
                  <td className="px-4 py-4 text-slate-600">{trip.departure}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={trip.status} />
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/driver/trips/${trip.id}`}
                      className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      Open Trip
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