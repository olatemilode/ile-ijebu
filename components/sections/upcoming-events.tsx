import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EmptyState } from "@/components/ui/empty-state";
import { getUpcomingEvents } from "@/lib/data/events";

function formatEventDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-US", { day: "2-digit" }),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
  };
}

export async function UpcomingEvents() {
  const events = await getUpcomingEvents(3);

  return (
    <section id="events" className="bg-cocoa/[0.03] px-6 py-24 dark:bg-white/[0.02] lg:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>What&apos;s Happening</Eyebrow>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[0.95]">
            Events in Ijebuland.
          </h2>
        </div>
        <Link href="/events" className="text-[12px] font-bold text-gold hover:underline">
          View all events →
        </Link>
      </div>

      {events.length === 0 ? (
        <EmptyState
          title="No upcoming events yet"
          description="Community, business and cultural events will appear here once submitted and approved."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const { day, month } = formatEventDate(event.event_date);
            return (
              <Link
                href={`/events/${event.slug}`}
                key={event.id}
                className="group relative flex min-h-[145px] items-center gap-5 border border-cocoa/10 bg-white/40 p-6 transition hover:border-gold/50 dark:border-ivory/10 dark:bg-white/[0.02]"
              >
                <div className="min-w-[58px] text-center text-gold">
                  <strong className="block font-display text-4xl">{day}</strong>
                  <span className="text-[8px] tracking-[0.16em]">{month}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg">{event.title}</h3>
                  <p className="text-[12px] text-cocoa/55 dark:text-ivory/55">
                    {event.location ?? "Ijebuland"}
                  </p>
                </div>
                <span className="absolute bottom-4 right-5 text-gold transition group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
