import { createClient } from "@/lib/supabase/server";
import type { Business } from "@/lib/types/database";
import { isSupabaseConfigured, MOCK_BUSINESSES } from "@/lib/data/mock-data";

export async function getFeaturedBusinesses(limit = 3): Promise<Business[]> {
  if (!isSupabaseConfigured) return MOCK_BUSINESSES.slice(0, limit);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedBusinesses:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllBusinesses(category?: string): Promise<Business[]> {
  if (!isSupabaseConfigured) {
    return category
      ? MOCK_BUSINESSES.filter((b) => b.category === category)
      : MOCK_BUSINESSES;
  }

  const supabase = await createClient();
  let query = supabase
    .from("businesses")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) {
    console.error("getAllBusinesses:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  if (!isSupabaseConfigured) {
    return MOCK_BUSINESSES.find((b) => b.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}
