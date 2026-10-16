import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EmptyState } from "@/components/ui/empty-state";
import { BusinessCard } from "@/components/business-card";
import { getAllBusinesses } from "@/lib/data/businesses";

export const metadata: Metadata = {
  title: "Businesses — Ilé Ìjẹ̀bú",
  description: "Discover and support local businesses across Ijebuland.",
};

const CATEGORIES = [
  "hospitality",
  "food-and-dining",
  "fashion-and-beauty",
  "events",
  "photography-and-creative",
  "local-products",
  "professional-services",
];

export default async function BusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const businesses = await getAllBusinesses(category);

  return (
    <main className="px-6 py-20 lg:px-10">
      <Eyebrow>Support Local</Eyebrow>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95]">
        Businesses in Ijebuland.
      </h1>
      <p className="mt-4 max-w-xl text-cocoa/65 dark:text-ivory/65">
        A trusted, growing directory of businesses serving Ijebuland — from
        hospitality and food to fashion and professional services.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href="/businesses"
          className={`border px-4 py-2 text-[11px] font-bold uppercase tracking-wide ${
            !category
              ? "border-gold bg-gold text-ink"
              : "border-cocoa/15 text-cocoa/60 hover:border-gold dark:border-ivory/15 dark:text-ivory/60"
          }`}
        >
          All
        </a>
        {CATEGORIES.map((c) => (
          <a
            key={c}
            href={`/businesses?category=${c}`}
            className={`border px-4 py-2 text-[11px] font-bold uppercase tracking-wide ${
              category === c
                ? "border-gold bg-gold text-ink"
                : "border-cocoa/15 text-cocoa/60 hover:border-gold dark:border-ivory/15 dark:text-ivory/60"
            }`}
          >
            {c.replace(/-/g, " ")}
          </a>
        ))}
      </div>

      <div className="mt-12">
        {businesses.length === 0 ? (
          <EmptyState
            title="No businesses found"
            description="Try a different category, or check back soon as more businesses join Ilé Ìjẹ̀bú."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
