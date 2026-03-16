export type RiskLevel = "Low" | "Medium" | "High";
export type VehicleRecommendation = "Executive Sedan" | "Standard SUV" | "Mini Bus";

export type RequestInsightInput = {
  destination: string;
  passengerCount: number;
  tripType: string;
};

export type RequestInsightOutput = {
  estimatedDuration: string;
  estimatedDurationMinutes: number;
  recommendedVehicle: VehicleRecommendation;
  recommendedVehicleCategory: "luxury" | "non_luxury";
  riskLevel: RiskLevel;
  note: string;
};

/**
 * This is a lightweight, explainable AI-style rule engine.
 * It is intentionally simple, transparent, and easy to defend academically.
 */
export function getRequestInsights({
  destination,
  passengerCount,
  tripType,
}: RequestInsightInput): RequestInsightOutput {
  const normalizedDestination = destination.trim().toLowerCase();
  const normalizedTripType = tripType.trim().toLowerCase();

  let durationMinutes = 45;

  // Distance / route assumption by keywords.
  if (
    normalizedDestination.includes("airport") ||
    normalizedDestination.includes("gwarinpa")
  ) {
    durationMinutes = 90;
  } else if (
    normalizedDestination.includes("central") ||
    normalizedDestination.includes("wuse") ||
    normalizedDestination.includes("maitama")
  ) {
    durationMinutes = 60;
  } else if (
    normalizedDestination.includes("lugbe") ||
    normalizedDestination.includes("nyanya") ||
    normalizedDestination.includes("kubwa")
  ) {
    durationMinutes = 110;
  }

  // Passenger load affects ETA slightly.
  if (passengerCount >= 6) {
    durationMinutes += 15;
  } else if (passengerCount >= 4) {
    durationMinutes += 10;
  }

  // Trip type influence.
  if (normalizedTripType === "protocol") {
    durationMinutes += 10;
  } else if (normalizedTripType === "logistics") {
    durationMinutes += 20;
  }

  let recommendedVehicle: VehicleRecommendation = "Executive Sedan";
  let recommendedVehicleCategory: "luxury" | "non_luxury" = "luxury";
  let riskLevel: RiskLevel = "Low";

  if (passengerCount >= 7) {
    recommendedVehicle = "Mini Bus";
    recommendedVehicleCategory = "non_luxury";
    riskLevel = "High";
  } else if (passengerCount >= 4 || durationMinutes >= 90) {
    recommendedVehicle = "Standard SUV";
    recommendedVehicleCategory = "non_luxury";
    riskLevel = durationMinutes >= 100 ? "Medium" : "Low";
  } else {
    recommendedVehicle = "Executive Sedan";
    recommendedVehicleCategory = "luxury";
    riskLevel = normalizedTripType === "protocol" ? "Medium" : "Low";
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  const estimatedDuration =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const note = `Recommendation is based on passenger count, trip type, and route distance assumptions for "${destination || "the selected route"}".`;

  return {
    estimatedDuration,
    estimatedDurationMinutes: durationMinutes,
    recommendedVehicle,
    recommendedVehicleCategory,
    riskLevel,
    note,
  };
}