"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/shared/section-header";
import { FormField } from "@/components/forms/form-field";
import {
  createTransportRequest,
  type RequestFormState,
} from "@/app/actions/requests";

type UnitOption = {
  id: string;
  name: string;
};

type StaffRequestFormProps = {
  units: UnitOption[];
};

const initialState: RequestFormState = {};

export function StaffRequestForm({ units }: StaffRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    createTransportRequest,
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Transport Request Form"
        description="Provide complete and accurate trip information for review and allocation."
      />

      <form action={formAction} className="mt-6 space-y-6">
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

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Departure Date" htmlFor="departureDate">
            <input
              id="departureDate"
              name="departureDate"
              type="date"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </FormField>

          <FormField label="Departure Time" htmlFor="departureTime">
            <input
              id="departureTime"
              name="departureTime"
              type="time"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </FormField>

          <FormField label="Expected Return Date" htmlFor="returnDate">
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

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Requesting Unit" htmlFor="unit">
            <select
              id="unit"
              name="unit"
              defaultValue=""
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
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
              defaultValue=""
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select trip type</option>
              <option value="official">Official Duty</option>
              <option value="meeting">Meeting</option>
              <option value="protocol">Protocol</option>
              <option value="logistics">Logistics</option>
            </select>
          </FormField>
        </div>

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

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </section>
  );
}