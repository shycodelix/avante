import type { League } from "@/lib/types";

/**
 * Circuit tables. The 2026 splits are final, which is why the transfer hub is
 * busy: every roster note below belongs to the 2027 rebuild.
 */
export const leagues: League[] = [
  {
    id: "lec",
    name: "League of Legends EMEA Championship",
    short: "LEC",
    titleId: "league-of-legends",
    region: "EMEA",
    tier: "Tier 1",
    format: "Fearless draft · BO3 regular season, BO5 playoffs",
    season: "2026 · complete",
    prizePool: "€1.2M",
    description:
      "Ten partnered teams, one studio in Berlin, and the loudest regular season in the West. The 2027 winter split opens on 15 January with a single round-robin and a top-six bracket.",
    standings: [
      { teamId: "g2-lol", played: 18, wins: 14, losses: 4, mapDiff: 19, points: 14, form: ["W", "W", "L", "W", "W"] },
      { teamId: "kc-lol", played: 18, wins: 13, losses: 5, mapDiff: 14, points: 13, form: ["W", "L", "W", "W", "W"] },
      { teamId: "vit-lol", played: 18, wins: 11, losses: 7, mapDiff: 7, points: 11, form: ["L", "W", "W", "L", "W"] },
      { teamId: "avante-lol", played: 18, wins: 10, losses: 8, mapDiff: 5, points: 10, form: ["W", "W", "L", "L", "W"] },
      { teamId: "fnc-lol", played: 18, wins: 9, losses: 9, mapDiff: 1, points: 9, form: ["L", "W", "L", "W", "L"] },
      { teamId: "th-lol", played: 18, wins: 9, losses: 9, mapDiff: -1, points: 9, form: ["W", "L", "L", "W", "L"] },
      { teamId: "koi-lol", played: 18, wins: 8, losses: 10, mapDiff: -4, points: 8, form: ["L", "L", "W", "W", "L"] },
      { teamId: "sk-lol", played: 18, wins: 7, losses: 11, mapDiff: -8, points: 7, form: ["L", "W", "L", "L", "W"] },
      { teamId: "gx-lol", played: 18, wins: 6, losses: 12, mapDiff: -13, points: 6, form: ["L", "L", "W", "L", "L"] },
      { teamId: "bds-lol", played: 18, wins: 3, losses: 15, mapDiff: -20, points: 3, form: ["L", "L", "L", "W", "L"] },
    ],
  },
  {
    id: "lck",
    name: "League of Legends Champions Korea",
    short: "LCK",
    titleId: "league-of-legends",
    region: "Korea",
    tier: "Tier 1",
    format: "Double round-robin, BO3 · playoffs BO5",
    season: "2026 · complete",
    prizePool: "₩500M",
    description:
      "The most punishing regular season in the world, played out of LoL Park in Seoul with a full double round-robin and a six-team playoff bracket.",
    standings: [
      { teamId: "t1-lol", played: 16, wins: 13, losses: 3, mapDiff: 21, points: 13, form: ["W", "W", "W", "L", "W"] },
      { teamId: "geng-lol", played: 16, wins: 13, losses: 3, mapDiff: 18, points: 13, form: ["W", "L", "W", "W", "W"] },
      { teamId: "hle-lol", played: 16, wins: 10, losses: 6, mapDiff: 8, points: 10, form: ["L", "W", "W", "W", "L"] },
      { teamId: "kt-lol", played: 16, wins: 8, losses: 8, mapDiff: 1, points: 8, form: ["W", "L", "L", "W", "W"] },
    ],
  },
  {
    id: "vct-emea",
    name: "VALORANT Champions Tour EMEA",
    short: "VCT EMEA",
    titleId: "valorant",
    region: "EMEA",
    tier: "Tier 1",
    format: "Kickoff + two stages · BO3, BO5 finals",
    season: "2026 · complete",
    prizePool: "$750K",
    description:
      "Eleven partnered teams, one Ascension slot, and a season that now runs kickoff to championship points without a mid-year reset.",
    standings: [
      { teamId: "fnc-val", played: 18, wins: 14, losses: 4, mapDiff: 16, points: 14, form: ["W", "W", "W", "L", "W"] },
      { teamId: "th-val", played: 18, wins: 12, losses: 6, mapDiff: 9, points: 12, form: ["W", "L", "W", "W", "L"] },
      { teamId: "kc-val", played: 18, wins: 11, losses: 7, mapDiff: 6, points: 11, form: ["L", "W", "W", "W", "W"] },
      { teamId: "avante-val", played: 18, wins: 10, losses: 8, mapDiff: 2, points: 10, form: ["W", "W", "L", "L", "W"] },
      { teamId: "navi-val", played: 18, wins: 8, losses: 10, mapDiff: -2, points: 8, form: ["L", "L", "W", "W", "L"] },
    ],
  },
  {
    id: "vct-americas",
    name: "VALORANT Champions Tour Americas",
    short: "VCT Americas",
    titleId: "valorant",
    region: "Americas",
    tier: "Tier 1",
    format: "Kickoff + two stages · BO3, BO5 finals",
    season: "2026 · complete",
    prizePool: "$750K",
    description:
      "Los Angeles and São Paulo share the season, with the Ascension winner arriving in 2027 and a revised two-stage calendar.",
    standings: [
      { teamId: "sen-val", played: 18, wins: 13, losses: 5, mapDiff: 13, points: 13, form: ["W", "W", "L", "W", "W"] },
      { teamId: "loud-val", played: 18, wins: 11, losses: 7, mapDiff: 5, points: 11, form: ["W", "L", "W", "L", "W"] },
      { teamId: "tl-val", played: 18, wins: 9, losses: 9, mapDiff: 0, points: 9, form: ["L", "W", "W", "L", "L"] },
    ],
  },
  {
    id: "esl-pro-league",
    name: "ESL Pro League",
    short: "EPL",
    titleId: "cs2",
    region: "Global",
    tier: "Tier 1",
    format: "Four Swiss groups · single-elimination playoffs",
    season: "Season 24 · playoffs",
    prizePool: "$1M",
    description:
      "Thirty-two teams, four Swiss groups, one arena weekend in Malta. Group tables below reflect the completed group stage.",
    standings: [
      { teamId: "vit-cs", played: 5, wins: 5, losses: 0, mapDiff: 8, points: 5, form: ["W", "W", "W", "W", "W"] },
      { teamId: "mouz-cs", played: 5, wins: 4, losses: 1, mapDiff: 5, points: 4, form: ["W", "W", "L", "W", "W"] },
      { teamId: "avante-cs", played: 5, wins: 3, losses: 2, mapDiff: 2, points: 3, form: ["W", "L", "W", "L", "W"] },
      { teamId: "navi-cs", played: 5, wins: 3, losses: 2, mapDiff: 1, points: 3, form: ["L", "W", "W", "L", "W"] },
      { teamId: "faze-cs", played: 5, wins: 2, losses: 3, mapDiff: -2, points: 2, form: ["L", "L", "W", "W", "L"] },
      { teamId: "spirit-cs", played: 5, wins: 2, losses: 3, mapDiff: -3, points: 2, form: ["W", "L", "L", "W", "L"] },
    ],
  },
  {
    id: "rlcs-emea",
    name: "RLCS EMEA Regional",
    short: "RLCS EMEA",
    titleId: "rocket-league",
    region: "EMEA",
    tier: "Tier 1",
    format: "Open qualifiers → double-elimination regional",
    season: "2026 · complete",
    prizePool: "$300K",
    description:
      "Sixteen teams, three regional weekends and a points race that now sends four EMEA rosters straight to the world championship group stage.",
    standings: [
      { teamId: "vit-rl", played: 15, wins: 12, losses: 3, mapDiff: 14, points: 12, form: ["W", "W", "W", "L", "W"] },
      { teamId: "kc-rl", played: 15, wins: 11, losses: 4, mapDiff: 10, points: 11, form: ["W", "L", "W", "W", "W"] },
      { teamId: "avante-rl", played: 15, wins: 9, losses: 6, mapDiff: 4, points: 9, form: ["W", "W", "L", "W", "L"] },
      { teamId: "g2-rl", played: 15, wins: 8, losses: 7, mapDiff: 1, points: 8, form: ["L", "W", "W", "L", "W"] },
      { teamId: "mouz-rl", played: 15, wins: 6, losses: 9, mapDiff: -5, points: 6, form: ["L", "L", "W", "L", "W"] },
    ],
  },
];

export const leagueById = new Map(leagues.map((league) => [league.id, league]));
