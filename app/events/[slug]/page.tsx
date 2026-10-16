import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/data/events";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found — Ilé Ìjẹ̀bú" };
  return { title: `${event.title} — Ilé Ìjẹ̀bú`, description: event.description ?? undefined };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const date = new Date(event.event_date + "T00:00:00");

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
        {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        {event.event_time ? ` · ${event.event_time}` : ""}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] lg:text-5xl">
        {event.title}
      </h1>
      <p className="mt-3 text-cocoa/60 dark:text-ivory/60">
        {event.location ?? "Ijebuland"}
        {event.organizer ? ` · Organized by ${event.organizer}` : ""}
      </p>

      {event.description && (
        <p className="mt-8 leading-relaxed text-cocoa/75 dark:text-ivory/75">
          {event.description}
        </p>
      )}

      {event.ticket_url && (
        <a
          href={event.ticket_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block border border-gold bg-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-ink transition hover:bg-gold-deep"
        >
          Get Tickets / Register ↗
        </a>
      )}
    </main>
  );
}
