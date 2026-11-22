import type { Metadata } from "next";
import Link from "next/link";

import { FilterBar } from "@/components/filter-bar";
import { MatchCard } from "@/components/match-card";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { TeamBadge } from "@/components/team-badge";
import { titleById } from "@/data/catalogue";
import { getMatches, getTeamOrFallback, getTitles } from "@/lib/content";
import { formatKickoff } from "@/lib/format";
import type { Match, MatchStatus, TitleId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Matches & live tracker",
  description:
    "Live scores, upcoming fixtures and recent results across League of Legends, VALORANT, CS2, Rocket League, Dota 2 and Tekken 8.",
};

export const revalidate = 60;

interface MatchesPageProps {
  searchParams: Promise<{ title?: string; status?: string }>;
}

function ResultRow({ match }: { match: Match }) {
  const home = getTeamOrFallback(match.home.teamId);
  const away = getTeamOrFallback(match.away.teamId);
  const homeWon = (match.home.score ?? 0) > (match.away.score ?? 0);
  const title = titleById.get(match.titleId);

  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-bone/10 py-4 transition-colors hover:bg-bone/[0.02] md:grid-cols-[92px_1fr_1fr_auto] md:gap-6">
      <span className="hidden text-[11px] text-bone/40 tnum md:block">
        {formatKickoff(match.startsAt)}
      </span>
      <span className="flex min-w-0 items-center gap-2.5">
        <TeamBadge team={home} size="sm" />
        <span className={`truncate text-[13px] ${homeWon ? "text-bone" : "text-bone/50"}`}>
          {home.name}
        </span>
        <span className="font-display text-sm text-bone tnum">{match.home.score}</span>
      </span>
      <span className="flex min-w-0 items-center gap-2.5">
        <TeamBadge team={away} size="sm" />
        <span className={`truncate text-[13px] ${homeWon ? "text-bone/50" : "text-bone"}`}>
          {away.name}
        </span>
        <span className="font-display text-sm text-bone/70 tnum">{match.away.score}</span>
      </span>
      <span className="hidden justify-self-end text-[10px] text-bone/35 md:block">
        {title?.short} · {match.tournament}
      </span>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="border border-bone/15 bg-ink-2 p-8">
      <h2 className="display-lg">No fixtures in this view.</h2>
      <p className="mt-3 max-w-md text-sm text-bone/55">
        The schedule is quiet for this filter. Try another title, or look at
        what is live right now.
      </p>
      <Link
        href="/matches"
        className="mt-6 inline-flex border-b border-bone/25 pb-1 text-[12px] text-bone/70 transition-colors hover:border-cobalt hover:text-bone"
      >
        Show every match
      </Link>
    </div>
  );
}

export default async function MatchesPage({ searchParams }: MatchesPageProps) {
  const params = await searchParams;
  const titleId = (params.title ?? "all") as TitleId | "all";
  const status = (params.status ?? "all") as MatchStatus | "all";

  const [matches, titles] = await Promise.all([
    getMatches({ titleId, status }),
    Promise.resolve(getTitles()),
  ]);

  const live = matches.filter((match) => match.status === "live");
  const upcoming = matches.filter((match) => match.status === "upcoming");
  const results = matches.filter((match) => match.status === "completed");
  const filtered = status !== "all";

  return (
    <>
      <PageHeader
        label="Matches"
        title={
          <>
            The board,
            <br />
            as it happens.
          </>
        }
        description="Live scores, the next fixtures on the calendar, and results with the series context that matters. Times are CET; all six titles share one board."
        meta={[
          { label: "Live", value: String(live.length) },
          { label: "Fixtures", value: String(matches.length) },
        ]}
      />

      <FilterBar
        basePath="/matches"
        groups={[
          {
            key: "title",
            label: "Title",
            options: [
              { value: "all", label: "All titles" },
              ...titles.map((title) => ({ value: title.id, label: title.short })),
            ],
          },
          {
            key: "status",
            label: "State",
            options: [
              { value: "all", label: "Everything" },
              { value: "live", label: "Live" },
              { value: "upcoming", label: "Upcoming" },
              { value: "completed", label: "Results" },
            ],
          },
        ]}
        current={{ title: params.title, status: params.status }}
        searchPlaceholder="Search matches"
        resultLabel={`${matches.length} fixtures in view`}
      />

      <div className="wrap py-12 md:py-16">
        {matches.length === 0 && <EmptyState />}

        {live.length > 0 && (
          <section className="mb-16">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-live/30 pb-3">
              <h2 className="flex items-center gap-2 font-display text-xl tracking-[-0.02em]">
                <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
                On air now
              </h2>
              <span className="text-[11px] text-bone/35">
                {live.length} broadcast{live.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {live.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {upcoming.length > 0 && (
          <section className={live.length > 0 ? "" : "mb-16"}>
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-bone/15 pb-3">
              <h2 className="font-display text-xl tracking-[-0.02em]">Upcoming</h2>
              <span className="text-[11px] text-bone/35">{upcoming.length} scheduled</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {results.length > 0 && (
          <section className={upcoming.length > 0 || live.length > 0 ? "mt-16" : ""}>
            <div className="mb-3 flex items-center justify-between gap-4 border-b border-bone/15 pb-3">
              <h2 className="font-display text-xl tracking-[-0.02em]">Results</h2>
              <span className="text-[11px] text-bone/35">Newest first</span>
            </div>
            <ul>
              {results.map((match) => (
                <ResultRow key={match.id} match={match} />
              ))}
            </ul>
          </section>
        )}

        {filtered && matches.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <StatusBadge status={status} />
            <span className="text-[11px] text-bone/35">
              Filtered view · clear it on the bar above
            </span>
          </div>
        )}

        <div className="mt-14 grid gap-6 border-t border-bone/10 pt-6 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-xl text-[11px] leading-relaxed text-bone/35">
            Live state is seeded for this build. Point the matches adapter at a
            score provider to make the board real — the component contract does
            not change.
          </p>
          <span className="text-[11px] text-bone/35">
            {new Set(matches.map((match) => match.titleId)).size} titles · times in
            CET
          </span>
        </div>
      </div>
    </>
  );
}
