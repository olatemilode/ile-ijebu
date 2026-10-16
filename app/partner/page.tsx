import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PartnerForm } from "./partner-form";

export const metadata: Metadata = {
  title: "Partner With Us — Ilé Ìjẹ̀bú",
  description: "Business partnership, sponsorship and community project opportunities with Ilé Ìjẹ̀bú.",
};

export default function PartnerPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <Eyebrow>Build With Us</Eyebrow>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95]">
        Partner with Ilé Ìjẹ̀bú.
      </h1>
      <p className="mt-4 max-w-xl text-cocoa/65 dark:text-ivory/65">
        Featured listings, promotional opportunities, event promotion,
        sponsorships, and community projects — tell us how you&apos;d like
        to work with us.
      </p>

      <div className="mt-12">
        <PartnerForm />
      </div>
    </main>
  );
}
