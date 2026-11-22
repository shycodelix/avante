import { cn } from "@/lib/cn";

interface BadgeStyle {
  label: string;
  className: string;
  dot?: string;
}

const STYLES: Record<string, BadgeStyle> = {
  live: {
    label: "Live",
    className: "border-live/50 bg-live/15 text-bone",
    dot: "bg-live",
  },
  upcoming: {
    label: "Upcoming",
    className: "border-bone/20 bg-bone/5 text-bone/65",
  },
  completed: {
    label: "Final",
    className: "border-bone/12 bg-transparent text-bone/50",
  },
  confirmed: {
    label: "Confirmed",
    className: "border-bone/25 bg-bone/[0.07] text-bone",
  },
  report: {
    label: "Report",
    className: "border-cobalt/55 bg-cobalt/15 text-bone",
  },
  rumour: {
    label: "Rumour",
    className: "border-dashed border-bone/30 text-bone/55",
  },
  "on-sale": {
    label: "Tickets",
    className: "border-bone/25 text-bone/75",
  },
  "sold-out": {
    label: "Sold out",
    className: "border-bone/12 text-bone/40",
  },
  "free-entry": {
    label: "Free entry",
    className: "border-cobalt/45 bg-cobalt/10 text-bone/85",
  },
  "invite-only": {
    label: "Invite only",
    className: "border-dashed border-bone/25 text-bone/55",
  },
  sources: {
    label: "Sources",
    className: "border-cobalt/55 bg-cobalt/15 text-bone",
  },
  rumour_article: {
    label: "Rumour",
    className: "border-dashed border-bone/30 text-bone/55",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const style = STYLES[status] ?? {
    label: status,
    className: "border-bone/20 text-bone/60",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 border px-2 py-0.5 text-[10px] leading-4 tracking-wide",
        style.className,
        className,
      )}
    >
      {style.dot && (
        <span className={cn("h-1 w-1 rounded-full", style.dot)} aria-hidden />
      )}
      {style.label}
    </span>
  );
}
