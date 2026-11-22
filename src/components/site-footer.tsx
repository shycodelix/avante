import Link from "next/link";

import { getHubs } from "@/lib/content";

const STUDIO_LINKS = [
  { href: "/#studio", label: "Studio work" },
  { href: "/#talent", label: "Rosters" },
  { href: "/#contact", label: "Start a project" },
];

const SOCIAL_LINKS = [
  { href: "https://twitch.tv/avante", label: "Twitch" },
  { href: "https://youtube.com/@avante", label: "YouTube" },
  { href: "https://instagram.com/avante.gg", label: "Instagram" },
  { href: "https://x.com/avante_gg", label: "X" },
];

export async function SiteFooter() {
  const hubs = await getHubs();

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
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-bone/50">
              An esports organisation and a creative studio. Four rosters, one
              broadcast desk, and a newsroom covering the scene from Berlin.
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
            <h2 className="text-[10px] tracking-[0.02em] text-bone/35">Studio</h2>
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
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] text-bone/60 transition-colors hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 py-6 text-[11px] text-bone/35">
          <p>© 2026 Avante Esports. All rights reserved.</p>
          <p>Berlin · São Paulo · Seoul</p>
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
