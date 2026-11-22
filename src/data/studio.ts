import type { Capability, Player, StudioProject } from "@/lib/types";

export const studioProjects: StudioProject[] = [
  {
    id: "p-lec-package",
    client: "LEC / Riot Games",
    project: "2027 broadcast package",
    year: 2026,
    disciplines: ["Broadcast design", "Motion", "Type"],
    summary:
      "A full season graphics system for ten teams: scoreboard, lower thirds, six show opens and an operator kit that lets the league build new assets without us.",
    metrics: [
      { label: "Assets delivered", value: "42" },
      { label: "Build time", value: "11 wks" },
      { label: "Live shows", value: "180+" },
    ],
    image: "/images/studio-set.jpg",
    imageAlt: "Graphics operator working across a bank of broadcast monitors",
    ratio: "wide",
  },
  {
    id: "p-forward",
    client: "Avante Esports",
    project: "“Forward” — brand film",
    year: 2026,
    disciplines: ["Direction", "Film", "Grade"],
    summary:
      "A twelve-minute documentary shot available-light across three countries, from the summer collapse to the Worlds quarter-final.",
    metrics: [
      { label: "Runtime", value: "12 min" },
      { label: "Footage", value: "74 hrs" },
      { label: "Crew", value: "2" },
    ],
    image: "/images/arena.jpg",
    imageAlt: "Arena stage bathed in blue light before a final",
    ratio: "tall",
  },
  {
    id: "p-blast-open",
    client: "BLAST Premier",
    project: "World Final opener",
    year: 2026,
    disciplines: ["Motion", "3D", "Sound"],
    summary:
      "A 38-second title sequence built from scan data of the Royal Arena, rendered to run in a browser at 60fps as well as on the arena LED.",
    metrics: [
      { label: "Runtime", value: "0:38" },
      { label: "Renders", value: "9" },
      { label: "Venues", value: "3" },
    ],
    image: "/images/event-crowd.jpg",
    imageAlt: "Crowd and stage screens during a tournament opener",
    ratio: "wide",
  },
  {
    id: "p-kc-reveal",
    client: "Karmine Corp",
    project: "2027 roster reveal",
    year: 2026,
    disciplines: ["Identity", "Film", "Type"],
    summary:
      "Five players, one continuous take, and a type system that carries the announcement across film, social and in-arena.",
    metrics: [
      { label: "Deliverables", value: "31" },
      { label: "Shoot days", value: "2" },
      { label: "Cutdowns", value: "6" },
    ],
    image: "/images/roster.jpg",
    imageAlt: "Team lined up on stage for a roster announcement",
    ratio: "tall",
  },
  {
    id: "p-invitational",
    client: "Avante Invitational",
    project: "Tournament identity",
    year: 2026,
    disciplines: ["Identity", "Broadcast", "Ops"],
    summary:
      "A four-day event brand: venue dressing, bracket graphics, streaming overlays and a print system for the Berlin site.",
    metrics: [
      { label: "Teams", value: "8" },
      { label: "Attendance", value: "11.4k" },
      { label: "Show days", value: "4" },
    ],
    image: "/images/arena.jpg",
    imageAlt: "Arena floor and stage lighting during a live event",
    ratio: "wide",
  },
];

export const capabilities: Capability[] = [
  {
    id: "broadcast",
    name: "Broadcast & live production",
    summary:
      "We run shows end to end: gallery, replay, observer, graphics and the run-of-show that keeps a four-hour broadcast on time.",
    items: ["Show design", "Observer & replay", "Gallery crewing", "Venue technical"],
  },
  {
    id: "brand",
    name: "Brand & identity systems",
    summary:
      "Marks, type, colour and the rules that hold them together across a season, a jersey and a 16:9 lower third.",
    items: ["Naming & marks", "Type systems", "Guidelines", "Kit & merchandise"],
  },
  {
    id: "motion",
    name: "Motion & graphics packages",
    summary:
      "Scoreboards, brackets, transitions and show opens built in code first, so what we preview is what goes to air.",
    items: ["Show opens", "Overlay systems", "3D & simulation", "Tooling for operators"],
  },
  {
    id: "film",
    name: "Film & photography",
    summary:
      "Documentary, announcement films and editorial photography with a small crew and available light wherever possible.",
    items: ["Direction", "Documentary", "Studio photography", "Post & grade"],
  },
  {
    id: "ops",
    name: "Tournament operations",
    summary:
      "The unglamorous half: scheduling, brackets, broadcast coordination and the on-site crew that makes a LAN run.",
    items: ["Competition format", "Brackets & seeding", "Player services", "Vendor management"],
  },
];

export const talent: Player[] = [
  {
    id: "pl-kaze",
    handle: "Kaze",
    fullName: "Min-jun Seo",
    role: "Top",
    teamId: "avante-lol",
    titleId: "league-of-legends",
    country: "KR",
    joined: "2024",
    portraitTone: "#2b3440",
  },
  {
    id: "pl-fenrir",
    handle: "Fenrir",
    fullName: "Elias Norén",
    role: "Jungle",
    teamId: "avante-lol",
    titleId: "league-of-legends",
    country: "SE",
    joined: "2023",
    portraitTone: "#1f3b36",
  },
  {
    id: "pl-lume",
    handle: "Lume",
    fullName: "Lena Brandt",
    role: "Mid",
    teamId: "avante-lol",
    titleId: "league-of-legends",
    country: "DE",
    joined: "2025",
    portraitTone: "#3a2f3f",
  },
  {
    id: "pl-vexa",
    handle: "Vexa",
    fullName: "Derya Aydın",
    role: "Duelist",
    teamId: "avante-val",
    titleId: "valorant",
    country: "TR",
    joined: "2024",
    portraitTone: "#3d2b2b",
  },
  {
    id: "pl-rook",
    handle: "Rook",
    fullName: "Sanne de Vries",
    role: "Controller",
    teamId: "avante-val",
    titleId: "valorant",
    country: "NL",
    joined: "2025",
    portraitTone: "#243447",
  },
  {
    id: "pl-brk",
    handle: "brk",
    fullName: "Mikkel Bruun",
    role: "IGL",
    teamId: "avante-cs",
    titleId: "cs2",
    country: "DK",
    joined: "2022",
    portraitTone: "#33352b",
  },
  {
    id: "pl-toll",
    handle: "toll",
    fullName: "Elias Lindqvist",
    role: "AWPer",
    teamId: "avante-cs",
    titleId: "cs2",
    country: "SE",
    joined: "2024",
    portraitTone: "#2c2c3a",
  },
  {
    id: "pl-kite",
    handle: "Kite",
    fullName: "Jonas Weber",
    role: "Forward",
    teamId: "avante-rl",
    titleId: "rocket-league",
    country: "DE",
    joined: "2023",
    portraitTone: "#3b3327",
  },
];
