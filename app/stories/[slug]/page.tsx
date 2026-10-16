import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/lib/data/stories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story not found — Ilé Ìjẹ̀bú" };
  return { title: `${story.title} — Ilé Ìjẹ̀bú`, description: story.excerpt ?? undefined };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
        {story.category.toUpperCase()}
        {story.published_at
          ? ` · ${new Date(story.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
          : ""}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] lg:text-5xl">
        {story.title}
      </h1>

      {story.body ? (
        <div className="prose prose-lg mt-10 max-w-none leading-relaxed text-cocoa/80 dark:text-ivory/80">
          {/* body is markdown from the CMS; render as plain paragraphs for now.
              Swap in a markdown renderer (e.g. react-markdown) once content exists. */}
          {story.body.split("\n\n").map((para, i) => (
            <p key={i} className="mb-5">{para}</p>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-cocoa/50 dark:text-ivory/50">
          This story doesn&apos;t have content yet.
        </p>
      )}
    </main>
  );
}
