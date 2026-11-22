import Link from "next/link";

import { StatusBadge } from "@/components/status-badge";
import { TeamBadge } from "@/components/team-badge";
import { teamById, titleById } from "@/data/catalogue";
import { cn } from "@/lib/cn";
import { formatKickoff, formatTime } from "@/lib/format";
import type { Match, Team } from "@/lib/types";

function teamOf(id: string): Team {
  return (
    teamById.get(id) ?? {
      id,
      name: id,
      short: id.slice(0, 3).toUpperCase(),
      titleId: "league-of-legends",
      region: "Global",
      accent: "#6b7280",
    }
  );
}

function SideRow({
  team,
  score,
  state,
  time,
}: {
  team: Team;
  score: number | null;
  state: "winner" | "loser" | "even" | "scheduled";
  time?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex min-w-0 items-center gap-2.5">
        <TeamBadge team={team} size="md" />
        <span
          className={cn(
            "truncate text-[13px]",
            state === "loser" || state === "scheduled"
              ? "text-bone/60"
              : "text-bone",
          )}
        >
          {team.name}
        </span>
      </span>
      {time ? (
        <span className="shrink-0 font-display text-sm text-bone/50 tnum">{time}</span>
      ) : (
        <span
          className={cn(
            "shrink-0 font-display text-2xl leading-none tnum",
            state === "winner" ? "text-bone" : "text-bone/45",
          )}
        >
          {score ?? "–"}
        </span>
      )}
    </div>
  );
}

function stateFor(match: Match, side: "home" | "away"): "winner" | "loser" | "even" | "scheduled" {
  if (match.status === "upcoming") return "scheduled";
  const own = side === "home" ? match.home.score : match.away.score;
  const other = side === "home" ? match.away.score : match.home.score;
  if (own === null || other === null) return "even";
  if (own === other) return "even";
  return own > other ? "winner" : "loser";
}

export function MatchCard({ match }: { match: Match }) {
  const home = teamOf(match.home.teamId);
  const away = teamOf(match.away.teamId);
  const title = titleById.get(match.titleId);
  const isLive = match.status === "live";

  return (
    <article
      className={cn(
        "group relative flex flex-col border bg-ink-2 p-4 transition-colors duration-300",
        isLive
          ? "border-live/35 hover:border-live/60"
          : "border-bone/10 hover:border-bone/25",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] text-bone/45">
            {title?.short} · {match.stage}
          </p>
          <p className="mt-0.5 truncate text-[12px] text-bone/70">{match.tournament}</p>
        </div>
        <StatusBadge status={match.status} />
      </header>

      <div className="mt-5 space-y-2.5">
        <SideRow
          team={home}
          score={match.home.score}
          state={stateFor(match, "home")}
          time={match.status === "upcoming" ? formatTime(match.startsAt) : undefined}
        />
        <SideRow
          team={away}
          score={match.away.score}
          state={stateFor(match, "away")}
        />
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-bone/10 pt-3 text-[11px] text-bone/45">
        <span>{formatKickoff(match.startsAt)}</span>
        <span className="truncate text-right">
          {match.status === "completed" ? `BO${match.bestOf} · final` : `BO${match.bestOf}`}
        </span>
      </footer>

      {match.note && (
        <p
          className={cn(
            "mt-2.5 text-[11px]",
            isLive ? "text-live/90" : "text-bone/40",
          )}
        >
          {match.note}
        </p>
      )}
    </article>
  );
}

/** Compact broadcast-slate row for the landing hero and tickers. */
export function MatchSlate({ match }: { match: Match }) {
  const home = teamOf(match.home.teamId);
  const away = teamOf(match.away.teamId);
  const title = titleById.get(match.titleId);
  const isLive = match.status === "live";

  return (
    <Link
      href="/matches"
      className="group flex min-w-0 flex-1 items-center gap-3 border border-bone/10 bg-ink/40 px-3 py-2.5 backdrop-blur-sm transition-colors hover:border-bone/30"
    >
      <span className="flex shrink-0 flex-col items-start gap-1">
        <span
          className={cn(
            "text-[9px] leading-none",
            isLive ? "text-live" : "text-bone/40",
          )}
        >
          {isLive ? "● LIVE" : formatTime(match.startsAt)}
        </span>
        <span className="text-[9px] leading-none text-bone/35">{title?.short}</span>
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-2 text-[12px]">
        <span className="flex min-w-0 items-center gap-2">
          <span className="font-display font-bold text-bone/80">{home.short}</span>
          {match.home.score !== null && (
            <span className={cn("tnum", isLive ? "text-live" : "text-bone/60")}>
              {match.home.score}
            </span>
          )}
        </span>
        <span className="text-bone/25">–</span>
        <span className="flex min-w-0 items-center gap-2">
          {match.away.score !== null && (
            <span className={cn("tnum", isLive ? "text-live" : "text-bone/60")}>
              {match.away.score}
            </span>
          )}
          <span className="truncate font-display font-bold text-bone/80">
            {away.short}
          </span>
        </span>
      </span>
      <span className="shrink-0 text-[10px] text-bone/30 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
