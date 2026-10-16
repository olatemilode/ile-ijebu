import { isSupabaseConfigured } from "@/lib/data/mock-data";

export function MockDataBanner() {
  if (isSupabaseConfigured) return null;

  return (
    <div className="border-b border-gold/30 bg-gold/10 px-6 py-2 text-center text-[12px] text-cocoa dark:text-ivory">
      Running on sample content — no Supabase project connected yet.{" "}
      <span className="text-cocoa/60 dark:text-ivory/60">See README.md to connect a real database.</span>
    </div>
  );
}
