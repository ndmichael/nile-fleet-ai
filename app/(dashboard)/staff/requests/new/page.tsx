import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AIInsightsCard } from "@/components/ai/ai-insights-card";
import { StaffRequestForm } from "@/components/forms/staff-request-form";
import { getUnits } from "@/lib/data/get-units";

export default async function NewRequestPage() {
  const units = await getUnits();

  return (
    <DashboardShell
      role="staff"
      title="Request Vehicle"
      subtitle="Submit a structured transport request for official duty."
    >
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <StaffRequestForm units={units} />

        <div className="space-y-6">
          <AIInsightsCard
            estimatedDuration="1h 25m"
            recommendedVehicle="Standard SUV"
            riskLevel="Low"
            note="Recommendation is based on current destination, passenger count, and selected trip type. Final allocation remains subject to approval and vehicle availability."
          />
        </div>
      </div>
    </DashboardShell>
  );
}