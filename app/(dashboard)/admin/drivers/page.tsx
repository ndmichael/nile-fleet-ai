import { DashboardShell } from "@/components/layout/dashboard-shell";

const drivers = [
  { name: "Driver A", phone: "0803 000 0001", status: "Available" },
  { name: "Driver B", phone: "0803 000 0002", status: "On Trip" },
  { name: "Driver C", phone: "0803 000 0003", status: "Available" },
];

export default function DriversPage() {
  return (
    <DashboardShell
      role="admin"
      title="Drivers"
      subtitle="Track driver availability and assign drivers to active trips."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Driver Directory
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Operational overview of available and engaged drivers.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Add Driver
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {drivers.map((driver) => (
                <tr key={driver.name}>
                  <td className="px-4 py-4 text-slate-700">{driver.name}</td>
                  <td className="px-4 py-4 text-slate-600">{driver.phone}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        driver.status === "Available"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {driver.status}
                    </span>
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