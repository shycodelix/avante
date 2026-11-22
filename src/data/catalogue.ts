import type { GameTitle, Team } from "@/lib/types";

export const titles: GameTitle[] = [
  { id: "league-of-legends", name: "League of Legends", short: "LoL", genre: "MOBA" },
  { id: "valorant", name: "VALORANT", short: "VAL", genre: "Tactical FPS" },
  { id: "cs2", name: "Counter-Strike 2", short: "CS2", genre: "Tactical FPS" },
  { id: "rocket-league", name: "Rocket League", short: "RL", genre: "Arena" },
  { id: "dota-2", name: "Dota 2", short: "DOTA", genre: "MOBA" },
  { id: "tekken-8", name: "Tekken 8", short: "T8", genre: "Fighting" },
];

export const teams: Team[] = [
  // League of Legends — EMEA
  { id: "avante-lol", name: "Avante", short: "AVT", titleId: "league-of-legends", region: "EMEA", accent: "#2f4bff" },
  { id: "g2-lol", name: "G2 Esports", short: "G2", titleId: "league-of-legends", region: "EMEA", accent: "#e4553d" },
  { id: "fnc-lol", name: "Fnatic", short: "FNC", titleId: "league-of-legends", region: "EMEA", accent: "#f07a1a" },
  { id: "kc-lol", name: "Karmine Corp", short: "KC", titleId: "league-of-legends", region: "EMEA", accent: "#2a6df4" },
  { id: "vit-lol", name: "Team Vitality", short: "VIT", titleId: "league-of-legends", region: "EMEA", accent: "#f2d23c" },
  { id: "th-lol", name: "Team Heretics", short: "TH", titleId: "league-of-legends", region: "EMEA", accent: "#8b8f96" },
  { id: "koi-lol", name: "Movistar KOI", short: "KOI", titleId: "league-of-legends", region: "EMEA", accent: "#35c48a" },
  { id: "sk-lol", name: "SK Gaming", short: "SK", titleId: "league-of-legends", region: "EMEA", accent: "#4f9ad6" },
  { id: "gx-lol", name: "GIANTX", short: "GX", titleId: "league-of-legends", region: "EMEA", accent: "#a463f2" },
  { id: "bds-lol", name: "Team BDS", short: "BDS", titleId: "league-of-legends", region: "EMEA", accent: "#d94a6a" },
  // League of Legends — Korea / China / Americas
  { id: "t1-lol", name: "T1", short: "T1", titleId: "league-of-legends", region: "Korea", accent: "#e33b3b" },
  { id: "geng-lol", name: "Gen.G", short: "GEN", titleId: "league-of-legends", region: "Korea", accent: "#c9a24a" },
  { id: "hle-lol", name: "Hanwha Life", short: "HLE", titleId: "league-of-legends", region: "Korea", accent: "#f28c28" },
  { id: "kt-lol", name: "KT Rolster", short: "KT", titleId: "league-of-legends", region: "Korea", accent: "#e04b4b" },
  { id: "blg-lol", name: "Bilibili Gaming", short: "BLG", titleId: "league-of-legends", region: "China", accent: "#4f7ce0" },
  { id: "loud-lol", name: "LOUD", short: "LLL", titleId: "league-of-legends", region: "Americas", accent: "#5ecf5e" },
  // VALORANT
  { id: "avante-val", name: "Avante", short: "AVT", titleId: "valorant", region: "EMEA", accent: "#2f4bff" },
  { id: "fnc-val", name: "Fnatic", short: "FNC", titleId: "valorant", region: "EMEA", accent: "#f07a1a" },
  { id: "th-val", name: "Team Heretics", short: "TH", titleId: "valorant", region: "EMEA", accent: "#8b8f96" },
  { id: "kc-val", name: "Karmine Corp", short: "KC", titleId: "valorant", region: "EMEA", accent: "#2a6df4" },
  { id: "navi-val", name: "Natus Vincere", short: "NAVI", titleId: "valorant", region: "EMEA", accent: "#f2d23c" },
  { id: "sen-val", name: "Sentinels", short: "SEN", titleId: "valorant", region: "Americas", accent: "#e0323f" },
  { id: "loud-val", name: "LOUD", short: "LLL", titleId: "valorant", region: "Americas", accent: "#5ecf5e" },
  { id: "tl-val", name: "Team Liquid", short: "TL", titleId: "valorant", region: "Americas", accent: "#5ab6e8" },
  // Counter-Strike 2
  { id: "avante-cs", name: "Avante", short: "AVT", titleId: "cs2", region: "EMEA", accent: "#2f4bff" },
  { id: "navi-cs", name: "Natus Vincere", short: "NAVI", titleId: "cs2", region: "EMEA", accent: "#f2d23c" },
  { id: "mouz-cs", name: "MOUZ", short: "MOUZ", titleId: "cs2", region: "EMEA", accent: "#e03c3c" },
  { id: "spirit-cs", name: "Team Spirit", short: "SPR", titleId: "cs2", region: "EMEA", accent: "#cfd3d8" },
  { id: "falcons-cs", name: "Team Falcons", short: "FLC", titleId: "cs2", region: "EMEA", accent: "#37c98a" },
  { id: "faze-cs", name: "FaZe Clan", short: "FAZE", titleId: "cs2", region: "Americas", accent: "#e8633a" },
  { id: "vit-cs", name: "Team Vitality", short: "VIT", titleId: "cs2", region: "EMEA", accent: "#f2d23c" },
  { id: "g2-cs", name: "G2 Esports", short: "G2", titleId: "cs2", region: "EMEA", accent: "#e4553d" },
  // Rocket League
  { id: "avante-rl", name: "Avante", short: "AVT", titleId: "rocket-league", region: "EMEA", accent: "#2f4bff" },
  { id: "kc-rl", name: "Karmine Corp", short: "KC", titleId: "rocket-league", region: "EMEA", accent: "#2a6df4" },
  { id: "vit-rl", name: "Team Vitality", short: "VIT", titleId: "rocket-league", region: "EMEA", accent: "#f2d23c" },
  { id: "g2-rl", name: "G2 Esports", short: "G2", titleId: "rocket-league", region: "EMEA", accent: "#e4553d" },
  { id: "mouz-rl", name: "MOUZ", short: "MOUZ", titleId: "rocket-league", region: "EMEA", accent: "#e03c3c" },
  { id: "geng-rl", name: "Gen.G", short: "GEN", titleId: "rocket-league", region: "APAC", accent: "#c9a24a" },
  // Dota 2
  { id: "spirit-dota", name: "Team Spirit", short: "SPR", titleId: "dota-2", region: "EMEA", accent: "#cfd3d8" },
  { id: "liquid-dota", name: "Team Liquid", short: "TL", titleId: "dota-2", region: "EMEA", accent: "#5ab6e8" },
  { id: "falcons-dota", name: "Team Falcons", short: "FLC", titleId: "dota-2", region: "EMEA", accent: "#37c98a" },
  { id: "tundra-dota", name: "Tundra Esports", short: "TUN", titleId: "dota-2", region: "EMEA", accent: "#b9c0c6" },
  // Tekken 8
  { id: "falcons-t8", name: "Team Falcons", short: "FLC", titleId: "tekken-8", region: "EMEA", accent: "#37c98a" },
  { id: "drx-t8", name: "DRX", short: "DRX", titleId: "tekken-8", region: "Korea", accent: "#4a7ce0" },
];

export const teamById = new Map(teams.map((team) => [team.id, team]));

export const titleById = new Map(titles.map((title) => [title.id, title]));
