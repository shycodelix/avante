/**
 * Domain model for the Avante platform.
 *
 * Everything the site renders is described here, so a CMS, a stats provider or
 * a transfer wire can be mapped onto these shapes without touching the views.
 */

export type TitleId =
  | "league-of-legends"
  | "valorant"
  | "cs2"
  | "rocket-league"
  | "dota-2"
  | "tekken-8";

export type Genre = "MOBA" | "Tactical FPS" | "Arena" | "Fighting";

export interface GameTitle {
  id: TitleId;
  name: string;
  short: string;
  genre: Genre;
}

export type Region = "EMEA" | "Americas" | "APAC" | "Korea" | "China" | "Global";

export interface Team {
  id: string;
  name: string;
  short: string;
  titleId: TitleId;
  region: Region;
  /** Two-letter monogram tint, used instead of copyrighted club crests. */
  accent: string;
}

export interface Player {
  id: string;
  handle: string;
  fullName: string;
  role: string;
  teamId: string;
  titleId: TitleId;
  country: string;
  joined: string;
  /** Set for the org's own lineup, used on the studio/roster section. */
  portraitTone?: string;
}

export type FormResult = "W" | "L";

export interface StandingRow {
  teamId: string;
  played: number;
  wins: number;
  losses: number;
  mapDiff: number;
  points: number;
  form: FormResult[];
}

export interface League {
  id: string;
  name: string;
  short: string;
  titleId: TitleId;
  region: Region;
  tier: string;
  format: string;
  season: string;
  prizePool: string;
  description: string;
  standings: StandingRow[];
}

export type MatchStatus = "live" | "upcoming" | "completed";

export interface MatchSide {
  teamId: string;
  score: number | null;
}

export interface MatchMap {
  name: string;
  scoreA: number;
  scoreB: number;
}

export interface Match {
  id: string;
  titleId: TitleId;
  leagueId: string;
  tournament: string;
  stage: string;
  status: MatchStatus;
  /** ISO 8601, always UTC in the seed data. */
  startsAt: string;
  bestOf: 1 | 3 | 5 | 7;
  home: MatchSide;
  away: MatchSide;
  stream?: string;
  venue?: string;
  /** Broadcast context, e.g. "Winners' final · series tied 1–1". */
  note?: string;
  maps?: MatchMap[];
}

export type ArticleCategory =
  | "news"
  | "leaks"
  | "interviews"
  | "features"
  | "guides"
  | "gaming-tech";

export interface ArticleQuote {
  text: string;
  attribution: string;
}

export interface ArticleBlock {
  heading?: string;
  paragraphs: string[];
  quote?: ArticleQuote;
}

export interface Author {
  name: string;
  role: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  titleIds: TitleId[];
  tags: string[];
  author: Author;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  trending?: boolean;
  image?: string;
  imageAlt?: string;
  /** A leak/report needs a visible sourcing status. */
  sourcing?: "confirmed" | "sources" | "rumour";
  blocks: ArticleBlock[];
}

export type TransferStatus = "confirmed" | "report" | "rumour";

export interface Transfer {
  id: string;
  playerHandle: string;
  playerName: string;
  role: string;
  fromTeam: string;
  toTeam: string;
  titleId: TitleId;
  league: string;
  status: TransferStatus;
  date: string;
  note: string;
  reportedBy: string;
  contractUntil?: string;
}

export interface RosterSnapshot {
  teamId: string;
  league: string;
  incoming: string[];
  outgoing: string[];
  lineup: { handle: string; role: string; status: "staying" | "new" | "coach" }[];
}

export interface CosplayEntry {
  id: string;
  name: string;
  character: string;
  franchise: string;
  location: string;
  photographer: string;
  builder: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  quote?: string;
}

export type EventFormat = "lan" | "online" | "hybrid";
export type EventStatus = "on-sale" | "invite-only" | "free-entry" | "sold-out";

export interface EventItem {
  id: string;
  name: string;
  titleId?: TitleId;
  city: string;
  country: string;
  format: EventFormat;
  startDate: string;
  endDate: string;
  venue: string;
  status: EventStatus;
  blurb: string;
}

export interface StudioProject {
  id: string;
  client: string;
  project: string;
  year: number;
  disciplines: string[];
  summary: string;
  metrics: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  /** Layout ratio for the editorial rail. */
  ratio: "wide" | "tall";
}

export interface Capability {
  id: string;
  name: string;
  summary: string;
  items: string[];
}

export interface HubDefinition {
  id: string;
  href: string;
  name: string;
  description: string;
  count: string;
  accent?: boolean;
}
