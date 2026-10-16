import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EmptyState } from "@/components/ui/empty-state";
import { BusinessCard } from "@/components/business-card";
import { getFeaturedBusinesses } from "@/lib/data/businesses";

export async function FeaturedBusinesses() {
  const businesses = await getFeaturedBusinesses(3);

  return (
    <section id="businesses" className="px-6 py-24 lg:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Support Local</Eyebrow>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[0.95]">
            Discover local businesses.
          </h2>
        </div>
        <Link href="/partner" className="text-[12px] font-bold text-gold hover:underline">
          List your business →
        </Link>
      </div>

      {businesses.length === 0 ? (
        <EmptyState
          title="No businesses listed yet"
          description="Be the first — businesses submitted through Partner With Us appear here once reviewed."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      )}
    </section>
  );
}
