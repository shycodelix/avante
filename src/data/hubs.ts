export interface HubSeed {
  id: string;
  href: string;
  name: string;
  description: string;
  /** Short label for counts, filled at read time from the seed data. */
  unit: string;
}

export const hubs: HubSeed[] = [
  {
    id: "news",
    href: "/news",
    name: "News",
    description:
      "League announcements, reporting and the daily wire from every title we cover.",
    unit: "stories",
  },
  {
    id: "matches",
    href: "/matches",
    name: "Matches",
    description:
      "Live scores, next fixtures and results across six titles, with series context.",
    unit: "fixtures",
  },
  {
    id: "leagues",
    href: "/leagues",
    name: "Leagues",
    description:
      "Standings, formats and season context for the circuits we follow closest.",
    unit: "circuits",
  },
  {
    id: "transfers",
    href: "/transfers",
    name: "Transfers",
    description:
      "Confirmed signings, reported agreements and rumours, labelled for what they are.",
    unit: "moves",
  },
  {
    id: "cosplay",
    href: "/cosplay",
    name: "Cosplay",
    description:
      "Builds, makers and studio shoots. The craft side of the scene, documented properly.",
    unit: "features",
  },
  {
    id: "events",
    href: "/events",
    name: "Events",
    description:
      "LANs, online cups and studio nights on one calendar, from Berlin outward.",
    unit: "dates",
  },
  {
    id: "gaming-tech",
    href: "/gaming-tech",
    name: "Gaming & tech",
    description:
      "Hardware, patches and the design decisions that change how the games are played.",
    unit: "pieces",
  },
];
