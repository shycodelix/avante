import type { Metadata } from "next";
import Link from "next/link";

import { canonicalPath, openGraphBase } from "@/lib/site";

import { ArticleCard } from "@/components/article-card";
import { MatchCard } from "@/components/match-card";
import { PageHeader } from "@/components/page-header";
import { StandingsTable } from "@/components/standings-table";
import {
  getArticles,
  getLeague,
  getLeagues,
  getMatches,
  getStandings,
  getTitle,
} from "@/lib/content";
import { cn } from "@/lib/cn";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ league?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  // An unknown league falls back to the first circuit on the page, so it must
  // not claim a canonical URL of its own.
  const league = params.league ? await getLeague(params.league) : undefined;
  const canonical = canonicalPath("/leagues", { league: league?.id });

  return {
    title: "Leagues & standings",
    description:
      "Standings, formats and season context for the LCP, LCK, VCT Pacific, VCT Americas, ESL Pro League and RLCS APAC.",
    alternates: { canonical },
    openGraph: openGraphBase(canonical),
  };
}

export const revalidate = 300;

interface LeaguesPageProps {
  searchParams: Promise<{ league?: string }>;
}

export default async function LeaguesPage({ searchParams }: LeaguesPageProps) {
  const params = await searchParams;
  const leagues = await getLeagues();
  const active =
    (params.league ? await getLeague(params.league) : undefined) ?? leagues[0];

  if (!active) {
    return (
      <div className="wrap py-20">
        <h1 className="display-lg">No circuits loaded.</h1>
      </div>
    );
  }

  const [standings, fixtures, news, title] = await Promise.all([
    getStandings(active.id),
    getMatches({ leagueId: active.id }),
    getArticles({ titleId: active.titleId, limit: 3 }),
    Promise.resolve(getTitle(active.titleId)),
  ]);

  const nextFixtures = fixtures.filter((match) => match.status !== "completed").slice(0, 2);

  return (
    <>
      <PageHeader
        label="Leagues"
        title={
          <>
            The circuits,
            <br />
            and who leads them.
          </>
        }
        description="Formats, prize pools and final tables for the six circuits we follow closest, with the league news that explains the table."
        meta={[
          { label: "Circuits", value: String(leagues.length) },
          { label: "Titles", value: "6" },
        ]}
      />

      <div className="wrap grid gap-10 py-12 lg:grid-cols-[250px_1fr] lg:gap-14 lg:py-16">
        <aside>
          <h2 className="text-[10px] text-bone/35">Select a circuit</h2>
          <nav className="mt-3 border-t border-bone/15" aria-label="Leagues">
            {leagues.map((league) => {
              const isActive = league.id === active.id;
              return (
                <Link
                  key={league.id}
                  href={`/leagues?league=${league.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-start justify-between gap-3 border-b border-bone/10 py-3 transition-colors",
                    isActive ? "text-bone" : "text-bone/55 hover:text-bone",
                  )}
                >
                  <span>
                    <span className="flex items-center gap-2 text-[13px]">
                      {isActive && (
                        <span className="h-1 w-1 bg-cobalt" aria-hidden />
                      )}
                      {league.short}
                    </span>
                    <span className="mt-1 block text-[10px] text-bone/35">
                      {league.region} · {league.season}
                    </span>
                  </span>
                  <span className="shrink-0 text-[9px] text-bone/25">
                    {league.tier}
                  </span>
                </Link>
              );
            })}
          </nav>

          <p className="mt-6 text-[11px] leading-relaxed text-bone/35">
            Tables shown are the final 2026 standings. The 2027 season opens in
            January — roster changes live on the transfers desk.
          </p>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-bone/15 pb-5">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-bone/45">
                <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden />
                {title?.name}
              </div>
              <h2 className="display-lg mt-2">{active.name}</h2>
            </div>
            <span className="border border-bone/20 px-2 py-1 text-[10px] text-bone/60">
              {active.tier} · {active.region}
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-bone/55">
            {active.description}
          </p>

          <dl className="mt-6 grid gap-4 border-t border-bone/10 pt-5 text-[12px] sm:grid-cols-3">
            <div>
              <dt className="text-bone/35">Format</dt>
              <dd className="mt-1 leading-relaxed text-bone/70">{active.format}</dd>
            </div>
            <div>
              <dt className="text-bone/35">Season</dt>
              <dd className="mt-1 text-bone/70">{active.season}</dd>
            </div>
            <div>
              <dt className="text-bone/35">Prize pool</dt>
              <dd className="mt-1 text-bone/70 tnum">{active.prizePool}</dd>
            </div>
          </dl>

          <section className="mt-10">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl tracking-[-0.02em]">Standings</h3>
              <span className="text-[10px] text-bone/35">
                P · W · L · map diff · points
              </span>
            </div>
            <div className="border border-bone/10 bg-ink-2 p-3 md:p-5">
              <StandingsTable rows={standings} />
            </div>
          </section>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <section>
              <h3 className="mb-4 border-b border-bone/15 pb-2 font-display text-lg tracking-[-0.02em]">
                Next in this circuit
              </h3>
              {nextFixtures.length > 0 ? (
                <div className="space-y-3">
                  {nextFixtures.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-bone/40">
                  No fixtures scheduled yet. Check the{" "}
                  <Link href="/matches" className="text-bone/70 underline underline-offset-4">
                    full match board
                  </Link>
                  .
                </p>
              )}
            </section>

            <section>
              <h3 className="mb-1 border-b border-bone/15 pb-2 font-display text-lg tracking-[-0.02em]">
                League news
              </h3>
              {news.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
              {news.length === 0 && (
                <p className="pt-4 text-[12px] text-bone/40">
                  Nothing filed for this circuit yet.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
