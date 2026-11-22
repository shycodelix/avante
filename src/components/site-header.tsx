"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis-store";
import type { SocialLink } from "@/lib/types";
import { SocialLinks } from "@/components/social-links";

const NAV = [
  { href: "/", label: "Studio" },
  { href: "/news", label: "News" },
  { href: "/matches", label: "Matches" },
  { href: "/leagues", label: "Leagues" },
  { href: "/transfers", label: "Transfers" },
  { href: "/cosplay", label: "Cosplay" },
  { href: "/events", label: "Events" },
  { href: "/gaming-tech", label: "Tech" },
];

const MENU_LINKS = [
  { href: "/news", label: "News", note: "Reporting and league announcements" },
  { href: "/matches", label: "Matches", note: "Live scores, fixtures and results" },
  { href: "/leagues", label: "Leagues", note: "Standings and season formats" },
  { href: "/transfers", label: "Transfers", note: "Signings, reports and rumours" },
  { href: "/cosplay", label: "Cosplay", note: "Builds, makers and studio shoots" },
  { href: "/events", label: "Events", note: "LANs, online cups and studio nights" },
  { href: "/gaming-tech", label: "Gaming & tech", note: "Hardware, patches and meta" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({
  liveCount,
  socials,
}: {
  liveCount: number;
  socials: SocialLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      getLenis()?.start();
      return;
    }

    getLenis()?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-bone/10 bg-ink/85 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-2"
            aria-label="Avante Esports — home"
          >
            <span className="font-display text-[1.4rem] font-extrabold leading-none tracking-[-0.055em] md:text-2xl">
              AVANTE
            </span>
            <span className="mb-[3px] block h-2 w-2 bg-cobalt transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-[13px] transition-colors",
                    active ? "text-bone" : "text-bone/55 hover:text-bone",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-cobalt" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <SocialLinks
              links={socials}
              variant="icons"
              className="mr-1 hidden gap-0.5 xl:flex"
            />
            <Link
              href="/matches"
              className={cn(
                "hidden items-center gap-2 border px-2.5 py-1.5 text-[11px] transition-colors sm:inline-flex",
                liveCount > 0
                  ? "border-live/40 text-bone hover:border-live"
                  : "border-bone/15 text-bone/55 hover:border-bone/30 hover:text-bone",
              )}
            >
              <span className="relative flex h-1.5 w-1.5">
                {liveCount > 0 && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-live opacity-75" />
                )}
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    liveCount > 0 ? "bg-live" : "bg-bone/40",
                  )}
                />
              </span>
              {liveCount > 0 ? `${liveCount} on air` : "Off air"}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-9 items-center gap-2 border border-bone/15 px-3 text-[12px] text-bone/80 transition-colors hover:border-bone/40 hover:text-bone lg:hidden"
            >
              {open ? "Close" : "Menu"}
              <span className="flex flex-col gap-[3px]" aria-hidden>
                <span
                  className={cn(
                    "block h-px w-3.5 bg-current transition-transform",
                    open && "translate-y-[4px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-3.5 bg-current transition-opacity",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-3.5 bg-current transition-transform",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Sibling of the header, not a child: `backdrop-blur` on the header would
          otherwise become the containing block and collapse this fixed overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-bone/10 bg-ink md:top-[72px] lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Hubs" className="wrap flex min-h-full flex-col py-6">
              <Link
                href="/"
                className="group flex items-baseline justify-between border-b border-bone/10 py-4"
              >
                <span className="font-display text-2xl tracking-tight">Studio</span>
                <span className="text-[11px] text-bone/40">Organisation & work</span>
              </Link>
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group border-b border-bone/10 py-4"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl tracking-tight text-bone">
                      {link.label}
                    </span>
                    <span className="hidden shrink-0 text-[11px] text-bone/40 sm:block">
                      {link.note}
                    </span>
                  </span>
                </Link>
              ))}
              <div className="mt-auto pt-8">
                <SocialLinks
                  links={socials}
                  variant="text"
                  className="text-[11px] text-bone/45"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-bone/10 pt-4 text-[11px] text-bone/40">
                  <span>Cebu · Philippines · est. 2019</span>
                  <a
                    className="text-bone/70 underline decoration-cobalt decoration-2 underline-offset-4"
                    href="mailto:studio@avante.gg"
                  >
                    studio@avante.gg
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
