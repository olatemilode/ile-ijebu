import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EmptyState } from "@/components/ui/empty-state";
import { getFeaturedStories } from "@/lib/data/stories";

export async function FeaturedStories() {
  const stories = await getFeaturedStories(3);

  return (
    <section id="stories" className="px-6 py-24 lg:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>From Home</Eyebrow>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[0.95]">
            Stories that keep us connected.
          </h2>
        </div>
        <Link href="/stories" className="text-[12px] font-bold text-gold hover:underline">
          Read all stories →
        </Link>
      </div>

      {stories.length === 0 ? (
        <EmptyState
          title="No stories published yet"
          description="Heritage, people and community stories will appear here as they're written and reviewed."
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr_1fr]">
          {stories.map((story, i) => (
            <Link
              href={`/stories/${story.slug}`}
              key={story.id}
              className={`group border border-cocoa/10 bg-white/40 transition hover:border-gold/50 dark:border-ivory/10 dark:bg-white/[0.02] ${
                i === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <div
                className={`flex items-end bg-gradient-to-br from-cocoa to-[#a5762c] p-5 text-[10px] font-bold tracking-[0.2em] text-ivory ${
                  i === 0 ? "h-[290px]" : "h-[205px]"
                }`}
              >
                {story.category.toUpperCase()}
              </div>
              <div className="p-5">
                <h3 className={`font-display ${i === 0 ? "text-2xl" : "text-lg"}`}>
                  {story.title}
                </h3>
                {i === 0 && (
                  <span className="mt-3 inline-block text-[12px] font-bold text-gold group-hover:underline">
                    Read story →
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
