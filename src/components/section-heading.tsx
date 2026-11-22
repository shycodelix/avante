import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  action?: { href: string; label: string };
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <Reveal
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-10 gap-y-5",
        light ? "text-ink" : "text-bone",
        className,
      )}
    >
      <div className="max-w-2xl">
        <div
          className={cn(
            "flex items-center gap-2 text-[11px]",
            light ? "text-ink/55" : "text-bone/45",
          )}
        >
          <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden />
          {eyebrow}
        </div>
        <h2 className="display-lg mt-3">{title}</h2>
        {description && (
          <p
            className={cn(
              "mt-3 max-w-xl text-sm leading-relaxed",
              light ? "text-ink/65" : "text-bone/55",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex items-center gap-2 border-b pb-1 text-[12px] transition-colors",
            light
              ? "border-ink/25 text-ink/75 hover:border-cobalt hover:text-ink"
              : "border-bone/25 text-bone/70 hover:border-cobalt hover:text-bone",
          )}
        >
          {action.label}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </Reveal>
  );
}
