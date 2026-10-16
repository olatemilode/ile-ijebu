import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EmptyState } from "@/components/ui/empty-state";
import { getAllStories } from "@/lib/data/stories";

export const metadata: Metadata = {
  title: "Stories — Ilé Ìjẹ̀bú",
  description: "Heritage, people, business, food and community stories from Ijebuland.",
};

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const stories = await getAllStories(category);

  return (
    <main className="px-6 py-20 lg:px-10">
      <Eyebrow>From Home</Eyebrow>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95]">
        Stories that keep us connected.
      </h1>
      <p className="mt-4 max-w-xl text-cocoa/65 dark:text-ivory/65">
        Heritage, people, business, food, travel, community and history —
        the searchable digital archive of Ijebuland.
      </p>

      <div className="mt-12">
        {stories.length === 0 ? (
          <EmptyState
            title="No stories published yet"
            description="Stories preserving Ijebuland's heritage and community will appear here soon."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Link
                href={`/stories/${story.slug}`}
                key={story.id}
                className="group border border-cocoa/10 bg-white/40 transition hover:border-gold/50 dark:border-ivory/10 dark:bg-white/[0.02]"
              >
                <div className="flex h-[190px] items-end bg-gradient-to-br from-cocoa to-[#a5762c] p-5 text-[10px] font-bold tracking-[0.2em] text-ivory">
                  {story.category.toUpperCase()}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg leading-snug">{story.title}</h3>
                  {story.excerpt && (
                    <p className="mt-2 text-[13px] text-cocoa/55 dark:text-ivory/55">
                      {story.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
