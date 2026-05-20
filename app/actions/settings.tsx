"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SettingsActionState = {
  success?: string;
  error?: string;
};

const DRIVER_PROFILE_COLUMN = "user_id"; 
// If your drivers table uses profile_id instead, change this to:
// const DRIVER_PROFILE_COLUMN = "profile_id";

export async function updateProfileSettings(
  prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!fullName) {
    return { error: "Full name is required." };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unable to verify authenticated user." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/settings");

  return { success: "Profile updated successfully." };
}

export async function updateDriverPhoneSettings(
  prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const phone = String(formData.get("phone") ?? "").trim();

  const phoneRegex = /^(\+?[0-9]{10,15})$/;

  if (!phone) {
    return { error: "Phone number is required." };
  }

  if (!phoneRegex.test(phone)) {
    return {
      error: "Enter a valid phone number. Use 10 to 15 digits, with optional + at the beginning.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unable to verify authenticated user." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { error: "Profile not found." };
  }

  if (profile.role !== "driver") {
    return { error: "Only drivers can update driver contact information." };
  }

  const { error } = await supabase
    .from("drivers")
    .update({ phone })
    .eq(DRIVER_PROFILE_COLUMN, user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/settings");

  return { success: "Driver phone number updated successfully." };
}

export async function updatePasswordSettings(
  prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const currentPassword = String(formData.get("current_password") ?? "").trim();
  const newPassword = String(formData.get("new_password") ?? "").trim();
  const confirmPassword = String(formData.get("confirm_password") ?? "").trim();

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All password fields are required." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and confirm password do not match." };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters long." };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !user.email) {
    return { error: "Unable to verify authenticated user." };
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (verifyError) {
    return { error: "Current password is incorrect." };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { success: "Password updated successfully." };
}