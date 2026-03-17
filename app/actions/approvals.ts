"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/data/get-current-profile";

export type ApprovalFormState = {
  error?: string;
  success?: string;
};

export async function reviewTransportRequest(
  prevState: ApprovalFormState,
  formData: FormData
): Promise<ApprovalFormState> {
  const supabase = await createClient();
  const profile = await getCurrentProfile();

  if (!profile) {
    return { error: "You must be logged in to review requests." };
  }

  if (profile.role !== "approver" && profile.role !== "admin") {
    return { error: "You are not permitted to review transport requests." };
  }

  const requestId = String(formData.get("requestId") ?? "").trim();
  const decision = String(formData.get("decision") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();

  if (!requestId || !decision) {
    return { error: "Missing approval details." };
  }

  if (!["approved", "rejected"].includes(decision)) {
    return { error: "Invalid review decision." };
  }

  const { data: request, error: requestError } = await supabase
    .from("requests")
    .select("id, status")
    .eq("id", requestId)
    .single();

  if (requestError || !request) {
    return { error: "Request not found." };
  }

  if (request.status !== "pending") {
    return { error: "Only pending requests can be reviewed." };
  }

  const nextStatus = decision === "approved" ? "approved" : "rejected";

  const { error: approvalError } = await supabase.from("approvals").upsert(
    {
      request_id: requestId,
      approver_profile_id: profile.id,
      decision,
      comment: comment || null,
    },
    {
      onConflict: "request_id",
    }
  );

  if (approvalError) {
    return { error: approvalError.message };
  }

  const { error: requestUpdateError } = await supabase
    .from("requests")
    .update({ status: nextStatus })
    .eq("id", requestId);

  if (requestUpdateError) {
    return { error: requestUpdateError.message };
  }

  revalidatePath("/approver/dashboard");
  revalidatePath("/approver/requests/pending");
  revalidatePath("/approver/requests/history");
  revalidatePath(`/approver/requests/${requestId}`);

  return {
    success:
      decision === "approved"
        ? "Request approved successfully."
        : "Request rejected successfully.",
  };
}