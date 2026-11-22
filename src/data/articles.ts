import type { Article } from "@/lib/types";

const editors = {
  marta: { name: "Marta Vilela", role: "Editor-in-chief" },
  jonas: { name: "Jonas Reiter", role: "Senior writer, League of Legends" },
  priya: { name: "Priya Raman", role: "VALORANT & CS2 desk" },
  tomas: { name: "Tomás Brandão", role: "Culture & cosplay" },
  ines: { name: "Inês Duarte", role: "Transfers desk" },
  studio: { name: "Avante Studio", role: "Studio notes" },
} as const;

export const articles: Article[] = [
  {
    id: "a-inv-final",
    slug: "avante-force-game-five-in-invitational-final",
    title: "Avante force a game five against Cebu Kings in the Invitational final",
    dek: "Two maps, two answers, and a Cebu crowd that has not sat down since the draft. The Invitational final goes the distance.",
    category: "news",
    titleIds: ["league-of-legends"],
    tags: ["LCP", "AVT", "Avante Invitational"],
    author: editors.jonas,
    publishedAt: "2026-11-22T18:40:00.000Z",
    readMinutes: 3,
    featured: true,
    trending: true,
    image: "/images/arena.jpg",
    imageAlt: "Stage lights over a packed arena floor during a League of Legends final",
    blocks: [
      {
        paragraphs: [
          "Avante took game one with a composition that shouldn't have worked: a double-tank front line, a mid laner on a pick nobody had scrimmed, and 22 minutes of nothing happening before everything happened at once. Cebu Kings answered in game two by banning the pick and taking the tempo back with a five-minute bot-side collapse.",
          "Game three is where the final turned into a series. Avante's coach Mira burned two bans on comfort picks, handed Lume the counter-matchup, and watched the mid laner go 4/0/6 before the first tower fell. The crowd noise at the Velodrom made the broadcast audio clip for the second time this weekend.",
        ],
        quote: {
          text: "We stopped trying to win the draft and started trying to win the next fight. That's the whole adjustment.",
          attribution: "Mira, Avante head coach",
        },
      },
      {
        heading: "What to watch in the decider",
        paragraphs: [
          "Cebu Kings have won every game five they have played this calendar year, and they have won them the same way: early jungle pressure, a support roam at six minutes, and a Herald they refuse to contest unless the odds are absurd. Avante's answer all season has been to trade the Herald for two waves and a plate — which keeps them close, but rarely ahead.",
          "The fearless format means both teams are drafting from a depleted pool. Expect Avante to open with the utility jungler they have held back all weekend, and expect Cebu Kings to test whether Fenrir will take the fight at the first Drake.",
        ],
      },
    ],
  },
  {
    id: "a-kael",
    slug: "sources-avante-agree-terms-with-support-kael",
    title: "Sources: Avante agree terms with support Kael for 2027",
    dek: "The 20-year-old has a verbal agreement in place, with an academy buyout the last item on the table.",
    category: "leaks",
    titleIds: ["league-of-legends"],
    tags: ["LCP", "AVT", "LEAK"],
    author: editors.ines,
    publishedAt: "2026-11-22T09:15:00.000Z",
    readMinutes: 2,
    trending: true,
    sourcing: "sources",
    blocks: [
      {
        paragraphs: [
          "Avante have reached a verbal agreement with support Kael, according to two people with knowledge of the negotiations. The 20-year-old spent 2026 on a academy roster in the Philippine academy circuit and is regarded inside the org as the cheapest route to a top-four LCP support.",
          "The remaining hurdle is a buyout clause reported at ₱9.6 million, which Avante want structured across two payments. Talks are described as advanced but not signed, and one source cautioned that a second LCP team has asked to be kept informed.",
        ],
      },
      {
        heading: "Why the move makes sense",
        paragraphs: [
          "Avante's 2026 support play was steady and passive: the third-lowest roam rate in the league and the second-highest ward count, a profile that kept Lume safe and left Fenrir alone on the map. Kael's academy tape is the opposite — aggressive roams, early river control, and a willingness to lose a wave to start a fight.",
          "If it closes, Avante would enter the 2027 winter split with three players under 22 and the same coaching staff that took them to a top-eight finish at Worlds.",
        ],
      },
    ],
  },
  {
    id: "a-studio-lec",
    slug: "inside-the-lec-2027-broadcast-package",
    title: "Eleven weeks, one graphics package: inside the LCP 2027 build",
    dek: "A studio diary on type tests, lower-third timing, and the argument about whether a scoreboard should ever be beautiful.",
    category: "features",
    titleIds: ["league-of-legends"],
    tags: ["Studio", "Broadcast", "LCP"],
    author: editors.studio,
    publishedAt: "2026-11-20T11:00:00.000Z",
    readMinutes: 6,
    featured: true,
    image: "/images/studio-set.jpg",
    imageAlt: "Production desk with multiview monitors and a graphics operator at work",
    blocks: [
      {
        paragraphs: [
          "The brief arrived on a Tuesday with a hard date attached: eleven weeks until the 2027 winter split opener, one motion system, six show opens, and a scoreboard that had to survive being read on a phone at 480p in a noisy room.",
          "We started with the scoreboard, because everything else follows it. A broadcast scoreboard is not a poster. It is read in a glance, at a distance, by someone who has already looked away. That rules out most of the expressive type we wanted to use, and it forced the whole identity into a narrower set of decisions: one display weight, two sizes, and a rule that numbers never move unless the number itself changes.",
        ],
        quote: {
          text: "If the scoreboard needs a second glance, the design has failed no matter how good the open looks.",
          attribution: "Nadia Osei, motion director",
        },
      },
      {
        heading: "The open, and the three seconds that matter",
        paragraphs: [
          "Show opens live or die in their first three seconds, because that is how long the viewer gives you before deciding to look at their phone. Ours builds from a single vertical line — the studio's spine motif — that multiplies into the ten team columns of the league table, then collapses into the show title.",
          "The whole thing is rendered in the browser first, at 60fps, with the real font files and the real team colours. Motion that only exists in After Effects is a promise; motion that runs in the browser is a spec.",
        ],
      },
      {
        heading: "What ships, and what we keep",
        paragraphs: [
          "Delivered: 42 lower thirds, 10 team packages, 6 show opens, a finals bumper, and a 90-page usage guide that fits on four pages because nobody reads the other 86. Kept: a component library that lets the league's own operators build a new package for a new title in a day.",
          "The next build starts in March, for a title we can't name yet. The spine motif is staying.",
        ],
      },
    ],
  },
  {
    id: "a-offseason-tracker",
    slug: "lec-2027-offseason-tracker",
    title: "The 2027 LCP offseason tracker: every confirmed move",
    dek: "Six rosters have already changed shape. We are keeping the receipts in one place, updated as deals are signed.",
    category: "news",
    titleIds: ["league-of-legends"],
    tags: ["LCP", "Transfers"],
    author: editors.ines,
    publishedAt: "2026-11-21T08:00:00.000Z",
    readMinutes: 4,
    trending: true,
    blocks: [
      {
        paragraphs: [
          "The LCP's 2026 season ended with Cebu Kings on top and three rosters already planning for a rebuild. Two weeks later, the market has moved faster than any offseason since the franchise model began: six of ten teams have confirmed at least one change, and three more are waiting on buyouts.",
          "Below is what is signed, what is reported, and what is still noise. Anything marked as a report comes from at least two independent sources and has not been confirmed by either org.",
        ],
      },
      {
        heading: "Confirmed",
        paragraphs: [
          "Quezon Reapers have completed the Myrwn signing from Cagayan Raiders, a move that had been reported for eleven days before the announcement. Bacolod Storm brought in Trymbi on a one-year deal to stabilise a support position that cycled through three players in 2026. Davao Forge replaced Oscarinin after four seasons, and Cagayan Raiders have begun rebuilding around their academy mid.",
          "Avante's only confirmed business so far is a two-year extension for Kaze, the largest contract in the organisation's history. The support position remains open.",
        ],
      },
      {
        heading: "Reported, not signed",
        paragraphs: [
          "Kael to Avante is the closest thing to done without a signature. Sable to Manila Vipers is being explored but is not close, and the buyout figure being floated is higher than the number two sources have seen. Treat both as unconfirmed until an org says otherwise.",
        ],
      },
    ],
  },
  {
    id: "a-val-academy",
    slug: "avante-promote-academy-duo-for-valorant-2027",
    title: "Avante promote two academy players into the VALORANT starting five",
    dek: "Solace and Halo step up after a season in the Ascension pipeline, with the org keeping its import slot open.",
    category: "news",
    titleIds: ["valorant"],
    tags: ["VCT Pacific", "AVT", "Academy"],
    author: editors.priya,
    publishedAt: "2026-11-19T10:30:00.000Z",
    readMinutes: 3,
    blocks: [
      {
        paragraphs: [
          "Avante will start the 2027 VCT Pacific kickoff with two academy promotions, the organisation confirmed on Wednesday. Solace, an initiator who spent 2026 as the academy's primary caller, and Halo, a flex player who has covered every role except controller at tier two, will both step into the main roster.",
          "The move keeps Avante's import slot open, which the org intends to use on a controller if the right player becomes available before the roster lock. Until then, Rook moves back to the role he played in 2025.",
        ],
      },
      {
        heading: "A cheaper, faster roster",
        paragraphs: [
          "The financial logic is straightforward: two academy contracts cost less than one established tier-one starter, and the org avoids the buyout market entirely. The sporting logic is riskier. Solace has never called against a partnered team, and the kickoff format gives new rosters two weeks before results start to matter.",
          "Avante's head of VALORANT, Ren Ito, framed it as a deliberate cycle rather than a budget decision. \"We had the fourth-most expensive roster in the league and finished fourth,\" he said. \"That is a bad trade. We would rather be early on two players than late on five.\"",
        ],
      },
    ],
  },
  {
    id: "a-cosplay-production",
    slug: "cosplay-is-production-berlin-build-rooms",
    title: "Cosplay is production: a day inside Cebu's build rooms",
    dek: "Foam, resin, a borrowed sewing machine and twelve weeks of unpaid craft. The makers behind the scene's best sets explain the work.",
    category: "features",
    titleIds: ["league-of-legends", "valorant"],
    tags: ["Cosplay", "Craft", "Cebu"],
    author: editors.tomas,
    publishedAt: "2026-11-18T09:00:00.000Z",
    readMinutes: 7,
    image: "/images/cosplay-01.jpg",
    imageAlt: "Cosplayer in an elaborate armoured costume under studio lighting",
    blocks: [
      {
        paragraphs: [
          "The room smells of contact adhesive and coffee. There are four sewing machines, two heat guns, a shelf of half-finished helmets, and a printed timetable on the wall that says, in marker, 'PHOTOSHOOT — 6 DAYS — DO NOT TOUCH THE WINGS'.",
          "Lior has been building the Jinx set for twelve weeks. The armour is EVA foam over a 3D-printed frame, the wig is hand-knotted, and the paint job has been redone twice because the first pass photographed too blue under the studio's key light. None of it is unusual. All of it is invisible in the final image.",
        ],
        quote: {
          text: "People see a character. What we see is a list of things that could break in the next four hours.",
          attribution: "Lior, cosplayer and builder",
        },
      },
      {
        heading: "The unsung half of the scene",
        paragraphs: [
          "Cosplay coverage usually stops at the photograph. The photograph is the last ten minutes of a process that runs for months: pattern drafting, resin casting in a kitchen, three fittings, and a repair kit packed for the con floor.",
          "The best sets in Cebu are built by people who describe themselves as production crews first and cosplayers second. They share moulds, lend machines, and keep a group chat of suppliers who will sell two metres of the right fabric without a minimum order.",
        ],
      },
      {
        heading: "How we shoot it",
        paragraphs: [
          "For this series, Avante Studio lights cosplay the way we light a roster announcement: a single key, a hard rim, and enough negative fill to make the material read. No compositing, no painted backgrounds. If the build has a seam, the seam stays in the frame.",
        ],
      },
    ],
  },
  {
    id: "a-cs2-defaults",
    slug: "cs2-map-pool-slow-defaults",
    title: "CS2's map pool is quietly rewarding slow defaults again",
    dek: "The utility economy changed, the maps did not, and the best teams have stopped rushing the first 20 seconds.",
    category: "guides",
    titleIds: ["cs2"],
    tags: ["CS2", "Analysis", "Meta"],
    author: editors.priya,
    publishedAt: "2026-11-17T12:00:00.000Z",
    readMinutes: 5,
    blocks: [
      {
        paragraphs: [
          "Watch the first minute of a tier-one CS2 map right now and you will see something that would have looked strange eighteen months ago: nothing. No early rush, no five-man stack, no gamble. Two players take map control, three hold, and the execute waits for a utility count.",
          "The reason is the utility economy. With the current pricing, a full execute costs roughly the same as two saves, and losing the first gun round no longer hands the opponent a comfortable second. Teams that spend utility on speculative aggression are handing away the mid-round they need.",
        ],
      },
      {
        heading: "What this means for viewers",
        paragraphs: [
          "Slow defaults are not passive. They are a negotiation over three pieces of the map at once, and the moment one team gets a free kill or a free smoke, the round compresses into ten seconds. If you want to understand a round, watch the utility, not the scoreboard.",
          "The practical read: teams with a dedicated lurker are outperforming teams with a second entry, and the best AWPers in the pool are taking fewer opening duels than at any point since 2024.",
        ],
      },
    ],
  },
  {
    id: "a-rlcs-expansion",
    slug: "report-rlcs-emea-expands-to-sixteen-teams",
    title: "Report: RLCS APAC expands to sixteen teams for 2027",
    dek: "Two open-qualifier slots would be added to the regional, with a revised points structure rewarding consistency over peaks.",
    category: "leaks",
    titleIds: ["rocket-league"],
    tags: ["RLCS", "APAC", "LEAK"],
    author: editors.ines,
    publishedAt: "2026-11-16T15:00:00.000Z",
    readMinutes: 2,
    sourcing: "sources",
    blocks: [
      {
        paragraphs: [
          "RLCS APAC will expand from fourteen to sixteen teams for the 2027 season, according to three people briefed on the plans, with two places reserved for open qualifiers rather than invited organisations.",
          "The points structure is also expected to change: regional weekends would carry equal weight, replacing the current system that makes the third regional worth more than the first. The stated aim is to stop teams from treating the first two weekends as practice.",
        ],
      },
      {
        heading: "Who benefits",
        paragraphs: [
          "Open-qualifier teams, obviously, and orgs with strong academy pipelines. Avante's Rocket League roster would be unaffected in the short term, but a fairer points system helps a team that has historically started seasons slowly and finished them well.",
          "An official announcement is expected before the world championship in Fort Worth. Neither RLCS nor the teams contacted for this story would comment.",
        ],
      },
    ],
  },
  {
    id: "a-handheld-bootcamp",
    slug: "handheld-pcs-are-changing-bootcamps",
    title: "The handheld PC era is changing how orgs bootcamp",
    dek: "Portable rigs are now good enough for scrim blocks, and teams are using them to cut travel weeks in half.",
    category: "gaming-tech",
    titleIds: ["league-of-legends", "cs2"],
    tags: ["Hardware", "Bootcamp", "Tech"],
    author: editors.marta,
    publishedAt: "2026-11-15T09:30:00.000Z",
    readMinutes: 4,
    blocks: [
      {
        paragraphs: [
          "Three years ago, a bootcamp meant a LAN room, ten desks, and a house. This winter, two APAC orgs are running their first scrim blocks from handheld PCs, with players in four countries and a coach on a laptop in Cebu.",
          "The pitch is not performance — a handheld will not match a desktop at 360Hz. It is availability. A player can take a scrim block from a hotel room, a train, or their parents' house, which matters in a sport where the offseason is eight weeks long and half of it is spent travelling.",
        ],
      },
      {
        heading: "The compromises",
        paragraphs: [
          "Input latency is the obvious one, and it is measurable. Teams running handheld blocks report 12–18ms of additional end-to-end latency compared with a tuned desktop, which is enough to change how a rifler peeks but not enough to break a macro scrim.",
          "The other compromise is culture. Bootcamp is as much about the walk to dinner as the practice, and no amount of portable hardware replaces a shared room. The orgs experimenting with it are framing it as an offseason tool, not a permanent move.",
        ],
      },
    ],
  },
  {
    id: "a-mira-interview",
    slug: "mira-interview-roster-that-argues-well",
    title: "Mira: “A roster that argues well wins more than a roster that agrees”",
    dek: "Avante's head coach on the worst review meeting of the season, the value of a losing streak, and why she banned one word from the room.",
    category: "interviews",
    titleIds: ["league-of-legends"],
    tags: ["LCP", "AVT", "Interview"],
    author: editors.jonas,
    publishedAt: "2026-11-14T10:00:00.000Z",
    readMinutes: 8,
    image: "/images/roster.jpg",
    imageAlt: "Esports team seated together on stage under arena lighting",
    blocks: [
      {
        paragraphs: [
          "Mira has been coaching for nine years and has the flat delivery of someone who has stopped needing to be liked. We met in the Avante studio an hour before the Invitational semi-final, in a room with a whiteboard still showing the draft of a game that had already been played.",
          "She does not want to talk about the Worlds run, which ended in a quarter-final against BLG. She wants to talk about week four of the summer split, when Avante lost four in a row and the coaching staff considered changing the shot-caller.",
        ],
        quote: {
          text: "The losing streak was the most useful thing that happened to us. Nobody could pretend the system was working.",
          attribution: "Mira",
        },
      },
      {
        heading: "On disagreement",
        paragraphs: [
          "“I banned the phrase 'I think' from review,” she says. “Not because I want certainty. Because I want reasons. If you think the Baron is wrong, tell me what you saw. A call with a reason can be argued with. A call without one is just a mood.”",
          "The result, she argues, is a roster that fights in review and then plays without hesitation. The data backs up the second half: Avante have the second-fastest average Baron start in the league and the highest conversion rate off it.",
        ],
      },
      {
        heading: "On what comes next",
        paragraphs: [
          "Avante enter 2027 with three players under 22 and a support position still unfilled. Mira is unbothered by the timeline. “Every roster I have won with had a hole in it in November,” she says. “The hole is not the problem. Pretending it's not there is.”",
        ],
      },
    ],
  },
  {
    id: "a-forward-film",
    slug: "avante-film-wraps-forward-documentary",
    title: "Avante Film wraps “Forward”, a 12-minute season documentary",
    dek: "Shot across three countries and eleven match days, the film follows the roster from the summer collapse to the Worlds quarter-final.",
    category: "news",
    titleIds: ["league-of-legends"],
    tags: ["Studio", "Film", "AVT"],
    author: editors.studio,
    publishedAt: "2026-11-12T14:00:00.000Z",
    readMinutes: 3,
    blocks: [
      {
        paragraphs: [
          "Avante Film has finished post-production on “Forward”, a twelve-minute documentary covering the 2026 season. The film is built from 74 hours of footage shot by a two-person crew embedded with the team from June to November.",
          "Unlike the org's announcement films, “Forward” has no interview lighting and no score in its first four minutes. The crew shot available-light, on location, in hotel corridors and practice rooms, and the edit keeps the room tone in.",
        ],
      },
      {
        heading: "Where it screens",
        paragraphs: [
          "The film premieres at the Velodrom on the closing night of the Avante Invitational, then goes to the org's channels the following week. A 4K master and a 30-second cutdown for broadcast are included in the delivery.",
        ],
      },
    ],
  },
  {
    id: "a-new-agent",
    slug: "valorant-new-agent-map-control-problem",
    title: "VALORANT's newest agent is a map-control problem, not a duelist",
    dek: "The kit reads like a fragger. The professional consensus is that it will be played as a sentinel, and that changes the map pool.",
    category: "gaming-tech",
    titleIds: ["valorant"],
    tags: ["VALORANT", "Meta", "Analysis"],
    author: editors.priya,
    publishedAt: "2026-11-10T11:30:00.000Z",
    readMinutes: 5,
    blocks: [
      {
        paragraphs: [
          "Every new agent gets evaluated in the same order: can it entry, can it hold, does it break a map. The newest one fails the first test and passes the second so convincingly that three VCT coaches have already said they will play it as a sentinel.",
          "The kit's defining ability is a slow that can be placed through geometry and recalled. On defence, that is a one-way smoke that costs nothing to reposition. On attack, it is a post-plant tool that forces a retake into a corridor. Neither use requires the player to take a duel.",
        ],
      },
      {
        heading: "The map implications",
        paragraphs: [
          "Narrow maps with a single chokepoint get better for the agent. Wide maps with three entrances get worse. If the pick rate holds, expect the pro pool to drift toward the former and expect teams that cannot play a slow retake to start banning it.",
        ],
      },
    ],
  },
  {
    id: "a-watch-invitational",
    slug: "how-to-watch-the-avante-invitational",
    title: "How to watch the Avante Invitational: bracket, times, stream",
    dek: "Four days, eight teams, one stage in Cebu. Everything you need to follow the final.",
    category: "guides",
    titleIds: ["league-of-legends"],
    tags: ["Avante Invitational", "Guide", "LCP"],
    author: editors.marta,
    publishedAt: "2026-11-19T16:00:00.000Z",
    readMinutes: 2,
    blocks: [
      {
        paragraphs: [
          "The Avante Invitational runs 20–23 November at the Velodrom in Cebu. Eight teams, single elimination, best-of-five grand final. Broadcast is in English and Filipino on the org's Twitch channel, with a clean feed available for co-streamers.",
          "Doors open two hours before the first match each day. The venue is sold out for the final; returns are released on the official resale partner at 10:00 PHT on match days.",
        ],
      },
      {
        heading: "The bracket",
        paragraphs: [
          "Cebu Kings and Avante reached the final through opposite sides of the bracket. Cebu Kings beat Davao Forge 2–1 in the quarter-final and Quezon Reapers 2–0 in the semi. Avante beat Bacolod Storm 2–0 in the semi after a 2–0 quarter-final against Zamboanga Reef.",
        ],
      },
    ],
  },
  {
    id: "a-worlds-numbers",
    slug: "worlds-2026-in-numbers",
    title: "Worlds 2026 in numbers: the tournament that broke the record book",
    dek: "Peak viewership, the longest series, the fastest game, and the stat that explains why this Worlds felt different.",
    category: "features",
    titleIds: ["league-of-legends"],
    tags: ["Worlds", "Analysis"],
    author: editors.jonas,
    publishedAt: "2026-11-15T08:00:00.000Z",
    readMinutes: 6,
    trending: true,
    image: "/images/event-crowd.jpg",
    imageAlt: "Crowd silhouettes and stage screens at a major esports final",
    blocks: [
      {
        paragraphs: [
          "Worlds 2026 finished with the highest peak audience in the tournament's history and the shortest average game time since 2019. Those two numbers are related, and the relationship is the story of the event.",
          "Shorter games did not mean faster starts. The average first blood arrived later than in 2025. What changed is the middle: teams that got ahead converted faster, and teams that fell behind were more willing to take a losing fight rather than bleed out over ten minutes.",
        ],
      },
      {
        heading: "Three numbers worth keeping",
        paragraphs: [
          "42: the number of champions picked at least once, the widest pool in five years. 18: the longest series of the tournament, in minutes of game time. 71%: the conversion rate of the team that took the first Baron — the highest since the stat was first tracked.",
          "Taken together, they describe a tournament where draft breadth mattered less than mid-game decisiveness. That is a good sign for the sport and a worrying one for teams that win in the draft.",
        ],
      },
    ],
  },
  {
    id: "a-tier-two",
    slug: "quiet-economics-of-tier-two-esports",
    title: "The quiet economics of tier-two esports in 2027",
    dek: "Fewer salaries, more revenue share, and a generation of players who are treating the academy as a career rather than a waiting room.",
    category: "features",
    titleIds: ["league-of-legends", "valorant"],
    tags: ["Business", "Academy", "Analysis"],
    author: editors.marta,
    publishedAt: "2026-11-08T09:00:00.000Z",
    readMinutes: 7,
    blocks: [
      {
        paragraphs: [
          "Tier two has spent a decade being described as a pipeline and funded like a hobby. In 2027 it will be funded, in several Southeast Asian markets, like a small business: lower base salaries, larger revenue shares, and contracts that pay a player a percentage of the buyout that takes them to tier one.",
          "The change is being driven less by idealism than by arithmetic. Partnered orgs cannot carry eight-figure academy budgets, and the players who would once have quit at 20 are staying because a tier-two salary plus streaming now covers rent.",
        ],
      },
      {
        heading: "What it costs a player",
        paragraphs: [
          "Revenue-share contracts shift risk onto the player. A strong season pays more than the old flat salary; a weak one pays less, and the buyout clause can make a move expensive enough to deter the teams that would develop the player further.",
          "The orgs that get this right are the ones treating tier two as a product with an audience, not a cost centre with a fixture list. That means broadcast, storytelling and a schedule that a fan can follow.",
        ],
      },
    ],
  },
  {
    id: "a-scrim-facility",
    slug: "avante-karmine-corp-shared-scrim-facility",
    title: "Avante and Manila Vipers open a shared scrim facility in Cebu",
    dek: "Two rival LCP orgs, one building, and a scheduling system designed to keep the secrets on separate floors.",
    category: "news",
    titleIds: ["league-of-legends", "valorant", "cs2"],
    tags: ["LCP", "AVT", "MNL", "Facilities"],
    author: editors.marta,
    publishedAt: "2026-11-06T13:00:00.000Z",
    readMinutes: 3,
    blocks: [
      {
        paragraphs: [
          "Avante and Manila Vipers have jointly opened a 900m² practice facility in Cebu's IT Park, with separate floors, separate networks and a shared physical training space that both orgs will use on alternating days.",
          "The building houses eleven practice rooms, a broadcast-grade streaming booth, and a recovery suite. Crucially, the two orgs do not share a network segment, a scheduling calendar or a single practice room. The shared space is limited to the gym, the kitchen and a media room.",
        ],
      },
      {
        heading: "Why rivals share a building",
        paragraphs: [
          "Cebu's commercial property market has made standalone facilities expensive, and both orgs needed more space than either could justify alone. The arrangement cuts each org's fixed costs by roughly a third, according to two people familiar with the lease.",
          "It also creates a scrimming partner next door, though both orgs insist they will not scrim each other during a split. The scheduling system, built in-house, enforces a two-week embargo around any match between them.",
        ],
      },
    ],
  },
];
