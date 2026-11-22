import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { HubGrid } from "@/components/hub-grid";
import { MatchSlate } from "@/components/match-card";
import { ParallaxMedia } from "@/components/parallax-media";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import {
  getArticles,
  getCapabilities,
  getCosplay,
  getHubs,
  getLiveMatches,
  getStudioProjects,
  getTalent,
  getTeam,
  getTitles,
  getUpcomingEvents,
  getUpcomingMatches,
} from "@/lib/content";
import { formatDateRange, formatKickoff } from "@/lib/format";
import type { StudioProject } from "@/lib/types";

export const revalidate = 300;

function ProjectTile({ project }: { project: StudioProject }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden border border-bone/10 bg-ink-3">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 47vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-0 top-0 h-1 w-12 bg-cobalt" aria-hidden />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] leading-snug tracking-[-0.02em] text-bone">
          {project.project}
        </h3>
        <span className="shrink-0 text-[10px] text-bone/35 tnum">{project.year}</span>
      </div>
      <p className="mt-1 text-[11px] text-bone/40">
        {project.client} · {project.disciplines.join(" / ")}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-bone/50">
        {project.summary}
      </p>
      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-bone/10 pt-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="flex items-baseline gap-1.5">
            <dt className="text-[10px] text-bone/35">{metric.label}</dt>
            <dd className="font-display text-[12px] text-bone/75 tnum">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default async function HomePage() {
  const [
    articles,
    liveMatches,
    upcomingMatches,
    events,
    hubs,
    projects,
    capabilities,
    talent,
    cosplay,
    titles,
  ] = await Promise.all([
    getArticles(),
    getLiveMatches(),
    getUpcomingMatches(3),
    getUpcomingEvents(3),
    getHubs(),
    getStudioProjects(),
    getCapabilities(),
    getTalent(),
    getCosplay(),
    getTitles(),
  ]);

  const lead = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.filter((article) => article.id !== lead?.id).slice(0, 4);
  const slateMatches =
    liveMatches.length > 0
      ? [...liveMatches, ...upcomingMatches].slice(0, 3)
      : upcomingMatches.slice(0, 3);

  const cosplayFeature = cosplay[0];
  const cosplaySupports = cosplay.slice(1, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-bone/10">
        <ParallaxMedia
          src="/images/arena.jpg"
          alt="Arena crowd and stage lighting before a League of Legends final"
          className="absolute inset-0 -z-10"
          imageClassName="object-[50%_38%] opacity-75"
          priority
          amount={14}
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,12,13,0.62)_0%,rgba(10,12,13,0.42)_42%,rgba(10,12,13,0.96)_100%)]"
          aria-hidden
        />
        <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-25" aria-hidden />

        <div className="wrap flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-14 pb-6 pt-8 md:min-h-[calc(100svh-72px)] md:pt-12">
          <div className="hero-fade flex flex-wrap items-center justify-between gap-3 text-[11px] text-bone/55">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden />
              Esports organisation & creative studio
            </span>
            <span className="text-bone/35">Berlin · Since 2019</span>
          </div>

          <div>
            <h1 className="display-hero overflow-hidden">
              <span className="block overflow-hidden">
                <span className="hero-line block pb-[0.06em]">AVANTE</span>
              </span>
            </h1>

            <div className="mt-7 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="hero-fade md:col-span-7" style={{ animationDelay: "160ms" }}>
                <p className="max-w-xl font-display text-[clamp(1.25rem,2.1vw,1.9rem)] leading-[1.06] tracking-[-0.035em] text-bone">
                  We field the teams — and build the rooms they are watched in.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/news"
                    className="group inline-flex items-center gap-3 bg-bone px-5 py-3 text-[12px] font-medium text-ink transition-colors hover:bg-cobalt hover:text-white"
                  >
                    Read the newsroom
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <Link
                    href="#studio"
                    className="inline-flex items-center gap-3 border border-bone/25 px-5 py-3 text-[12px] text-bone/80 transition-colors hover:border-bone/60 hover:text-bone"
                  >
                    See the studio work
                  </Link>
                </div>
              </div>

              <div
                className="hero-fade md:col-span-4 md:col-start-9"
                style={{ animationDelay: "260ms" }}
              >
                <p className="text-[13px] leading-relaxed text-bone/60">
                  Four rosters, one broadcast desk, and a newsroom covering six
                  titles. We compete in League of Legends, VALORANT, CS2 and
                  Rocket League — and we document the rest of the scene, from
                  transfer scoops to cosplay builds.
                </p>
              </div>
            </div>
          </div>

          <div className="hero-fade" style={{ animationDelay: "360ms" }}>
            <div className="mb-3 flex items-center justify-between text-[10px] text-bone/40">
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-live"
                  aria-hidden
                />
                {liveMatches.length > 0 ? "On air now" : "Next up"}
              </span>
              <Link href="/matches" className="transition-colors hover:text-bone">
                All matches →
              </Link>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              {slateMatches.map((match) => (
                <MatchSlate key={match.id} match={match} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Title ticker */}
      <div className="marquee overflow-hidden border-b border-bone/10 bg-ink-2">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {titles.map((title) => (
                <span
                  key={`${copy}-${title.id}`}
                  className="flex items-center gap-6 whitespace-nowrap px-6 py-3 text-[11px] text-bone/40"
                >
                  {title.name}
                  <span className="h-1 w-1 rotate-45 bg-cobalt/70" aria-hidden />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsroom ─────────────────────────────────────────────────────── */}
      <section className="wrap py-20 md:py-28">
        <SectionHeading
          eyebrow="The wire"
          title="Dispatches from the desk"
          description="Reported, confirmed, or clearly labelled as a rumour. The newsroom runs through the day from Berlin, with reporting across every title we cover."
          action={{ href: "/news", label: "All stories" }}
        />

        {lead && (
          <Reveal className="mt-12">
            <ArticleCard article={lead} variant="lead" />
          </Reveal>
        )}

        <Reveal stagger={0.06} className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Reveal>
      </section>

      {/* ── Studio ───────────────────────────────────────────────────────── */}
      <section
        id="studio"
        className="scroll-mt-24 border-y border-bone/10 bg-ink-2"
      >
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            eyebrow="Avante Studio"
            title="We make the broadcast, not just the highlight"
            description="Broadcast packages, brand systems, films and the operations that hold a live show together — built in-house, for leagues, teams and publishers."
            action={{ href: "#contact", label: "Start a project" }}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="max-w-md text-sm leading-relaxed text-bone/60">
                The studio started as the org&apos;s internal graphics desk in
                2020. It now ships season-long systems for three leagues and
                documents the scene we compete in. Same team, same room, same
                deadline as the broadcast.
              </p>

              <dl className="mt-8 border-t border-bone/15">
                {capabilities.map((capability) => (
                  <div
                    key={capability.id}
                    className="group border-b border-bone/10 py-4"
                  >
                    <dt className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] text-bone">{capability.name}</span>
                      <span className="h-1 w-1 shrink-0 bg-cobalt" aria-hidden />
                    </dt>
                    <dd className="mt-1.5 text-[11px] leading-relaxed text-bone/45">
                      {capability.summary}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <Reveal stagger={0.07} className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-8">
              {projects.slice(0, 4).map((project) => (
                <ProjectTile key={project.id} project={project} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Rosters ──────────────────────────────────────────────────────── */}
      <section id="talent" className="wrap scroll-mt-24 py-20 md:py-28">
        <SectionHeading
          eyebrow="Rosters"
          title="The people on the stage"
          description="Four lineups, one academy pipeline. Contract news lands on the transfers desk the moment it is signed — or earlier, if we can stand it up."
          action={{ href: "/transfers", label: "Transfer tracker" }}
        />

        <Reveal stagger={0.05} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {talent.map((player) => {
            const team = getTeam(player.teamId);
            return (
              <article
                key={player.id}
                className="group relative overflow-hidden border border-bone/10 bg-ink-2 p-5 transition-colors hover:border-bone/25"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-40 blur-2xl"
                  style={{ background: player.portraitTone }}
                />
                <div className="relative flex items-start justify-between text-[10px] text-bone/40">
                  <span>{team?.name ?? "Avante"}</span>
                  <span>{player.country}</span>
                </div>
                <div className="relative mt-12">
                  <h3 className="font-display text-[2rem] leading-none tracking-[-0.04em] text-bone">
                    {player.handle}
                  </h3>
                  <p className="mt-2 text-[11px] text-bone/45">
                    {player.role} · {player.fullName}
                  </p>
                </div>
                <p className="relative mt-5 border-t border-bone/10 pt-3 text-[10px] text-bone/30">
                  With Avante since {player.joined}
                </p>
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-cobalt transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </article>
            );
          })}
        </Reveal>
      </section>

      {/* ── Hubs ─────────────────────────────────────────────────────────── */}
      <section className="border-y border-bone/10 bg-ink-2">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            eyebrow="The hub"
            title="Seven desks, one newsroom"
            description="Filter by title or by niche. Every desk shares the same data model, so a result, a signing and a story all resolve to the same team and the same player."
            action={{ href: "/matches", label: "Live now" }}
          />
          <div className="mt-12">
            <HubGrid hubs={hubs} />
          </div>
        </div>
      </section>

      {/* ── Cosplay ──────────────────────────────────────────────────────── */}
      <section className="paper bg-bone text-ink">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            tone="light"
            eyebrow="Cosplay desk"
            title="The scene is also made by hand"
            description="Twelve weeks of foam work, one studio light and a repair kit for the con floor. We document cosplay as production, not costume."
            action={{ href: "/cosplay", label: "Enter the gallery" }}
          />

          <div className="mt-12 grid gap-8 md:grid-cols-12">
            {cosplayFeature && (
              <figure className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                  {cosplayFeature.image && (
                    <Image
                      src={cosplayFeature.image}
                      alt={cosplayFeature.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 768px) 56vw, 100vw"
                      className="object-cover object-[50%_26%]"
                    />
                  )}
                </div>
                <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-3 text-[11px] text-ink/55">
                  <span>
                    <strong className="font-medium text-ink">
                      {cosplayFeature.name}
                    </strong>{" "}
                    as {cosplayFeature.character} · photographed by{" "}
                    {cosplayFeature.photographer}
                  </span>
                  <span>{cosplayFeature.location}</span>
                </figcaption>
              </figure>
            )}

            <div className="md:col-span-5">
              {cosplayFeature?.quote && (
                <blockquote className="font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.12] tracking-[-0.03em] text-ink">
                  “{cosplayFeature.quote}”
                </blockquote>
              )}
              <p className="mt-4 text-[11px] text-ink/55">
                {cosplayFeature?.name}, builder
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/15 pt-5">
                {cosplaySupports.map((entry) => (
                  <div key={entry.id}>
                    <p className="font-display text-lg leading-tight tracking-[-0.02em]">
                      {entry.character}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink/55">
                      {entry.name} · {entry.franchise}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/cosplay"
                className="mt-8 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[12px] text-ink/75 transition-colors hover:border-cobalt hover:text-ink"
              >
                See all {cosplay.length} features
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calendar ─────────────────────────────────────────────────────── */}
      <section className="wrap py-20 md:py-28">
        <SectionHeading
          eyebrow="Calendar"
          title="Where we will be next"
          description="LANs, online cups, studio nights and the one open-build evening a month. Avante events are marked; the rest are worth the trip."
          action={{ href: "/events", label: "Full calendar" }}
        />

        <div className="mt-10 border-t border-bone/15">
          {events.map((event) => (
            <Link
              key={event.id}
              href="/events"
              className="group grid gap-3 border-b border-bone/10 py-5 transition-colors hover:bg-bone/[0.02] md:grid-cols-[150px_1fr_auto] md:items-center md:gap-6"
            >
              <span className="text-[11px] text-bone/45 tnum">
                {formatDateRange(event.startDate, event.endDate)}
              </span>
              <span>
                <span className="block text-[15px] leading-snug text-bone transition-colors group-hover:text-bone">
                  {event.name}
                </span>
                <span className="mt-1 block text-[11px] text-bone/40">
                  {event.venue} · {event.city}, {event.country}
                </span>
              </span>
              <StatusBadge status={event.status} className="justify-self-start md:justify-self-end" />
            </Link>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-bone/35">
          All times CET. Broadcast links and brackets live on the matches desk.
        </p>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-24 border-t border-bone/10 bg-ink-2">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-28">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2 text-[11px] text-bone/45">
              <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden />
              Work with us
            </p>
            <h2 className="display-xl mt-4 max-w-[14ch]">Bring us the brief.</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-bone/55">
              Broadcast packages, identity systems, documentary and tournament
              production. We take on a small number of outside projects each
              season and scope them in a single call.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:border-l md:border-bone/10 md:pl-8">
            <a
              href="mailto:studio@avante.gg"
              className="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] tracking-[-0.03em] text-bone decoration-cobalt decoration-2 underline-offset-8 hover:underline"
            >
              studio@avante.gg
            </a>
            <dl className="mt-8 space-y-4 text-[12px]">
              <div>
                <dt className="text-bone/35">New business</dt>
                <dd className="mt-1 text-bone/70">Two working days to reply</dd>
              </div>
              <div>
                <dt className="text-bone/35">Press & interviews</dt>
                <dd className="mt-1 text-bone/70">newsroom@avante.gg</dd>
              </div>
              <div>
                <dt className="text-bone/35">Studio</dt>
                <dd className="mt-1 text-bone/70">Kreuzberg, Berlin</dd>
              </div>
            </dl>
            <p className="mt-8 text-[11px] leading-relaxed text-bone/35">
              Looking for a match, a signing or a results table? The hub has its
              own desk — start with{" "}
              <Link href="/matches" className="text-bone/60 underline underline-offset-4">
                matches
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Small print for the ticker's static timestamp */}
      <div className="border-t border-bone/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-4 text-[10px] text-bone/25">
          <span>
            Next broadcast: {slateMatches[0] ? formatKickoff(slateMatches[0].startsAt) : "TBC"} CET
          </span>
          <span>Scores and times are seed data for this build</span>
        </div>
      </div>
    </>
  );
}
