import { articles as articleSeed } from "@/data/articles";
import { titles, teams, teamById, titleById } from "@/data/catalogue";
import { cosplayEntries, events as eventSeed } from "@/data/culture";
import { hubs as hubSeed } from "@/data/hubs";
import { leagues as leagueSeed } from "@/data/leagues";
import { matches as matchSeed } from "@/data/matches";
import { capabilities, studioProjects, talent } from "@/data/studio";
import { rosterSnapshots, transfers as transferSeed } from "@/data/transfers";
import type {
  Article,
  ArticleCategory,
  CosplayEntry,
  EventFormat,
  EventItem,
  GameTitle,
  HubDefinition,
  League,
  Match,
  MatchStatus,
  Player,
  RosterSnapshot,
  StandingRow,
  StudioProject,
  Team,
  TitleId,
  Transfer,
  TransferStatus,
  Capability,
} from "@/lib/types";

/**
 * Content adapter.
 *
 * Every read the app performs goes through this module. The seed arrays below
 * are the only place that knows data is local; replacing any function body with
 * a `fetch()` to a CMS, a stats provider or an internal route handler is enough
 * to make the whole site live. Keep the return types identical and nothing in
 * the UI has to change.
 *
 * Caching: all of these are pure reads, so pages can be statically generated or
 * revalidated with `export const revalidate = …`. See the wiring guide in
 * README.md for the endpoint-by-endpoint mapping.
 */

/** Fixed "now" for the seed dataset so build output is deterministic. */
export const SEED_NOW = new Date("2026-11-22T12:00:00.000Z");

export const ALL = "all" as const;

// ── Titles, teams, players ──────────────────────────────────────────────────

export function getTitles(): GameTitle[] {
  return titles;
}

export function getTitle(id: TitleId): GameTitle | undefined {
  return titleById.get(id);
}

export function getTeams(): Team[] {
  return teams;
}

export function getTeam(id: string): Team | undefined {
  return teamById.get(id);
}

/** Never throws: unknown ids fall back to a neutral monogram. */
export function getTeamOrFallback(id: string): Team {
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

export function getTalent(): Player[] {
  return talent;
}

export function getCapabilities(): Capability[] {
  return capabilities;
}

// ── News ───────────────────────────────────────────────────────────────────

export type ArticleSort = "newest" | "trending";

export interface ArticleFilter {
  category?: ArticleCategory | typeof ALL;
  titleId?: TitleId | typeof ALL;
  tag?: string;
  q?: string;
  sort?: ArticleSort;
  limit?: number;
}

function matchesQuery(article: Article, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    article.title,
    article.dek,
    article.tags.join(" "),
    article.author.name,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

function sortArticles(list: Article[], sort: ArticleSort): Article[] {
  return [...list].sort((a, b) => {
    if (sort === "trending") {
      const score = (article: Article) =>
        (article.trending ? 2 : 0) + (article.featured ? 1 : 0);
      const diff = score(b) - score(a);
      if (diff !== 0) return diff;
    }
    return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
  });
}

export async function getArticles(filter: ArticleFilter = {}): Promise<Article[]> {
  const {
    category = ALL,
    titleId = ALL,
    tag,
    q = "",
    sort = "newest",
    limit,
  } = filter;

  const filtered = articleSeed.filter((article) => {
    if (category !== ALL && article.category !== category) return false;
    if (titleId !== ALL && !article.titleIds.includes(titleId)) return false;
    if (tag && !article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      return false;
    }
    return matchesQuery(article, q);
  });

  const sorted = sortArticles(filtered, sort);
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const list = await getArticles({ sort: "newest" });
  return list.find((article) => article.featured) ?? list[0];
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articleSeed.find((article) => article.slug === slug);
}

export async function getArticleSlugs(): Promise<string[]> {
  return articleSeed.map((article) => article.slug);
}

export async function getRelatedArticles(
  article: Article,
  limit = 3,
): Promise<Article[]> {
  const candidates = articleSeed.filter((entry) => entry.id !== article.id);
  const scored = candidates
    .map((entry) => {
      const sharedTitles = entry.titleIds.filter((id) =>
        article.titleIds.includes(id),
      ).length;
      const sharedTags = entry.tags.filter((tag) => article.tags.includes(tag)).length;
      return {
        entry,
        score: sharedTitles * 2 + sharedTags + (entry.category === article.category ? 1 : 0),
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        Date.parse(b.entry.publishedAt) - Date.parse(a.entry.publishedAt),
    );

  return scored.slice(0, limit).map((item) => item.entry);
}

export function getArticleCategories(): { value: ArticleCategory | typeof ALL; label: string }[] {
  return [
    { value: ALL, label: "Everything" },
    { value: "news", label: "News" },
    { value: "leaks", label: "Leaks" },
    { value: "interviews", label: "Interviews" },
    { value: "features", label: "Features" },
    { value: "guides", label: "Guides" },
    { value: "gaming-tech", label: "Gaming & tech" },
  ];
}

// ── Matches ────────────────────────────────────────────────────────────────

export interface MatchFilter {
  titleId?: TitleId | typeof ALL;
  leagueId?: string | typeof ALL;
  status?: MatchStatus | typeof ALL;
  limit?: number;
}

const STATUS_WEIGHT: Record<MatchStatus, number> = {
  live: 0,
  upcoming: 1,
  completed: 2,
};

export async function getMatches(filter: MatchFilter = {}): Promise<Match[]> {
  const { titleId = ALL, leagueId = ALL, status = ALL, limit } = filter;

  const filtered = matchSeed.filter((match) => {
    if (titleId !== ALL && match.titleId !== titleId) return false;
    if (leagueId !== ALL && match.leagueId !== leagueId) return false;
    if (status !== ALL && match.status !== status) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const weight = STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status];
    if (weight !== 0) return weight;
    const aTime = Date.parse(a.startsAt);
    const bTime = Date.parse(b.startsAt);
    return a.status === "completed" ? bTime - aTime : aTime - bTime;
  });

  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getLiveMatches(): Promise<Match[]> {
  return getMatches({ status: "live" });
}

export async function getUpcomingMatches(limit = 6): Promise<Match[]> {
  return getMatches({ status: "upcoming", limit });
}

export async function getRecentResults(limit = 6): Promise<Match[]> {
  return getMatches({ status: "completed", limit });
}

export async function getMatchesForTeam(teamId: string, limit = 4): Promise<Match[]> {
  const list = await getMatches();
  return list
    .filter((match) => match.home.teamId === teamId || match.away.teamId === teamId)
    .slice(0, limit);
}

// ── Leagues ────────────────────────────────────────────────────────────────

export async function getLeagues(titleId: TitleId | typeof ALL = ALL): Promise<League[]> {
  if (titleId === ALL) return leagueSeed;
  return leagueSeed.filter((league) => league.titleId === titleId);
}

export async function getLeague(id: string): Promise<League | undefined> {
  return leagueSeed.find((league) => league.id === id);
}

export interface StandingEntry extends StandingRow {
  rank: number;
  team: Team;
}

export async function getStandings(leagueId: string): Promise<StandingEntry[]> {
  const league = await getLeague(leagueId);
  if (!league) return [];
  return league.standings.map((row, index) => ({
    ...row,
    rank: index + 1,
    team: getTeamOrFallback(row.teamId),
  }));
}

// ── Transfers ──────────────────────────────────────────────────────────────

export interface TransferFilter {
  titleId?: TitleId | typeof ALL;
  status?: TransferStatus | typeof ALL;
  league?: string | typeof ALL;
  limit?: number;
}

export async function getTransfers(filter: TransferFilter = {}): Promise<Transfer[]> {
  const { titleId = ALL, status = ALL, league = ALL, limit } = filter;

  const filtered = transferSeed
    .filter((transfer) => {
      if (titleId !== ALL && transfer.titleId !== titleId) return false;
      if (status !== ALL && transfer.status !== status) return false;
      if (league !== ALL && transfer.league !== league) return false;
      return true;
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getRosterSnapshots(): Promise<RosterSnapshot[]> {
  return rosterSnapshots;
}

export async function getTransferCounts(): Promise<Record<TransferStatus, number>> {
  return transferSeed.reduce<Record<TransferStatus, number>>(
    (acc, transfer) => {
      acc[transfer.status] += 1;
      return acc;
    },
    { confirmed: 0, report: 0, rumour: 0 },
  );
}

// ── Cosplay ────────────────────────────────────────────────────────────────

export async function getCosplay(franchise: string | typeof ALL = ALL): Promise<CosplayEntry[]> {
  if (franchise === ALL) return cosplayEntries;
  return cosplayEntries.filter((entry) => entry.franchise === franchise);
}

export async function getCosplayFranchises(): Promise<string[]> {
  return Array.from(new Set(cosplayEntries.map((entry) => entry.franchise)));
}

// ── Events ─────────────────────────────────────────────────────────────────

export interface EventFilter {
  format?: EventFormat | typeof ALL;
  titleId?: TitleId | typeof ALL;
  upcomingOnly?: boolean;
}

export async function getEvents(filter: EventFilter = {}): Promise<EventItem[]> {
  const { format = ALL, titleId = ALL, upcomingOnly = false } = filter;

  return eventSeed
    .filter((event) => {
      if (format !== ALL && event.format !== format) return false;
      if (titleId !== ALL && event.titleId !== titleId) return false;
      if (upcomingOnly && Date.parse(event.endDate) < SEED_NOW.getTime()) return false;
      return true;
    })
    .sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
}

export async function getUpcomingEvents(limit = 3): Promise<EventItem[]> {
  const list = await getEvents({ upcomingOnly: true });
  return list.slice(0, limit);
}

// ── Studio ─────────────────────────────────────────────────────────────────

export async function getStudioProjects(): Promise<StudioProject[]> {
  return studioProjects;
}

// ── Hubs ───────────────────────────────────────────────────────────────────

export async function getHubs(): Promise<HubDefinition[]> {
  const [news, matchList, leagueList, transferList, cosplay, eventList] =
    await Promise.all([
      getArticles(),
      getMatches(),
      getLeagues(),
      getTransfers(),
      getCosplay(),
      getEvents(),
    ]);

  const counts: Record<string, number> = {
    news: news.length,
    matches: matchList.length,
    leagues: leagueList.length,
    transfers: transferList.length,
    cosplay: cosplay.length,
    events: eventList.length,
    "gaming-tech": news.filter((article) => article.category === "gaming-tech").length,
  };

  return hubSeed.map((hub) => ({
    id: hub.id,
    href: hub.href,
    name: hub.name,
    description: hub.description,
    count: `${counts[hub.id] ?? 0} ${hub.unit}`,
  }));
}

export function getHubNav(): { href: string; name: string }[] {
  return hubSeed.map((hub) => ({ href: hub.href, name: hub.name }));
}
