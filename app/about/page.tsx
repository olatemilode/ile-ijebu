import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "About — Ilé Ìjẹ̀bú",
  description: "The digital home of Ijebuland — our mission, vision and the problem we're solving.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <Eyebrow>Who We Are</Eyebrow>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95]">
        A Home for Every Ọmọ Alárẹ.
      </h1>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="font-display text-2xl text-gold">Vision</h2>
          <p className="mt-3 leading-relaxed text-cocoa/75 dark:text-ivory/75">
            To become the trusted digital home of Ijebuland for generations to come.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-gold">Mission</h2>
          <p className="mt-3 leading-relaxed text-cocoa/75 dark:text-ivory/75">
            To preserve heritage, promote local businesses, connect people,
            and create opportunities through technology.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-gold">The Problem</h2>
          <p className="mt-3 leading-relaxed text-cocoa/75 dark:text-ivory/75">
            Ijebuland has a rich cultural identity and an active local
            economy, but information about places, businesses, events,
            heritage, and community stories is often fragmented across
            social media, word of mouth, and disconnected platforms. Ilé
            Ìjẹ̀bú brings these experiences together in one trusted digital
            destination.
          </p>
        </section>
      </div>
    </main>
  );
}
