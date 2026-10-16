import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";

const CATEGORIES = [
  { label: "Places", href: "/places?type=landmark", desc: "Discover landmarks, hidden gems and places worth experiencing." },
  { label: "Heritage", href: "/places?type=heritage", desc: "The traditional institutions and royal heritage of Ijebuland." },
  { label: "Food", href: "/businesses?category=food-and-dining", desc: "Find local food, vendors and dining experiences." },
  { label: "Culture", href: "/stories?category=heritage", desc: "Festivals, ceremonies, music, dance and customs." },
  { label: "Businesses", href: "/businesses", desc: "Discover and support businesses across Ijebuland." },
];

export function ExploreGrid() {
  return (
    <section id="explore" className="px-6 py-24 lg:px-10">
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Start Here</Eyebrow>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[0.95]">
            Discover Ijebuland.
          </h2>
        </div>
        <p className="max-w-md text-cocoa/65 dark:text-ivory/65">
          One place to discover what makes Ijebuland special — from heritage
          and food to businesses and events.
        </p>
      </div>

      <div className="grid divide-y divide-cocoa/10 border-y border-cocoa/10 dark:divide-ivory/10 dark:border-ivory/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
        {CATEGORIES.map((cat) => (
          <Link
            href={cat.href}
            key={cat.label}
            className="group relative min-h-[240px] p-6 transition hover:bg-gold/5"
          >
            <span className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-gold text-lg text-ink">
              {cat.label[0]}
            </span>
            <h3 className="font-display text-lg">{cat.label}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-cocoa/60 dark:text-ivory/60">
              {cat.desc}
            </p>
            <span className="absolute bottom-5 right-5 text-gold transition group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
