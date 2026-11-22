# Avante Esports — platform & creative studio

An esports organisation site that doubles as a creative studio portfolio and a
multi-title scene hub. Built with **Next.js 16 (App Router)**, **React 19**,
**TypeScript**, **Tailwind CSS v4**, **Lenis** and **GSAP ScrollTrigger**, with
**framer-motion** for the menu and lightbox. No environment variables, no
server to provision: `npm install && npm run dev` is the whole setup.

---

## 1. Architecture

```
src/
├─ app/
│  ├─ layout.tsx              fonts, metadata, header/footer, SmoothScroll (once)
│  ├─ page.tsx                org + studio landing (hero, wire, work, roster, hubs)
│  ├─ news/page.tsx           filterable newsroom (category · title · order · search)
│  ├─ news/[slug]/page.tsx    article template (SSG per story, related stories)
│  ├─ matches/page.tsx        live tracker + upcoming + results
│  ├─ leagues/page.tsx        circuit switcher, standings, league context
│  ├─ transfers/page.tsx      labelled transfer wire + roster snapshots
│  ├─ cosplay/page.tsx        editorial spread + interactive gallery
│  ├─ events/page.tsx         calendar grouped by month
│  └─ gaming-tech/page.tsx    hardware / patch / design desk
├─ components/                presentation only; no data fetching
├─ data/                      seed datasets (the only files tied to fixtures)
└─ lib/
   ├─ types.ts                the domain model everything is typed against
   ├─ content.ts              content adapter — the single read boundary
   ├─ format.ts               deterministic dates (Europe/Berlin)
   ├─ cn.ts                   class joiner
   └─ lenis-store.ts          module-level Lenis handle
```

**Data flow:** pages → `lib/content.ts` → `data/*`. Components never import seed
arrays (except `data/catalogue.ts` for static lookups such as team monograms), so
swapping a data source is a one-file change.

**Design system:** tokens live in `src/app/globals.css` under `@theme` — graphite
surfaces (`ink`), warm paper (`bone`), one structural accent (`cobalt`) used for
links, structure and focus, and one status colour (`live` red) reserved for live
state. Type is Bricolage Grotesque (display) and Instrument Sans (UI/data), both
loaded through `next/font` and self-hosted at build time. Cards are square-cornered
with 1px structural borders rather than shadows; radius is a deliberate non-feature.

### Motion layer

| Piece | File | Behaviour |
| --- | --- | --- |
| Smooth scroll | `components/smooth-scroll.tsx` | One Lenis instance for the tab, driven by GSAP's ticker (`autoRaf: false`), synced with `ScrollTrigger.update`. Resets on route change, resolves `#hash` on navigation, intercepts in-page anchors with an 88px header offset. |
| Reveals | `components/reveal.tsx` | GSAP `fromTo` in a layout effect; supports child staggering. Hidden state is applied by JS only, so content is visible without JS or with reduced motion. |
| Parallax | `components/parallax-media.tsx` | Scrub-linked `yPercent` on an over-scanned image inside `overflow-hidden`. |
| Hero entrance | `globals.css` (`.hero-line`, `.hero-fade`) | One CSS-only orchestrated moment on first paint; no scroll dependency, no hydration cost. |
| Menu / lightbox | `framer-motion` | `AnimatePresence` overlays that pause Lenis via `lib/lenis-store.ts`. |

`prefers-reduced-motion` short-circuits Lenis, the reveals, the parallax and the
marquee. Filtering is URL-driven (plain links + a native `GET` form), so every
view works before hydration and is shareable.

### Reference patterns adopted

* **`darkroomengineering/lenis` GSAP recipe** — `lenis.on("scroll", ScrollTrigger.update)`,
  `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`,
  `autoRaf: false`. Never two rAF loops.
* **App Router caveat handled** — the provider lives in the root layout (survives
  navigation, no re-init flash) and resets scroll per `pathname`, followed by
  `ScrollTrigger.refresh()` after the new tree commits.
* **`next/image` everywhere** — AVIF/WebP, explicit `sizes`, `priority` only on
  the hero and article lead image.
* **ISR-friendly reads** — `revalidate` exported per route (60s matches, 120s news
  and transfers, 300s landing/leagues/tech, 600s cosplay/events). Article routes
  are statically generated from `generateStaticParams`.
* **URL as state** — no client filter store to fall out of sync with the address bar.

---

## 2. Content & API wiring

Everything renders through `src/lib/content.ts`. Each function is `async` and
returns the types in `src/lib/types.ts`; replace the body with a `fetch()` and the
UI keeps working.

| Adapter | Currently reads | Point it at | Suggested route |
| --- | --- | --- | --- |
| `getArticles`, `getArticleBySlug`, `getArticleSlugs`, `getRelatedArticles` | `data/articles.ts` | Headless CMS (Sanity, Contentful, Storyblok) | `GET /api/articles?category=&title=&sort=&q=` |
| `getMatches`, `getLiveMatches`, `getUpcomingMatches`, `getRecentResults` | `data/matches.ts` | Scores provider (PandaScore, Abios, Riot/Valve APIs, or your own poller) | `GET /api/matches?title=&status=&league=` |
| `getLeagues`, `getLeague`, `getStandings` | `data/leagues.ts` | League API or CMS | `GET /api/leagues/:id` |
| `getTransfers`, `getRosterSnapshots` | `data/transfers.ts` | Internal transfer wire / editorial tool | `GET /api/transfers?title=&status=` |
| `getCosplay`, `getCosplayFranchises` | `data/culture.ts` | CMS gallery collection | `GET /api/cosplay` |
| `getEvents`, `getUpcomingEvents` | `data/culture.ts` | Calendar / ticketing source | `GET /api/events` |
| `getStudioProjects`, `getCapabilities` | `data/studio.ts` | CMS case-study collection | `GET /api/studio` |
| `getTitles`, `getTeam`, `getTalent` | `data/catalogue.ts` | Teams/titles reference service | `GET /api/reference` |

### Field mapping notes

* **Articles** need `slug` (unique, URL-safe), `category`, `titleIds`, `tags`,
  `author`, `publishedAt` (ISO), `readMinutes`, optional `image`/`imageAlt`,
  `featured`/`trending`, `sourcing` (`confirmed | sources | rumour`) for leak
  badges, and `blocks[]` (`heading?`, `paragraphs[]`, `quote?`). Rich text from a
  CMS maps cleanly onto blocks; keep the quote as a first-class block so pull
  quotes stay styled.
* **Matches** need `status` (`live | upcoming | completed`), ISO `startsAt`,
  `bestOf`, `home`/`away` with `teamId` + nullable `score`, plus `leagueId`,
  `tournament`, `stage`, optional `note`, `venue`, `stream`, `maps[]`.
* **Transfer status is editorial, not cosmetic.** `confirmed` must come from a
  club/player announcement; `report` from two independent sources; `rumour` is
  unverified. The UI badges these differently and the page explains the policy —
  keep that mapping when wiring a feed.
* **Events** use date-only `startDate`/`endDate` (`YYYY-MM-DD`) with a `format`
  (`lan | online | hybrid`) and `status` (`on-sale | invite-only | free-entry |
  sold-out`).

### Live behaviour

Live state is seeded, not polled. For production:

1. Keep hub pages on ISR (`revalidate = 60` on `/matches`) for a cheap "near-live"
   board, **or** fetch client-side for second-by-second scores.
2. For true live, add a small client component that calls a route handler every
   N seconds and renders inside the existing `MatchCard` contract — the seed
   `status` values already drive every visual state.
3. Do provider calls server-side (route handler or server component) so API keys
   never reach the browser. Put them in `.env.local` / Vercel env vars.

### Media

Drop new artwork in `public/images` and reference it by absolute path
(`/images/foo.jpg`). `next/image` handles sizing; add `width`/`height` or use the
existing `fill` + aspect-ratio wrappers. Keep source images ≥1600px wide for
16:9 crops and ≥1200px tall for 4:5 cosplay crops.

### Expanding the hub

* **New title:** add to `titles` and `teams` in `data/catalogue.ts`, then to
  `TitleId` in `lib/types.ts`. Filters, badges and match cards pick it up.
* **New league:** add a `League` with standings to `data/leagues.ts`. The
  `/leagues` switcher and `?league=` routing are automatic.
* **New vertical:** add an entry to `data/hubs.ts` and a route under `src/app/`.
  Navigation, the footer and the landing directory are generated from that list.

---

## 3. Run & deploy

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (Turbopack)
npm start
npm run typecheck  # tsc --noEmit
```

**Vercel:** push to GitHub, import the repo, accept the detected Next.js preset —
no build settings, no environment variables, no rewrites required. Every route is
statically rendered or ISR-cached, so the default deployment is fast without a
paid tier. Fonts are self-hosted through `next/font` at build time.

**Notes on this build:** all fixtures, standings, transfers and stories are seed
data in `src/data`. `SEED_NOW` in `lib/content.ts` fixes "today" to 22 Nov 2026 so
the calendar and "upcoming" logic stay deterministic in builds.
