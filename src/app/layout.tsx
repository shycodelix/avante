import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getLiveMatches, getSocials } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avante Esports — Built to move forward",
    template: "%s · Avante Esports",
  },
  description:
    "Cebu-born esports media house. A newsroom, creative studio, talent agency and event platform for Philippine esports — competition, coverage and culture across every title.",
  keywords: [
    "Avante Esports",
    "Philippine esports",
    "Cebu esports",
    "esports media",
    "grassroots tournaments",
    "creator agency",
    "cosplay",
    "watch parties",
  ],
  authors: [{ name: "Avante Esports" }],
  creator: "@avanteesports.gg",
  openGraph: {
    type: "website",
    siteName: "Avante Esports",
    locale: "en_PH",
    title: "Avante Esports — Built to move forward",
    description:
      "Built to move forward. For the love of the game. News, competition, partnerships and experiences from a Cebu-born esports media house.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@avanteesports.gg",
    creator: "@avanteesports.gg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const liveCount = (await getLiveMatches()).length;
  const socials = getSocials();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cobalt focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader liveCount={liveCount} socials={socials} />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
