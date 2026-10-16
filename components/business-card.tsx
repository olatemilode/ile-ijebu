import Link from "next/link";
import Image from "next/image";
import type { Business } from "@/lib/types/database";

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className="group block border border-cocoa/10 bg-white/40 transition hover:border-gold/50 dark:border-ivory/10 dark:bg-white/[0.02]"
    >
      <div className="relative flex h-[220px] items-end bg-gradient-to-br from-cocoa to-[#8c622d] p-5">
        {business.cover_image_url ? (
          <Image
            src={business.cover_image_url}
            alt={business.name}
            fill
            className="object-cover"
          />
        ) : (
          <span className="font-display text-5xl text-gold/80">
            {business.name[0]}
          </span>
        )}
      </div>
      <div className="p-6">
        {business.verified && (
          <small className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold">
            ✓ Verified
          </small>
        )}
        <h3 className="mt-1 font-display text-lg">{business.name}</h3>
        <p className="mt-1 text-[12px] text-cocoa/55 dark:text-ivory/55">
          {business.category}
          {business.address ? ` · ${business.address}` : ""}
        </p>
        <span className="mt-3 inline-block text-[12px] font-bold text-gold group-hover:underline">
          View business →
        </span>
      </div>
    </Link>
  );
}
