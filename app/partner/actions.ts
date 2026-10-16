"use server";

import { createClient } from "@/lib/supabase/server";
import type { PartnershipType } from "@/lib/types/database";
import { isSupabaseConfigured } from "@/lib/data/mock-data";

export interface PartnerFormState {
  success: boolean;
  error?: string;
}

export async function submitPartnershipInquiry(
  _prevState: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  const org_name = String(formData.get("org_name") ?? "").trim();
  const contact_name = String(formData.get("contact_name") ?? "").trim();
  const contact_email = String(formData.get("contact_email") ?? "").trim();
  const contact_phone = String(formData.get("contact_phone") ?? "").trim();
  const type = String(formData.get("type") ?? "business") as PartnershipType;
  const message = String(formData.get("message") ?? "").trim();

  if (!org_name || !contact_email) {
    return { success: false, error: "Please fill in your name/organization and email." };
  }

  if (!isSupabaseConfigured) {
    // No database connected yet — simulate success so the form/UI can be
    // reviewed end-to-end. Nothing is actually saved. Connect Supabase to
    // start persisting real inquiries.
    console.log("[mock] Partnership inquiry (not saved):", { org_name, contact_email, type });
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("partnerships").insert({
    org_name,
    contact_name: contact_name || null,
    contact_email,
    contact_phone: contact_phone || null,
    type,
    message: message || null,
  });

  if (error) {
    console.error("submitPartnershipInquiry:", error.message);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
