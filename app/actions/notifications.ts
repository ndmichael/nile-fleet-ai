"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/data/get-current-profile";

export type NotificationActionState = {
  error?: string;
  success?: string;
};

export async function markNotificationAsRead(
  prevState: NotificationActionState,
  formData: FormData
): Promise<NotificationActionState> {
  const supabase = await createClient();
  const profile = await getCurrentProfile();

  if (!profile) {
    return { error: "You must be logged in." };
  }

  const notificationId = String(formData.get("notificationId") ?? "").trim();

  if (!notificationId) {
    return { error: "Missing notification." };
  }

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .eq("profile_id", profile.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/${profile.role}/dashboard`);
  return { success: "Notification marked as read." };
}

export async function markAllNotificationsAsRead(): Promise<NotificationActionState> {
  const supabase = await createClient();
  const profile = await getCurrentProfile();

  if (!profile) {
    return { error: "You must be logged in." };
  }

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("profile_id", profile.id)
    .eq("is_read", false);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/${profile.role}/dashboard`);
  return { success: "All notifications marked as read." };
}