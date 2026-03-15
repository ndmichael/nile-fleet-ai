import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AIInsightsCard } from "@/components/ai/ai-insights-card";
import { StatusBadge } from "@/components/shared/status-badge";

type ReviewRequestPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * We keep this page simple for now with static data.
 * Later, this will read the actual request by ID from the database.
 */
export default async function ReviewRequestPage({
  params,
}: ReviewRequestPageProps) {
  const { id } = await params;

  return (
    <DashboardShell
      role="approver"
      title="Review Request"
      subtitle="Inspect the full request details and make an approval decision."
    >
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Request Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Full transport request information for approval review.
                </p>
              </div>

              <StatusBadge status="Pending" />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Request ID
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
                  Purpose
                </p>
                <p className="mt-2 text-sm text-slate-900">Official meeting</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Requesting Unit
                </p>
                <p className="mt-2 text-sm text-slate-900">ICT</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Departure
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  12 Jan 2026, 09:00 AM
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Expected Return
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  12 Jan 2026, 03:00 PM
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Passenger Count
                </p>
                <p className="mt-2 text-sm text-slate-900">4</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Trip Type
                </p>
                <p className="mt-2 text-sm text-slate-900">Official Duty</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Additional Notes
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Request raised for an external institutional meeting requiring
                timely departure and return within the same day.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Approval Action
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Approve complete requests or reject with a clear reason.
            </p>

            <form className="mt-6 space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="comment"
                  className="text-sm font-medium text-slate-700"
                >
                  Comment / Reason
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={5}
                  placeholder="Add an approval note or explain why the request is rejected..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Approve Request
                </button>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-red-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  Reject Request
                </button>
              </div>
            </form>
          </div>
        </section>

        <div className="space-y-6">
          <AIInsightsCard
            estimatedDuration="1h 35m"
            recommendedVehicle="Standard SUV"
            riskLevel="Low"
            note="The request appears complete and operationally reasonable. The selected trip profile supports approval, subject to policy compliance."
          />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Reviewer Note
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              AI outputs should support your review, but final approval should
              still reflect policy, urgency, and institutional transport needs.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}