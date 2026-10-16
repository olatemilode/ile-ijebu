import { createClient } from "@/lib/supabase/server";
import type { Story } from "@/lib/types/database";
import { isSupabaseConfigured, MOCK_STORIES } from "@/lib/data/mock-data";

export async function getFeaturedStories(limit = 3): Promise<Story[]> {
  if (!isSupabaseConfigured) return MOCK_STORIES.slice(0, limit);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedStories:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllStories(category?: string): Promise<Story[]> {
  if (!isSupabaseConfigured) {
    return category
      ? MOCK_STORIES.filter((s) => s.category === category)
      : MOCK_STORIES;
  }

  const supabase = await createClient();
  let query = supabase
    .from("stories")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) {
    console.error("getAllStories:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  if (!isSupabaseConfigured) {
    return MOCK_STORIES.find((s) => s.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}
