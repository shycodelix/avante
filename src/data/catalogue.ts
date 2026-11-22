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
  // League of Legends — APAC
  { id: "avante-lol", name: "Avante", short: "AVT", titleId: "league-of-legends", region: "APAC", accent: "#2f4bff" },
  { id: "g2-lol", name: "Cebu Kings", short: "CK", titleId: "league-of-legends", region: "APAC", accent: "#e4553d" },
  { id: "fnc-lol", name: "Davao Forge", short: "DVO", titleId: "league-of-legends", region: "APAC", accent: "#f07a1a" },
  { id: "kc-lol", name: "Manila Vipers", short: "MNL", titleId: "league-of-legends", region: "APAC", accent: "#2a6df4" },
  { id: "vit-lol", name: "Iloilo Tide", short: "ILO", titleId: "league-of-legends", region: "APAC", accent: "#f2d23c" },
  { id: "th-lol", name: "Bacolod Storm", short: "BCD", titleId: "league-of-legends", region: "APAC", accent: "#8b8f96" },
  { id: "koi-lol", name: "Quezon Reapers", short: "QC", titleId: "league-of-legends", region: "APAC", accent: "#35c48a" },
  { id: "sk-lol", name: "Baguio Wolves", short: "BAG", titleId: "league-of-legends", region: "APAC", accent: "#4f9ad6" },
  { id: "gx-lol", name: "Cagayan Raiders", short: "CGY", titleId: "league-of-legends", region: "APAC", accent: "#a463f2" },
  { id: "bds-lol", name: "Zamboanga Reef", short: "ZAM", titleId: "league-of-legends", region: "APAC", accent: "#d94a6a" },
  // League of Legends — Korea / China / Americas
  { id: "t1-lol", name: "T1", short: "T1", titleId: "league-of-legends", region: "Korea", accent: "#e33b3b" },
  { id: "geng-lol", name: "Gen.G", short: "GEN", titleId: "league-of-legends", region: "Korea", accent: "#c9a24a" },
  { id: "hle-lol", name: "Hanwha Life", short: "HLE", titleId: "league-of-legends", region: "Korea", accent: "#f28c28" },
  { id: "kt-lol", name: "KT Rolster", short: "KT", titleId: "league-of-legends", region: "Korea", accent: "#e04b4b" },
  { id: "blg-lol", name: "Bilibili Gaming", short: "BLG", titleId: "league-of-legends", region: "China", accent: "#4f7ce0" },
  { id: "loud-lol", name: "LOUD", short: "LLL", titleId: "league-of-legends", region: "Americas", accent: "#5ecf5e" },
  // VALORANT
  { id: "avante-val", name: "Avante", short: "AVT", titleId: "valorant", region: "APAC", accent: "#2f4bff" },
  { id: "fnc-val", name: "Davao Forge", short: "DVO", titleId: "valorant", region: "APAC", accent: "#f07a1a" },
  { id: "th-val", name: "Bacolod Storm", short: "BCD", titleId: "valorant", region: "APAC", accent: "#8b8f96" },
  { id: "kc-val", name: "Manila Vipers", short: "MNL", titleId: "valorant", region: "APAC", accent: "#2a6df4" },
  { id: "navi-val", name: "Pasig Sabers", short: "PSG", titleId: "valorant", region: "APAC", accent: "#f2d23c" },
  { id: "sen-val", name: "Sentinels", short: "SEN", titleId: "valorant", region: "Americas", accent: "#e0323f" },
  { id: "loud-val", name: "LOUD", short: "LLL", titleId: "valorant", region: "Americas", accent: "#5ecf5e" },
  { id: "tl-val", name: "Cebu Current", short: "CUR", titleId: "valorant", region: "Americas", accent: "#5ab6e8" },
  // Counter-Strike 2
  { id: "avante-cs", name: "Avante", short: "AVT", titleId: "cs2", region: "APAC", accent: "#2f4bff" },
  { id: "navi-cs", name: "Pasig Sabers", short: "PSG", titleId: "cs2", region: "APAC", accent: "#f2d23c" },
  { id: "mouz-cs", name: "Makati Mavericks", short: "MKT", titleId: "cs2", region: "APAC", accent: "#e03c3c" },
  { id: "spirit-cs", name: "Leyte Vanguard", short: "LEY", titleId: "cs2", region: "APAC", accent: "#cfd3d8" },
  { id: "falcons-cs", name: "Samar Falcons", short: "SMR", titleId: "cs2", region: "APAC", accent: "#37c98a" },
  { id: "faze-cs", name: "FaZe Clan", short: "FAZE", titleId: "cs2", region: "Americas", accent: "#e8633a" },
  { id: "vit-cs", name: "Iloilo Tide", short: "ILO", titleId: "cs2", region: "APAC", accent: "#f2d23c" },
  { id: "g2-cs", name: "Cebu Kings", short: "CK", titleId: "cs2", region: "APAC", accent: "#e4553d" },
  // Rocket League
  { id: "avante-rl", name: "Avante", short: "AVT", titleId: "rocket-league", region: "APAC", accent: "#2f4bff" },
  { id: "kc-rl", name: "Manila Vipers", short: "MNL", titleId: "rocket-league", region: "APAC", accent: "#2a6df4" },
  { id: "vit-rl", name: "Iloilo Tide", short: "ILO", titleId: "rocket-league", region: "APAC", accent: "#f2d23c" },
  { id: "g2-rl", name: "Cebu Kings", short: "CK", titleId: "rocket-league", region: "APAC", accent: "#e4553d" },
  { id: "mouz-rl", name: "Makati Mavericks", short: "MKT", titleId: "rocket-league", region: "APAC", accent: "#e03c3c" },
  { id: "geng-rl", name: "Gen.G", short: "GEN", titleId: "rocket-league", region: "APAC", accent: "#c9a24a" },
  // Dota 2
  { id: "spirit-dota", name: "Leyte Vanguard", short: "LEY", titleId: "dota-2", region: "APAC", accent: "#cfd3d8" },
  { id: "liquid-dota", name: "Cebu Current", short: "CUR", titleId: "dota-2", region: "APAC", accent: "#5ab6e8" },
  { id: "falcons-dota", name: "Samar Falcons", short: "SMR", titleId: "dota-2", region: "APAC", accent: "#37c98a" },
  { id: "tundra-dota", name: "Bohol Tundra", short: "BOH", titleId: "dota-2", region: "APAC", accent: "#b9c0c6" },
  // Tekken 8
  { id: "falcons-t8", name: "Samar Falcons", short: "SMR", titleId: "tekken-8", region: "APAC", accent: "#37c98a" },
  { id: "drx-t8", name: "DRX", short: "DRX", titleId: "tekken-8", region: "Korea", accent: "#4a7ce0" },
];

export const teamById = new Map(teams.map((team) => [team.id, team]));

export const titleById = new Map(titles.map((title) => [title.id, title]));
