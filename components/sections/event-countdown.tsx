import Link from "next/link";
import Countdown from "@/components/countdown";

export function EventCountdown() {
  const start = process.env.NEXT_PUBLIC_EVENT_START;
  const name = process.env.NEXT_PUBLIC_NAME ?? "Ojude Oba";

  if (!start) return null;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-widest opacity-70 sm:text-sm">
	Coming up
      </p>
      <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
        {name} starts in 
      </h2>

      <div className="mt-8">
        <Countdown target={start} />
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/live" className="rounded-lg border px-5 py-2.5 text-sm">
	   Watch Live
	</Link>
	<Link href="/events" className="rounded-lg border px-5 py-2.5 text-sm">
	   See all events
	</Link>
      </div>
    </section>
 );
}
