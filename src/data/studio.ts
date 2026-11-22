import type { Capability, Player, StudioProject } from "@/lib/types";

export const studioProjects: StudioProject[] = [
  {
    id: "p-forward",
    client: "Avante Esports",
    project: "“Forward” — brand film",
    year: 2026,
    disciplines: ["Direction", "Film", "Grade"],
    summary:
      "A twelve-minute documentary following the Cebu roster from open qualifiers to a first LAN final, shot available-light across three islands.",
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
    id: "p-invitational",
    client: "Avante Invitational",
    project: "Tournament identity",
    year: 2026,
    disciplines: ["Identity", "Broadcast", "Ops"],
    summary:
      "A four-day event brand for our first open LAN in Cebu: venue dressing, bracket graphics, stream overlays and a print system that survives a con floor.",
    metrics: [
      { label: "Teams", value: "8" },
      { label: "Attendance", value: "11.4k" },
      { label: "Show days", value: "4" },
    ],
    image: "/images/event-crowd.jpg",
    imageAlt: "Crowd and stage screens during a tournament opener",
    ratio: "wide",
  },
  {
    id: "p-circuit",
    client: "Visayas grassroots circuit",
    project: "Broadcast package",
    year: 2026,
    disciplines: ["Broadcast design", "Motion", "Tooling"],
    summary:
      "Season-long graphics, overlays and an operator kit for a six-event community circuit, built to run on one laptop and a rented gallery.",
    metrics: [
      { label: "Events", value: "6" },
      { label: "Assets", value: "28" },
      { label: "Operators", value: "3" },
    ],
    image: "/images/studio-set.jpg",
    imageAlt: "Graphics operator working across a bank of broadcast monitors",
    ratio: "wide",
  },
  {
    id: "p-creators",
    client: "Avante Creators",
    project: "Collective launch",
    year: 2026,
    disciplines: ["Identity", "Film", "Type"],
    summary:
      "Identity, motion and a launch film for the creator roster — a system that scales from a vertical clip to a 16:9 show open without redrawing it.",
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
    id: "p-watchparty",
    client: "Avante Experiences",
    project: "Watch party series",
    year: 2026,
    disciplines: ["Experiential", "Screen design", "Ops"],
    summary:
      "A repeatable watch-party format — screen design, host run-of-show and signage that packs into two cases and opens in an hour.",
    metrics: [
      { label: "Venues", value: "4" },
      { label: "Nights", value: "9" },
      { label: "Attendance", value: "2.1k" },
    ],
    image: "/images/event-crowd.jpg",
    imageAlt: "Crowd watching a broadcast on a large screen",
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
    fullName: "Marco Villanueva",
    role: "Top",
    teamId: "avante-lol",
    titleId: "league-of-legends",
    country: "PH",
    joined: "2024",
    portraitTone: "#2b3440",
  },
  {
    id: "pl-fenrir",
    handle: "Fenrir",
    fullName: "Paolo Reyes",
    role: "Jungle",
    teamId: "avante-lol",
    titleId: "league-of-legends",
    country: "PH",
    joined: "2023",
    portraitTone: "#1f3b36",
  },
  {
    id: "pl-lume",
    handle: "Lume",
    fullName: "Bianca Cruz",
    role: "Mid",
    teamId: "avante-lol",
    titleId: "league-of-legends",
    country: "PH",
    joined: "2025",
    portraitTone: "#3a2f3f",
  },
  {
    id: "pl-vexa",
    handle: "Vexa",
    fullName: "Dana Salazar",
    role: "Duelist",
    teamId: "avante-val",
    titleId: "valorant",
    country: "PH",
    joined: "2024",
    portraitTone: "#3d2b2b",
  },
  {
    id: "pl-rook",
    handle: "Rook",
    fullName: "Sofia Mendoza",
    role: "Controller",
    teamId: "avante-val",
    titleId: "valorant",
    country: "PH",
    joined: "2025",
    portraitTone: "#243447",
  },
  {
    id: "pl-brk",
    handle: "brk",
    fullName: "Miguel Tan",
    role: "IGL",
    teamId: "avante-cs",
    titleId: "cs2",
    country: "PH",
    joined: "2022",
    portraitTone: "#33352b",
  },
  {
    id: "pl-toll",
    handle: "toll",
    fullName: "Joaquin Lim",
    role: "AWPer",
    teamId: "avante-cs",
    titleId: "cs2",
    country: "PH",
    joined: "2024",
    portraitTone: "#2c2c3a",
  },
  {
    id: "pl-kite",
    handle: "Kite",
    fullName: "Nico Aquino",
    role: "Forward",
    teamId: "avante-rl",
    titleId: "rocket-league",
    country: "PH",
    joined: "2023",
    portraitTone: "#3b3327",
  },
];
