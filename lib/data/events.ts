import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/types/database";
import { isSupabaseConfigured, MOCK_EVENTS } from "@/lib/data/mock-data";

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  if (!isSupabaseConfigured) {
    return [...MOCK_EVENTS]
      .sort((a, b) => a.event_date.localeCompare(b.event_date))
      .slice(0, limit);
  }

  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("getUpcomingEvents:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured) {
    return [...MOCK_EVENTS].sort((a, b) => a.event_date.localeCompare(b.event_date));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("getAllEvents:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!isSupabaseConfigured) {
    return MOCK_EVENTS.find((e) => e.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}
