import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/data/get-current-profile";

export type StaffDashboardData = {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  aiSuggestionsUsed: number;
  recentRequests: Array<{
    id: string;
    destination: string;
    createdAt: string;
    status: "Pending" | "Approved" | "Rejected" | "Allocated" | "In Trip" | "Completed";
  }>;
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

export async function getStaffDashboardData(): Promise<StaffDashboardData> {
  const supabase = await createClient();
  const profile = await getCurrentProfile();

  if (!profile || profile.role !== "staff") {
    return {
      totalRequests: 0,
      pendingRequests: 0,
      approvedRequests: 0,
      aiSuggestionsUsed: 0,
      recentRequests: [],
    };
  }

  const { data: requests, error } = await supabase
    .from("requests")
    .select("id, destination, status, created_at")
    .eq("staff_profile_id", profile.id)
    .order("created_at", { ascending: false });

  if (error || !requests) {
    return {
      totalRequests: 0,
      pendingRequests: 0,
      approvedRequests: 0,
      aiSuggestionsUsed: 0,
      recentRequests: [],
    };
  }

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const approvedRequests = requests.filter((r) =>
    ["approved", "allocated", "in_trip", "completed"].includes(r.status)
  ).length;

  // For now this is a simple proxy metric.
  // Later, this should come from ai_logs linked to the user's requests.
  const aiSuggestionsUsed = requests.length;

  const recentRequests = requests.slice(0, 5).map((request) => ({
    id: request.id,
    destination: request.destination,
    createdAt: new Date(request.created_at).toLocaleDateString(),
    status: mapStatus(request.status),
  }));

  return {
    totalRequests,
    pendingRequests,
    approvedRequests,
    aiSuggestionsUsed,
    recentRequests,
  };
}