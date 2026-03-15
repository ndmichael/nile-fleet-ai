import { DashboardShell } from "@/components/layout/dashboard-shell";
import { SectionHeader } from "@/components/shared/section-header";
import { FormField } from "@/components/forms/form-field";
import { AIInsightsCard } from "@/components/ai/ai-insights-card";

export default function NewRequestPage() {
  return (
    <DashboardShell
      role="staff"
      title="Request Vehicle"
      subtitle="Submit a structured transport request for official duty."
    >
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        {/* Left side: request form */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            title="Transport Request Form"
            description="Provide complete and accurate trip information for review and allocation."
          />

          <form className="mt-6 space-y-6">
            {/* Basic trip details */}
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Destination"
                htmlFor="destination"
                hint="Enter the primary destination for the trip."
              >
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  placeholder="e.g. Central Abuja"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </FormField>

              <FormField
                label="Purpose of Trip"
                htmlFor="purpose"
                hint="State the official reason for the request."
              >
                <input
                  id="purpose"
                  name="purpose"
                  type="text"
                  placeholder="e.g. Official meeting"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </FormField>
            </div>

            {/* Timing and passenger details */}
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Departure Date"
                htmlFor="departureDate"
              >
                <input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </FormField>

              <FormField
                label="Departure Time"
                htmlFor="departureTime"
              >
                <input
                  id="departureTime"
                  name="departureTime"
                  type="time"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </FormField>

              <FormField
                label="Expected Return Date"
                htmlFor="returnDate"
              >
                <input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </FormField>

              <FormField
                label="Passenger Count"
                htmlFor="passengerCount"
                hint="This helps determine vehicle suitability."
              >
                <input
                  id="passengerCount"
                  name="passengerCount"
                  type="number"
                  min={1}
                  placeholder="e.g. 4"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </FormField>
            </div>

            {/* Additional trip classification */}
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Requesting Unit"
                htmlFor="unit"
              >
                <select
                  id="unit"
                  name="unit"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select unit
                  </option>
                  <option value="registry">Registry</option>
                  <option value="ict">ICT</option>
                  <option value="admin">Administration</option>
                  <option value="transport">Transport</option>
                </select>
              </FormField>

              <FormField
                label="Trip Type"
                htmlFor="tripType"
                hint="Used by the AI recommendation engine."
              >
                <select
                  id="tripType"
                  name="tripType"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select trip type
                  </option>
                  <option value="official">Official Duty</option>
                  <option value="meeting">Meeting</option>
                  <option value="protocol">Protocol</option>
                  <option value="logistics">Logistics</option>
                </select>
              </FormField>
            </div>

            {/* Notes */}
            <FormField
              label="Additional Notes"
              htmlFor="notes"
              hint="Optional extra instructions for the transport team."
            >
              <textarea
                id="notes"
                name="notes"
                rows={5}
                placeholder="Provide any useful trip notes here..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </FormField>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Submit Request
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </section>

        {/* Right side: AI panel + guide note */}
        <div className="space-y-6">
          <AIInsightsCard
            estimatedDuration="1h 25m"
            recommendedVehicle="Standard SUV"
            riskLevel="Low"
            note="Recommendation is based on current destination, passenger count, and selected trip type. Final allocation remains subject to approval and vehicle availability."
          />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              title="Submission Guide"
              description="A few rules to improve approval speed and allocation accuracy."
            />

            <div className="mt-5 space-y-3">
              {[
                "Use the exact destination to improve ETA estimation.",
                "Passenger count should reflect the full expected occupancy.",
                "Assigned and pool vehicles are treated differently during allocation.",
                "Incomplete requests may be delayed or rejected.",
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