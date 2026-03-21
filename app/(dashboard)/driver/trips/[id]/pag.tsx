import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";

type DriverTripDetailsPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * We keep this page action-based.
 * Drivers should not jump across multiple pages just to start or end a trip.
 */
export default async function DriverTripDetailsPage({
  params,
}: DriverTripDetailsPageProps) {
  const { id } = await params;

  return (
    <DashboardShell
      role="driver"
      title="Trip Details"
      subtitle="Record trip departure, progress, and completion updates."
    >
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Assigned Trip Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Verify trip details before updating status.
                </p>
              </div>

              <StatusBadge status="Allocated" />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Trip ID
                </p>
                <p className="mt-2 text-sm text-slate-900">{id}</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Destination
                </p>
                <p className="mt-2 text-sm text-slate-900">Central Abuja</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Vehicle
                </p>
                <p className="mt-2 text-sm text-slate-900">Toyota Prado</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Scheduled Departure
                </p>
                <p className="mt-2 text-sm text-slate-900">09:00 AM</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Expected Return
                </p>
                <p className="mt-2 text-sm text-slate-900">03:00 PM</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Passenger Count
                </p>
                <p className="mt-2 text-sm text-slate-900">4</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Trip Action Panel
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update departure and return records accurately.
            </p>

            <form className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="actualDeparture"
                    className="text-sm font-medium text-slate-700"
                  >
                    Actual Departure Time
                  </label>
                  <input
                    id="actualDeparture"
                    name="actualDeparture"
                    type="time"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="actualReturn"
                    className="text-sm font-medium text-slate-700"
                  >
                    Actual Return Time
                  </label>
                  <input
                    id="actualReturn"
                    name="actualReturn"
                    type="time"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tripNote"
                  className="text-sm font-medium text-slate-700"
                >
                  Trip Note
                </label>
                <textarea
                  id="tripNote"
                  name="tripNote"
                  rows={5}
                  placeholder="Record any delay, issue, or useful completion note..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                >
                  Start Trip
                </button>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  End Trip
                </button>
              </div>
            </form>
          </div>
        </section>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Driver Reminder
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Only start the trip when actual movement begins, and only end the
              trip when the route has been fully completed and the vehicle has
              returned.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Status Guidance
            </h2>
            <div className="mt-4 space-y-3">
              {[
                "Allocated means the trip has been assigned but has not started.",
                "In Trip means movement is active and being monitored.",
                "Completed means the trip has ended and the record is closed.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}