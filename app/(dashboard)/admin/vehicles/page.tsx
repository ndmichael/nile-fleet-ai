import { unstable_noStore as noStore } from "next/cache";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/server";

type VehicleStatus = "Approved" | "Allocated" | "In Trip" | "Completed";

type VehicleRow = {
  id: string;
  plate_no: string;
  make: string | null;
  model: string | null;
  type: string;
  category: string;
  status: string;
};

function mapVehicleStatus(status: string): VehicleStatus {
  switch (status) {
    case "allocated":
      return "Allocated";
    case "in_trip":
      return "In Trip";
    case "available":
      return "Completed";
    default:
      return "Approved";
  }
}

export default async function VehiclesPage() {
  noStore();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("id, plate_no, make, model, type, category, status")
    .order("created_at", { ascending: false });

  console.log({ vehiclesError: error });

  const vehicles = (data ?? []) as VehicleRow[];

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
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-4 py-4 text-slate-700">
                      {vehicle.plate_no}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {`${vehicle.make ?? ""} ${vehicle.model ?? ""}`.trim()}
                    </td>
                    <td className="px-4 py-4 text-slate-600">{vehicle.type}</td>
                    <td className="px-4 py-4 text-slate-600">
                      {vehicle.category}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={mapVehicleStatus(vehicle.status)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No vehicles found.
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