# Content pipeline: seed data → CMS and match feed

`src/lib/content.ts` is the only read boundary in the app: every page and
component calls it, and nothing else imports `src/data/*`. That is what makes
this migration a set of function-body swaps rather than a refactor.

Today all 30 exported readers return in-memory seed arrays, and
`SEED_NOW = 2026-11-22T12:00Z` fixes "now" so builds are deterministic.

## The split that matters

The data is two different problems and should get two different answers.

| | Editorial | Live competition |
| --- | --- | --- |
| Collections | articles, cosplay, events, studio, creators, pillars, socials | matches, leagues, standings, transfers |
| Changes | human, a few times a day | machine, continuously |
| Owner | editorial team | data provider |
| Best tool | headless CMS | sports data API |

Trying to force both through one vendor is the main cost trap here: CMSes are
bad at live scores, and data APIs are bad at long-form editing.

## Ranked options

Ranked by value for this site per unit of effort and money. Effort is
developer-days for the integration, migration and QA; prices are list prices
checked November 2026 and should be re-verified before signing.

### 1. Sanity for editorial + PandaScore fixtures for competition — **recommended**

| | |
| --- | --- |
| Effort | ~5–6 days total (3–4 CMS, 2 data) |
| Cost | **$0** to start |
| Free tier | Sanity: 20 seats, 250k API requests + 1M CDN requests/mo, 100 GB assets, 10k documents. PandaScore: fixtures/schedules/results/context at €0 per game, 1,000 requests/hour |
| Paid step | Sanity Growth $15/seat/mo; PandaScore historical from €400 per game/mo, live from €1,000 per game/mo |

Why it wins: both have real free tiers that fit this traffic, both are
self-serve, and neither needs a server we operate. Sanity's GROQ queries map
cleanly onto the existing `ArticleFilter` shapes, and its webhook on publish
gives us tag-based `revalidateTag` with no polling. PandaScore's free plan
already covers the whole matches/standings surface; the paid tiers are only
needed for per-map stats or stream-synced live scores, which the current UI
does not display.

Catch: live scores on the free tier are broadcast-synced and rate-limited, so
"LIVE" needs a 60-second cache and an honest freshness stamp in the UI.

### 2. Payload CMS self-hosted on Vercel + Postgres (Neon free)

| | |
| --- | --- |
| Effort | ~7–9 days |
| Cost | $0–25/mo (Neon free tier, Vercel included) |
| Free tier | Payload MIT, unlimited users; Neon free 0.5 GB |

Why consider it: no per-seat pricing ever, the admin lives in the same Next
app, and the content model is code — which suits a small technical team. It is
one deploy, one database, no vendor lock-in.

Catch: we own upgrades, backups, auth hardening and media storage. Payload
Cloud's new-project signups are currently paused, so this means self-hosting
properly, not clicking a button.

### 3. Keystatic or Tina (git-based, content in the repo)

| | |
| --- | --- |
| Effort | ~3–4 days |
| Cost | **$0** (Tina Cloud has a free tier for small teams) |
| Trade-off | Content lives in Markdown/JSON in GitHub; publishing = commit |

Why consider it: cheapest and fastest by far, keeps content reviewable in pull
requests, and needs no new service for editorial. For a newsroom publishing
several stories a week with one or two editors, this is genuinely enough.

Catch: no scheduling, no roles beyond repository permissions, no image CDN,
and every publish runs a build. It stops being pleasant at roughly the point
you want a non-technical editor publishing at 23:00 from a phone.

### 4. Storyblok

| | |
| --- | --- |
| Effort | ~4–5 days |
| Cost | Free Starter (1 seat, 2 max) → **$99/mo** Growth |
| Free tier | 1 space, 100k API requests/mo |

Why consider it: the best visual editing experience, which matters if brand
people want to compose landing sections themselves without a developer.

Catch: the free tier is effectively single-editor, so real use starts at
$99/mo, and its component model wants pages assembled from blocks — a poor fit
for a hub built around typed collections.

### 5. Contentful

| | |
| --- | --- |
| Effort | ~5–6 days |
| Cost | Free (10 users, hard caps) → **$300/mo** Lite |
| Free tier | 100k API calls/mo, 50 GB CDN, 2 locales, non-commercial intent |

Why consider it: governance, roles and enterprise procurement comfort.

Catch: the jump from free to usable is $300/mo, roughly 8–20× the realistic
alternatives for the same editorial job. Only worth it if a partner or investor
requires it.

### Match-feed alternatives, if not PandaScore

| Provider | Cost | Notes |
| --- | --- | --- |
| Cito | $0 → $15 → $59/mo | CS2 only, published self-serve pricing, live on Pro. Good single-title stopgap |
| Liquipedia (MediaWiki API) | Free | Community data, needs attribution, no SLA, rate-limited; LiquipediaDB requires approval and ~60 req/hour |
| GRID / Abios | Sales only, not published | Broadcast-grade official feeds; enterprise contracts, wrong scale for now |

## Function-by-function mapping

Each row is a body swap in `src/lib/content.ts`; signatures stay identical.

| Reader | New source |
| --- | --- |
| `getArticles`, `getArticleBySlug`, `getArticleSlugs`, `getRelatedArticles`, `getArticleCategories` | Sanity `article` documents (GROQ), reference resolution for titles/tags |
| `getMatches`, `getLiveMatches`, `getUpcomingMatches`, `getRecentResults`, `getMatchesForTeam` | PandaScore `/matches` with `filter[status]`, mapped to `Match` |
| `getLeagues`, `getLeague`, `getStandings` | PandaScore `/tournaments` + `/tournaments/{id}/standings` |
| `getTransfers`, `getTransferCounts`, `getRosterSnapshots` | Sanity `transfer` documents (editorial scoops, not a data feed) |
| `getCosplay`, `getCosplayFranchises` | Sanity `cosplayEntry` with image assets |
| `getEvents`, `getUpcomingEvents` | Sanity `event`; optionally cross-check PandaScore tournaments |
| `getTitles`, `getTitle`, `getTeams`, `getTeam`, `getTeamOrFallback` | Sanity `title` / `team` singletons, or PandaScore `/videogames` + `/teams` |
| `getTalent`, `getCapabilities`, `getStudioProjects` | Sanity `creator` / `capability` / `studioProject` — the brief's Creator Roster lives here |
| `getHubs`, `getHubNav` | Derived from the readers above; keep as-is |

`SEED_NOW` disappears from production reads once matches come from the feed;
keep it behind a `USE_SEED` flag so local development and CI stay deterministic
and never depend on a third-party API.

## Delivery sequence

1. **Scaffold + schema (1 day).** Sanity project, schemas for article, event,
   cosplayEntry, transfer, creator, capability, project, siteSettings (tagline,
   vision, mission, values, socials). Studio deploys to `*.sanity.studio`.
2. **Read path behind a flag (1 day).** Implement the Sanity bodies, switch on
   `CONTENT_SOURCE=cms` per reader. Preview deployments stay on seed until each
   collection is verified.
3. **Matches and standings (2 days).** PandaScore client with typed mapping,
   `revalidate: 60` on live data, 300 on fixtures, and error handling that falls
   back to the last good cache rather than an empty board.
4. **Revalidation (0.5 day).** `app/api/revalidate/route.ts` verifying a shared
   secret, mapping document `_type` → tags, called by Sanity webhooks.
5. **Migration + cutover (1 day).** Import the 16 articles and the rest of the
   seed as Sanity documents (scripted), redirect nothing (slugs preserved), flip
   the flags, keep the seed arrays for one release as a rollback.
6. **Hardening (0.5 day).** Rate-limit guard, cache-hit logging, an uptime check
   on the feed, and a "data delayed" indicator in the UI when a fetch fails.

## Cost summary at realistic scale

| Stack | Monthly | One-off effort |
| --- | --- | --- |
| Keystatic/Tina + PandaScore free | $0 | 3–4 days |
| **Sanity free + PandaScore free** | **$0** | **5–6 days** |
| Payload + Neon | $0–25 | 7–9 days |
| Storyblok Growth + PandaScore free | $99 | 4–5 days |
| Contentful Lite + PandaScore historical | $300 + €400/game | 5–6 days |

## Decisions this plan deliberately does not make

- **Live scores.** Paid live data (€1,000/game/mo) is not justified by the
  current UI. Ship schedules and results first; revisit only if match pages
  gain real-time scoreboards with sponsorship value.
- **Multi-title breadth.** PandaScore's per-game pricing punishes breadth. The
  free fixtures plan covers all titles, which is why it fits a six-title hub;
  per-game paid plans would not.
- **Who edits.** If the answer is "one person, occasionally", option 3 is
  honestly better value than option 1.

## Liquipedia, tested

Liquipedia exposes two different APIs and only one of them is usable today.

**MediaWiki API — works.** `scripts/liquipedia-probe.mjs` queries it with the
required User-Agent and two-second spacing. Verified on 2026-11-22:

```
search: LoL Championship Pacific
  LoL Championship Pacific (pageid 90242)
  LCP/2026/Split 3 (pageid 101003)
  ...
wikitext head: LoL Championship Pacific
  |name=LoL Championship Pacific
  |abbreviation=LCP
  |organizer=Riot Games
  |country=Asia-Pacific
```

That is enough to resolve a circuit to its page and its split pages, but the
payload is wikitext. Match rows live in templates (`{{Match}}`, match lists),
which means one parser per template shape and silent breakage whenever editors
change a page. It is fine for *verification and linking*, not for driving a
scoreboard.

**LPDB v3 — needs a key.** `https://api.liquipedia.net/api/v3/match` returns
`403 {"error":["API key \"\" is not valid."]}`. Access is requested from
Liquipedia (free for non-commercial use, with attribution and rate limits) and
returns structured match and tournament records that map cleanly onto `Match`
and `League`.

Recommendation: apply for an LPDB key, then implement `getMatches`,
`getUpcomingMatches` and `getStandings` against LPDB behind the same
`CONTENT_SOURCE` flag, keeping PandaScore's free fixtures plan as the fallback
if the key is refused. Liquipedia content is CC-BY-SA, so any page rendering it
needs visible attribution and a link back to the source wiki; the API terms also
require gzip, a descriptive User-Agent, and at most one request every two
seconds — a cache of 60s for live rows and 1h for fixtures keeps us far inside
that.
