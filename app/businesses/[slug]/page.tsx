import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/data/businesses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) return { title: "Business not found — Ilé Ìjẹ̀bú" };
  return {
    title: `${business.name} — Ilé Ìjẹ̀bú`,
    description: business.description ?? undefined,
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) notFound();

  return (
    <main>
      <div className="relative flex h-[320px] items-end bg-gradient-to-br from-cocoa to-[#8c622d] px-6 py-10 lg:px-10">
        {business.cover_image_url && (
          <Image
            src={business.cover_image_url}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-10">
          {business.verified && (
            <small className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
              ✓ Verified Business
            </small>
          )}
          <h1 className="mt-1 font-display text-4xl text-ivory lg:text-5xl">
            {business.name}
          </h1>
          <p className="mt-2 text-ivory/70">{business.category}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 lg:grid-cols-[2fr_1fr] lg:px-10">
        <div>
          <h2 className="font-display text-2xl">About</h2>
          <p className="mt-3 leading-relaxed text-cocoa/70 dark:text-ivory/70">
            {business.description ?? "No description provided yet."}
          </p>
        </div>

        <aside className="space-y-4 border border-cocoa/10 p-6 text-sm dark:border-ivory/10">
          <h2 className="font-display text-lg">Contact</h2>
          {business.address && <p>{business.address}</p>}
          {business.phone && <p>{business.phone}</p>}
          {business.whatsapp && <p>WhatsApp: {business.whatsapp}</p>}
          {business.email && <p>{business.email}</p>}
          {!business.address && !business.phone && !business.email && (
            <p className="text-cocoa/50 dark:text-ivory/50">
              No contact details listed yet.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
