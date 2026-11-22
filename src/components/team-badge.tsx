import { cn } from "@/lib/cn";
import type { Team } from "@/lib/types";

const SIZES = {
  sm: "h-6 w-6 text-[9px]",
  md: "h-8 w-8 text-[10px]",
  lg: "h-10 w-10 text-[11px]",
} as const;

export function TeamBadge({
  team,
  size = "md",
  className,
}: {
  team: Team;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center border font-display font-bold tracking-tight",
        SIZES[size],
        className,
      )}
      style={{
        color: team.accent,
        borderColor: `color-mix(in srgb, ${team.accent} 45%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${team.accent} 12%, transparent)`,
      }}
    >
      {team.short.slice(0, 3)}
    </span>
  );
}
