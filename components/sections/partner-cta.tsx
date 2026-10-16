import Link from "next/link";

export function PartnerCta() {
  return (
    <section id="partner" className="bg-cocoa px-6 py-28 text-center text-ivory dark:bg-black dark:border-t dark:border-ivory/10 lg:px-10">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
        Build With Us
      </p>
      <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]">
        Own a business in Ijebuland?
      </h2>
      <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ivory/70">
        Put your business where people can discover it. Join the first
        generation of businesses on Ilé Ìjẹ̀bú.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/partner"
          className="border border-gold bg-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-ink transition hover:bg-gold-deep"
        >
          Join Ilé Ìjẹ̀bú →
        </Link>
        <Link
          href="/partner"
          className="border border-gold px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-ivory transition hover:bg-white/10"
        >
          Become a Partner
        </Link>
      </div>
    </section>
  );
}
