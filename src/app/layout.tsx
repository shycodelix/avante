import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getLiveMatches } from "@/lib/content";
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
    default: "Avante Esports — Organisation & Creative Studio",
    template: "%s · Avante Esports",
  },
  description:
    "Avante Esports is an esports organisation and a creative studio. Competition, broadcast craft and culture coverage across League of Legends, VALORANT, CS2, Rocket League and beyond.",
  openGraph: {
    type: "website",
    siteName: "Avante Esports",
    title: "Avante Esports — Organisation & Creative Studio",
    description:
      "Teams, broadcast craft and the wider scene: news, live matches, leagues, transfers, cosplay and events from the Avante desk.",
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const liveCount = (await getLiveMatches()).length;

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
        <SiteHeader liveCount={liveCount} />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
