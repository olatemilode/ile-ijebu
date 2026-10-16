import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MockDataBanner } from "@/components/mock-data-banner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ilé Ìjẹ̀bú — A Home for Every Ọmọ Alárẹ",
  description:
    "The digital home of Ijebuland — discover the people, places, businesses, culture and stories that make Ijebuland home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Runs before paint to avoid a flash of the wrong theme.
          // Kept tiny and inline on purpose — this cannot be a module import.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} font-body bg-ivory text-cocoa dark:bg-ink dark:text-ivory antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <MockDataBanner />
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
