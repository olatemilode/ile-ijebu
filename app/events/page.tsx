import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EmptyState } from "@/components/ui/empty-state";
import { getAllEvents } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events — Ilé Ìjẹ̀bú",
  description: "Cultural, community and business events happening across Ijebuland.",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <main className="px-6 py-20 lg:px-10">
      <Eyebrow>What&apos;s Happening</Eyebrow>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95]">
        Events in Ijebuland.
      </h1>
      <p className="mt-4 max-w-xl text-cocoa/65 dark:text-ivory/65">
        Cultural, community, business, entertainment and educational events
        happening across Ijebuland.
      </p>

      <div className="mt-12">
        {events.length === 0 ? (
          <EmptyState
            title="No events scheduled yet"
            description="Check back soon, or submit an event once submissions open."
          />
        ) : (
          <div className="divide-y divide-cocoa/10 border-y border-cocoa/10 dark:divide-ivory/10 dark:border-ivory/10">
            {events.map((event) => (
              <Link
                href={`/events/${event.slug}`}
                key={event.id}
                className="group flex items-center gap-6 py-6 transition hover:bg-gold/5"
              >
                <div className="min-w-[64px] text-center text-gold">
                  <strong className="block font-display text-3xl">
                    {new Date(event.event_date + "T00:00:00").getDate()}
                  </strong>
                  <span className="text-[9px] tracking-[0.16em]">
                    {new Date(event.event_date + "T00:00:00")
                      .toLocaleDateString("en-US", { month: "short" })
                      .toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl">{event.title}</h3>
                  <p className="text-[13px] text-cocoa/55 dark:text-ivory/55">
                    {event.location ?? "Ijebuland"}
                    {event.organizer ? ` · ${event.organizer}` : ""}
                  </p>
                </div>
                <span className="text-gold transition group-hover:translate-x-1">↗</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
