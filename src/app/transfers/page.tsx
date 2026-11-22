import type { Metadata } from "next";

import { FilterBar } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { TeamBadge } from "@/components/team-badge";
import {
  getRosterSnapshots,
  getTeamOrFallback,
  getTitles,
  getTransferCounts,
  getTransfers,
} from "@/lib/content";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { TitleId, TransferStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Transfers & signings",
  description:
    "Confirmed signings, reported agreements and rumours across League of Legends, VALORANT, CS2 and Rocket League — labelled by status.",
};

export const revalidate = 120;

interface TransfersPageProps {
  searchParams: Promise<{ title?: string; status?: string }>;
}

const STATUS_NOTE: Record<TransferStatus, string> = {
  confirmed: "Announced by a club or the player.",
  report: "Two independent sources, not yet signed off.",
  rumour: "Unverified talk. Treat it as talk.",
};

export default async function TransfersPage({ searchParams }: TransfersPageProps) {
  const params = await searchParams;
  const titleId = (params.title ?? "all") as TitleId | "all";
  const status = (params.status ?? "all") as TransferStatus | "all";

  const [moves, titles, snapshots, counts] = await Promise.all([
    getTransfers({ titleId, status }),
    Promise.resolve(getTitles()),
    getRosterSnapshots(),
    getTransferCounts(),
  ]);

  return (
    <>
      <PageHeader
        label="Transfers"
        title={
          <>
            Who is moving,
            <br />
            and how sure we are.
          </>
        }
        description="A roster wire that labels its own certainty. Confirmed means a club said it. A report means two sources. A rumour stays a rumour until it is signed."
        meta={[
          { label: "Confirmed", value: String(counts.confirmed) },
          { label: "Reports", value: String(counts.report) },
          { label: "Rumours", value: String(counts.rumour) },
        ]}
      />

      <FilterBar
        basePath="/transfers"
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
            label: "Status",
            options: [
              { value: "all", label: "Everything" },
              { value: "confirmed", label: "Confirmed" },
              { value: "report", label: "Report" },
              { value: "rumour", label: "Rumour" },
            ],
          },
        ]}
        current={{ title: params.title, status: params.status }}
        searchPlaceholder="Search the wire"
        resultLabel={`${moves.length} moves in this view`}
      />

      <div className="wrap py-12 md:py-16">
        <div className="grid gap-3 border border-bone/10 bg-ink-2 p-4 sm:grid-cols-3">
          {(Object.keys(STATUS_NOTE) as TransferStatus[]).map((key) => (
            <div key={key} className="flex items-start gap-3">
              <StatusBadge status={key} />
              <p className="text-[11px] leading-relaxed text-bone/45">
                {STATUS_NOTE[key]}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-bone/15 pb-3">
            <h2 className="font-display text-xl tracking-[-0.02em]">The wire</h2>
            <span className="text-[10px] text-bone/35">
              Newest first · {moves.length} entries
            </span>
          </div>

          {moves.length === 0 ? (
            <p className="py-10 text-sm text-bone/45">
              No moves match this filter yet. The market is quiet on this desk.
            </p>
          ) : (
            <ul>
              {moves.map((move) => {
                return (
                  <li
                    key={move.id}
                    className="grid gap-3 border-b border-bone/10 py-5 md:grid-cols-[92px_1fr_auto] md:items-start md:gap-6"
                  >
                    <time
                      dateTime={move.date}
                      className="text-[11px] text-bone/40 tnum"
                    >
                      {formatDate(move.date)}
                    </time>

                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-xl leading-none tracking-[-0.03em] text-bone">
                          {move.playerHandle}
                        </span>
                        <span className="text-[10px] text-bone/40">{move.role}</span>
                        <span className="flex flex-wrap items-center gap-2 text-[12px] text-bone/60">
                          <span>{move.fromTeam}</span>
                          <span className="text-cobalt" aria-hidden>
                            →
                          </span>
                          <span className="text-bone">{move.toTeam}</span>
                        </span>
                      </div>

                      <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-bone/45">
                        {move.note}
                      </p>

                      <p className="mt-2 text-[10px] text-bone/30">
                        {move.league} · {move.playerName} · reported by{" "}
                        {move.reportedBy}
                        {move.contractUntil && ` · contract to ${move.contractUntil}`}
                      </p>
                    </div>

                    <div className="md:justify-self-end">
                      <StatusBadge status={move.status} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="mt-16">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-4 border-b border-bone/15 pb-3">
            <h2 className="font-display text-xl tracking-[-0.02em]">
              Roster snapshots
            </h2>
            <span className="text-[10px] text-bone/35">
              Planned lineups · 2027
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {snapshots.map((snapshot) => {
              const team = getTeamOrFallback(snapshot.teamId);
              return (
                <article
                  key={snapshot.teamId}
                  className="border border-bone/10 bg-ink-2 p-5"
                >
                  <header className="flex items-center justify-between gap-3 border-b border-bone/10 pb-4">
                    <span className="flex items-center gap-3">
                      <TeamBadge team={team} size="lg" />
                      <span>
                        <span className="block font-display text-lg leading-tight tracking-[-0.02em]">
                          {team.name}
                        </span>
                        <span className="text-[10px] text-bone/35">
                          {snapshot.league}
                        </span>
                      </span>
                    </span>
                    <span className="text-[10px] text-bone/30">
                      {snapshot.lineup.length} listed
                    </span>
                  </header>

                  <ul className="mt-3">
                    {snapshot.lineup.map((member) => (
                      <li
                        key={`${snapshot.teamId}-${member.handle}`}
                        className="flex items-center justify-between gap-3 border-b border-bone/5 py-2 last:border-b-0"
                      >
                        <span className="flex items-baseline gap-2">
                          <span
                            className={cn(
                              "text-[13px]",
                              member.status === "new"
                                ? "text-cobalt"
                                : "text-bone/80",
                            )}
                          >
                            {member.handle}
                          </span>
                          <span className="text-[10px] text-bone/35">
                            {member.role}
                          </span>
                        </span>
                        <span className="text-[9px] text-bone/30">
                          {member.status === "new"
                            ? "Incoming"
                            : member.status === "coach"
                              ? "Staff"
                              : "Staying"}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-4 grid gap-2 border-t border-bone/10 pt-3 text-[10px]">
                    <div className="flex gap-2">
                      <dt className="w-16 shrink-0 text-bone/30">In</dt>
                      <dd className="text-bone/60">
                        {snapshot.incoming.join(", ") || "—"}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-16 shrink-0 text-bone/30">Out</dt>
                      <dd className="text-bone/60">
                        {snapshot.outgoing.join(", ") || "—"}
                      </dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
