import Link from "next/link";

import type { HubDefinition } from "@/lib/types";

export function HubGrid({ hubs }: { hubs: HubDefinition[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {hubs.map((hub) => (
        <Link
          key={hub.id}
          href={hub.href}
          className="group relative flex min-h-[184px] flex-col justify-between border border-bone/10 bg-ink p-5 transition-colors duration-300 hover:border-bone/30"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl tracking-[-0.03em] text-bone">
              {hub.name}
            </h3>
            <span className="shrink-0 text-[10px] text-bone/30">{hub.count}</span>
          </div>
          <div>
            <p className="text-[12px] leading-relaxed text-bone/50">
              {hub.description}
            </p>
            <span className="mt-4 flex items-center gap-2 text-[11px] text-bone/35 transition-colors group-hover:text-bone/80">
              Open desk
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cobalt transition-transform duration-500 group-hover:scale-x-100"
            aria-hidden
          />
        </Link>
      ))}
    </div>
  );
}
