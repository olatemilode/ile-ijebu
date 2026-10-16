import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/types/database";

// Use inside Server Components, Route Handlers, and Server Actions.
// Reads the user's session from cookies so RLS policies apply correctly
// (e.g. a logged-in business owner sees their own pending listings).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component during render — safe to ignore
            // because middleware refreshes the session on navigation.
          }
        },
      },
    }
  );
}
