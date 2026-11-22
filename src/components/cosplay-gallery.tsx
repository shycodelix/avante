"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis-store";
import type { CosplayEntry } from "@/lib/types";

const TILE_GRADIENTS = [
  "linear-gradient(150deg, #1a2436 0%, #0d1013 70%)",
  "linear-gradient(150deg, #2a1f2e 0%, #0d1013 70%)",
  "linear-gradient(150deg, #142a26 0%, #0d1013 70%)",
  "linear-gradient(150deg, #2c2519 0%, #0d1013 70%)",
];

export function CosplayGallery({ entries }: { entries: CosplayEntry[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : entries[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) =>
        current === null
          ? current
          : (current + direction + entries.length) % entries.length,
      );
    },
    [entries.length],
  );

  useEffect(() => {
    if (activeIndex === null) {
      getLenis()?.start();
      document.body.style.overflow = "";
      return;
    }

    getLenis()?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [activeIndex, close, step]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full overflow-hidden border border-bone/10 text-left transition-colors hover:border-bone/30"
              aria-label={`Open ${entry.name} as ${entry.character}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
                {entry.image ? (
                  <Image
                    src={entry.image}
                    alt={entry.imageAlt ?? `${entry.name} as ${entry.character}`}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    className="flex h-full flex-col justify-between p-5"
                    style={{
                      background:
                        TILE_GRADIENTS[index % TILE_GRADIENTS.length],
                    }}
                  >
                    <span className="text-[10px] text-bone/40">
                      {entry.franchise}
                    </span>
                    <div>
                      <span className="block break-words font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[0.95] tracking-[-0.04em] text-bone/85">
                        {entry.character}
                      </span>
                      <span className="mt-2 block text-[11px] text-bone/45">
                        {entry.name} · {entry.location}
                      </span>
                    </div>
                  </div>
                )}

                {entry.image && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 pt-10">
                    <p className="font-display text-lg leading-none tracking-tight text-bone">
                      {entry.character}
                    </p>
                    <p className="mt-1 text-[11px] text-bone/55">
                      {entry.name} · {entry.location}
                    </p>
                  </div>
                )}

                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-bone/20 bg-ink/60 text-[11px] text-bone/70 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  +
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} as ${active.character}`}
            onClick={close}
          >
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid max-h-full w-full max-w-5xl grid-cols-1 overflow-y-auto border border-bone/15 bg-ink-2 md:grid-cols-[1.3fr_1fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative min-h-[320px] bg-ink-3 md:min-h-[520px]">
                {active.image ? (
                  <Image
                    src={active.image}
                    alt={active.imageAlt ?? `${active.name} as ${active.character}`}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover object-[50%_24%]"
                  />
                ) : (
                  <div
                    className="flex h-full min-h-[320px] flex-col justify-end p-8"
                    style={{ background: TILE_GRADIENTS[0] }}
                  >
                    <span className="font-display text-5xl leading-none tracking-tight text-bone/80">
                      {active.character}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[10px] text-bone/40">{active.franchise}</p>
                  <button
                    type="button"
                    onClick={close}
                    autoFocus
                    className="border border-bone/20 px-2 py-1 text-[10px] text-bone/70 transition-colors hover:border-bone/50 hover:text-bone"
                  >
                    Close
                  </button>
                </div>

                <h2 className="display-lg mt-8">{active.character}</h2>
                <p className="mt-2 text-sm text-bone/60">
                  Cosplay by {active.name}
                </p>

                <dl className="mt-8 space-y-3 border-t border-bone/10 pt-5 text-[12px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-bone/40">Photography</dt>
                    <dd className="text-right text-bone/75">{active.photographer}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-bone/40">Build</dt>
                    <dd className="text-right text-bone/75">{active.builder}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-bone/40">Based in</dt>
                    <dd className="text-right text-bone/75">{active.location}</dd>
                  </div>
                </dl>

                {active.quote && (
                  <blockquote className="mt-6 border-l border-cobalt pl-4 text-[13px] leading-relaxed text-bone/70">
                    “{active.quote}”
                  </blockquote>
                )}

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {active.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-bone/15 px-2 py-0.5 text-[10px] text-bone/50"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/60",
                      "transition-colors hover:border-bone/50 hover:text-bone",
                    )}
                    aria-label="Previous cosplay"
                  >
                    ←
                  </button>
                  <span className="text-[10px] text-bone/35 tnum">
                    {(activeIndex ?? 0) + 1} / {entries.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/60 transition-colors hover:border-bone/50 hover:text-bone"
                    aria-label="Next cosplay"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
