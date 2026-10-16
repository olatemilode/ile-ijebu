import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/#explore", label: "Explore" },
  { href: "/businesses", label: "Businesses" },
  { href: "/events", label: "Events" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/10 bg-ivory/90 backdrop-blur-md dark:border-ivory/10 dark:bg-ink/90">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-display text-2xl text-gold" aria-hidden>
            ⌂
          </span>
          <span className="font-display text-base font-medium leading-[0.85] tracking-tight">
            ILÉ
            <br />
            ÌJẸ̀BÚ
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cocoa/75 transition hover:text-gold dark:text-ivory/75 dark:hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/partner"
            className="hidden border border-gold px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-cocoa transition hover:bg-gold hover:text-ink dark:text-ivory sm:block"
          >
            Partner With Us
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
