import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="woven-border bg-cocoa-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-xl tracking-wide">ILÉ ÌJẸ̀BÚ</p>
          <p className="mt-2 text-[13px] text-ivory/60">A Home for Every Ọmọ Alárẹ.</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-ivory/70 lg:items-start">
          <Link href="/" className="hover:text-gold">Home</Link>
          <Link href="/#explore" className="hover:text-gold">Explore</Link>
          <Link href="/businesses" className="hover:text-gold">Businesses</Link>
          <Link href="/events" className="hover:text-gold">Events</Link>
          <Link href="/stories" className="hover:text-gold">Stories</Link>
        </div>

        <div className="text-[13px] text-ivory/60 lg:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Partnerships</p>
          <p className="mt-1">partnerships@ileijebu.com</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-ivory/40">
            Ijebuland · Ogun State · Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
