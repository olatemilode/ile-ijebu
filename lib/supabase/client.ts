import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/types/database";

// Use inside Client Components ('use client').
// Safe to call repeatedly; @supabase/ssr handles session storage in cookies.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
