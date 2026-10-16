import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

// ⚠️ SERVER-ONLY. This client uses the service role key and BYPASSES
// Row Level Security entirely. Never import this file into a Client
// Component or expose it to the browser.
//
// Use it only for:
//   - the /admin content-review routes (gated by ADMIN_ACCESS_CODE)
//   - the seed script
//   - trusted server-side webhooks
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
