import Link from "next/link";

export function Hero() {
  return (
    <section className="grid border-b border-cocoa/10 dark:border-ivory/10 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-20 lg:px-10 lg:py-28">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          The Digital Home of Ijebuland
        </p>
        <h1 className="text-balance font-display text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight">
          A home for
          <br />
          <em className="text-gold not-italic">every Ọmọ Alárẹ.</em>
        </h1>
        <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-cocoa/70 dark:text-ivory/70">
          Discover the people, places, businesses, culture and stories that
          make Ijebuland home — wherever in the world you call home now.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/#explore"
            className="border border-gold bg-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-ink transition hover:bg-gold-deep"
          >
            Explore Ijebuland ↗
          </Link>
          <Link
            href="/businesses"
            className="border border-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest transition hover:bg-gold/10"
          >
            Discover Businesses
          </Link>
        </div>
        <p className="mt-11 text-[10px] uppercase tracking-[0.18em] text-cocoa/45 dark:text-ivory/45">
          Culture · Community · Commerce · Connection
        </p>
      </div>

      <div className="relative min-h-[420px] overflow-hidden bg-cocoa dark:bg-ink">
        <div
          className="absolute -right-10 top-[10%] h-52 w-52 rounded-full bg-gold opacity-90"
          aria-hidden
        />
        <div
          className="absolute -left-[8%] bottom-[-14%] h-[52%] w-[110%] rounded-t-[50%] bg-[#2a1b11] [transform:rotate(-7deg)]"
          aria-hidden
        />
        <div
          className="absolute -right-[25%] bottom-[-14%] h-[42%] w-full rounded-t-[50%] bg-[#694521] opacity-60 [transform:rotate(-7deg)]"
          aria-hidden
        />
        <span
          className="absolute bottom-[8%] left-[8%] text-[11px] font-bold tracking-[0.22em] text-ivory"
          aria-hidden
        >
          IJEBULAND
          <br />
          <small className="text-[8px] font-normal tracking-[0.15em] text-ivory/60">
            OGUN STATE, NIGERIA
          </small>
        </span>
      </div>
    </section>
  );
}
