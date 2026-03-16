import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { getCurrentProfile } from "@/lib/data/get-current-profile";
import { createClient } from "@/lib/supabase/server";

type StaffRequestDetailsPageProps = {
  params: Promise<{ id: string }>;
};

type RequestUnit = {
  name: string;
};

type AllocatedVehicle = {
  plate_no: string;
  make: string | null;
  model: string | null;
  type: string;
  category: string;
};

type RequestDetailsRow = {
  id: string;
  request_code: string;
  destination: string;
  purpose: string;
  passenger_count: number;
  departure_date: string;
  departure_time: string;
  expected_return_date: string | null;
  trip_type: string | null;
  notes: string | null;
  status: string;
  created_at: string;
  unit: RequestUnit | RequestUnit[] | null;
};

type AllocationRow = {
  allocated_at: string;
  vehicle: AllocatedVehicle | AllocatedVehicle[] | null;
  driver: { id: string } | { id: string }[] | null;
};

function mapStatus(
  status: string
): "Pending" | "Approved" | "Rejected" | "Allocated" | "In Trip" | "Completed" {
  switch (status) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "allocated":
      return "Allocated";
    case "in_trip":
      return "In Trip";
    default:
      return "Completed";
  }
}

export default async function StaffRequestDetailsPage({
  params,
}: StaffRequestDetailsPageProps) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  if (!profile || profile.role !== "staff") {
    notFound();
  }

  const { data: request, error: requestError } = await supabase
  .from("requests")
  .select(`
    id,
    request_code,
    destination,
    purpose,
    passenger_count,
    departure_date,
    departure_time,
    expected_return_date,
    trip_type,
    notes,
    status,
    created_at,
    unit:units(name)
  `)
  .eq("id", id)
  .eq("staff_profile_id", profile.id)
  .single<RequestDetailsRow>();

  if (requestError || !request) {
    notFound();
  }

  const { data: approval } = await supabase
    .from("approvals")
    .select("decision, comment, decided_at")
    .eq("request_id", request.id)
    .maybeSingle();

  const { data: allocation } = await supabase
  .from("allocations")
  .select(`
    allocated_at,
    vehicle:vehicles(plate_no, make, model, type, category),
    driver:drivers(id)
  `)
  .eq("request_id", request.id)
  .maybeSingle<AllocationRow>();

  const { data: trip } = await supabase
    .from("trips")
    .select("actual_departure_at, actual_return_at, driver_note, late_return")
    .eq("request_id", request.id)
    .maybeSingle();

  return (
    <DashboardShell
      role="staff"
      title="Request Details"
      subtitle="View the full status and lifecycle of your submitted request."
    >
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Request Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Full details of the transport request you submitted.
                </p>
              </div>

              <StatusBadge status={mapStatus(request.status)} />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Request Code
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {request.request_code}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Destination
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {request.destination}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Purpose
                </p>
                <p className="mt-2 text-sm text-slate-900">{request.purpose}</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Requesting Unit
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {Array.isArray(request.unit)
                    ? request.unit[0]?.name ?? "Not assigned"
                    : request.unit?.name ?? "Not assigned"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Departure Date
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {request.departure_date}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Departure Time
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {request.departure_time}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Expected Return Date
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {request.expected_return_date ?? "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Passenger Count
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {request.passenger_count}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Trip Type
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {request.trip_type ?? "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Submitted On
                </p>
                <p className="mt-2 text-sm text-slate-900">
                  {new Date(request.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Additional Notes
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {request.notes?.trim() || "No additional notes provided."}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Approval Outcome
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review status from the approver stage.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              {approval ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Decision
                    </p>
                    <p className="mt-2 text-sm text-slate-900">
                      {approval.decision}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Comment
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {approval.comment?.trim() || "No comment provided."}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Reviewed At
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {new Date(approval.decided_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  This request has not been reviewed yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Allocation Status
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Vehicle and driver assignment details.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              {allocation ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Allocated At
                    </p>
                    <p className="mt-2 text-sm text-slate-900">
                      {new Date(allocation.allocated_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Vehicle
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {Array.isArray(allocation.vehicle)
                        ? `${allocation.vehicle[0]?.make ?? ""} ${allocation.vehicle[0]?.model ?? ""} (${allocation.vehicle[0]?.plate_no ?? ""})`
                        : `${allocation.vehicle?.make ?? ""} ${allocation.vehicle?.model ?? ""} (${allocation.vehicle?.plate_no ?? ""})`}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  No vehicle has been allocated yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Trip Execution
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Live trip progress and completion details.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              {trip ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Actual Departure
                    </p>
                    <p className="mt-2 text-sm text-slate-900">
                      {trip.actual_departure_at
                        ? new Date(trip.actual_departure_at).toLocaleString()
                        : "Not started"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Actual Return
                    </p>
                    <p className="mt-2 text-sm text-slate-900">
                      {trip.actual_return_at
                        ? new Date(trip.actual_return_at).toLocaleString()
                        : "Not returned yet"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Late Return
                    </p>
                    <p className="mt-2 text-sm text-slate-900">
                      {trip.late_return ? "Yes" : "No"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Driver Note
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {trip.driver_note?.trim() || "No driver note available."}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-600">
                  Trip execution has not started yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}