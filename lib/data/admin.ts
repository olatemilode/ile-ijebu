import { createAdminClient } from "@/lib/supabase/admin";
import type { Business, Event, Story, Partnership } from "@/lib/types/database";
import { isSupabaseConfigured, MOCK_BUSINESSES, MOCK_EVENTS, MOCK_STORIES } from "@/lib/data/mock-data";

// These use the service-role client deliberately: the admin dashboard
// needs to see draft/pending/rejected content too, which normal RLS
// policies hide from anyone who isn't the content's own owner.
//
// Without Supabase configured, these return the same mock content the
// public site uses, so /admin is fully browsable before you've connected
// a real database (though the moderation actions are no-ops until then —
// see app/admin/actions.ts).

export async function getAdminBusinesses(): Promise<Business[]> {
  if (!isSupabaseConfigured) return MOCK_BUSINESSES;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAdminBusinesses:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAdminEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured) return MOCK_EVENTS;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAdminEvents:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAdminStories(): Promise<Story[]> {
  if (!isSupabaseConfigured) return MOCK_STORIES;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAdminStories:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAdminPartnerships(): Promise<Partnership[]> {
  if (!isSupabaseConfigured) return [];

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("partnerships")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAdminPartnerships:", error.message);
    return [];
  }
  return data ?? [];
}
