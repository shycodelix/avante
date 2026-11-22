import Link from "next/link";

import { SocialLinks } from "@/components/social-links";
import { getBrand, getHubs, getSocials } from "@/lib/content";

const STUDIO_LINKS = [
  { href: "/#what-we-do", label: "What we do" },
  { href: "/#studio", label: "Studio work" },
  { href: "/#talent", label: "Rosters" },
  { href: "/#contact", label: "Start a project" },
];

export async function SiteFooter() {
  const [hubs, socials, brand] = await Promise.all([
    getHubs(),
    Promise.resolve(getSocials()),
    Promise.resolve(getBrand()),
  ]);

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <div className="wrap pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold tracking-[-0.05em]">
                AVANTE
              </span>
              <span className="mb-[3px] block h-2 w-2 bg-cobalt" aria-hidden />
            </Link>
            <p className="mt-5 max-w-sm font-display text-[15px] leading-snug tracking-[-0.02em] text-bone/85">
              {brand.tagline}
            </p>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-bone/50">
              {brand.intro}
            </p>
            <a
              href="mailto:studio@avante.gg"
              className="mt-6 inline-flex border-b border-bone/25 pb-0.5 text-[13px] text-bone/80 transition-colors hover:border-cobalt hover:text-bone"
            >
              studio@avante.gg
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h2 className="text-[10px] tracking-[0.02em] text-bone/35">Desks</h2>
            <ul className="mt-4 space-y-2">
              {hubs.map((hub) => (
                <li key={hub.id}>
                  <Link
                    href={hub.href}
                    className="text-[13px] text-bone/60 transition-colors hover:text-bone"
                  >
                    {hub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[10px] tracking-[0.02em] text-bone/35">Up close</h2>
            <ul className="mt-4 space-y-2">
              {STUDIO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-bone/60 transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-[10px] tracking-[0.02em] text-bone/35">
              Follow
            </h2>
            <SocialLinks
              links={socials}
              variant="text"
              className="mt-4 text-[13px] text-bone/60"
            />
            <p className="mt-2 text-[11px] text-bone/35">{socials[0]?.handle}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 py-6 text-[11px] text-bone/35">
          <p>© 2026 Avante Esports. All rights reserved.</p>
          <p>{brand.location} · est. {brand.founded}</p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-3"
      >
        <span className="block translate-y-[14%] font-display text-[19vw] font-extrabold leading-none tracking-[-0.06em] text-bone/[0.055]">
          AVANTE
        </span>
      </div>
    </footer>
  );
}
