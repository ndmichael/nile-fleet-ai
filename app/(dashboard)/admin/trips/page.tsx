import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";

const trips = [
  {
    id: "TRIP-001",
    route: "Central Abuja",
    vehicle: "Toyota Prado",
    driver: "Driver A",
    status: "In Trip" as const,
  },
  {
    id: "TRIP-002",
    route: "Airport Road",
    vehicle: "Honda Accord",
    driver: "Driver B",
    status: "Completed" as const,
  },
  {
    id: "TRIP-003",
    route: "Gwarinpa",
    vehicle: "Toyota Hiace",
    driver: "Driver C",
    status: "Allocated" as const,
  },
];

export default function TripsPage() {
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
                <th className="px-4 py-3 font-medium">Route</th>
                <th className="px-4 py-3 font-medium">Vehicle</th>
                <th className="px-4 py-3 font-medium">Driver</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="px-4 py-4 text-slate-700">{trip.id}</td>
                  <td className="px-4 py-4 text-slate-700">{trip.route}</td>
                  <td className="px-4 py-4 text-slate-600">{trip.vehicle}</td>
                  <td className="px-4 py-4 text-slate-600">{trip.driver}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={trip.status} />
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