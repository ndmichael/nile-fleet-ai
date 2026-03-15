import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";

const vehicles = [
  {
    plate: "ABC-102-AA",
    model: "Toyota Prado",
    type: "Pool",
    category: "Luxury",
    status: "Allocated" as const,
  },
  {
    plate: "KJA-442-BB",
    model: "Honda Accord",
    type: "Assigned",
    category: "Luxury",
    status: "Approved" as const,
  },
  {
    plate: "FCT-991-CC",
    model: "Toyota Hiace",
    type: "Pool",
    category: "Non-Luxury",
    status: "Completed" as const,
  },
];

export default function VehiclesPage() {
  return (
    <DashboardShell
      role="admin"
      title="Vehicles"
      subtitle="Manage the university fleet, vehicle categories, and availability states."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Fleet Inventory
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A structured view of assigned and pool vehicles in the system.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Add Vehicle
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Plate No.</th>
                <th className="px-4 py-3 font-medium">Model</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.plate}>
                  <td className="px-4 py-4 text-slate-700">{vehicle.plate}</td>
                  <td className="px-4 py-4 text-slate-700">{vehicle.model}</td>
                  <td className="px-4 py-4 text-slate-600">{vehicle.type}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {vehicle.category}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={vehicle.status} />
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