import type { Brand, BrandValue, Pillar, SocialLink } from "@/lib/types";

/**
 * Public brand record.
 *
 * Everything here is written for visitors, fans, creators and prospective
 * partners. Nothing internal — commercial terms, negotiations, staff detail —
 * belongs in this file, and nothing here should be invented: it mirrors the
 * approved public positioning.
 */
export const brand: Brand = {
  name: "Avante Esports",
  tagline: "Built to move forward. For the love of the game.",
  location: "Cebu, Philippines",
  region: "Philippines",
  founded: 2019,
  intro:
    "A Cebu-born esports media house. We tell the story, build the competition, connect talent with opportunity and make the game feel bigger.",
  whoWeAre:
    "Founded by esports enthusiasts who met through video games and esports media, Avante has grown into a full-stack esports media house — a newsroom, a creative studio, a talent agency and an event platform for casual and competitive players, creators and brands.",
  vision:
    "To become a leading esports media entity that elevates grassroots esports, modern esports media and technical excellence — empowering local talent and businesses to drive the industry forward.",
  mission:
    "To connect esports talent, content creators, enthusiasts, communities and brands with the right audiences and opportunities, building a thriving platform for collaboration, visibility and sustainable growth.",
  belief:
    "Esports is more than competition. It is culture, community, creativity and opportunity.",
  horizon:
    "Scaling grassroots tournaments, growing creator collaborations and live watch parties, and building one interconnected home for Philippine esports, gaming, tech, cosplay and live events.",
  email: "studio@avante.gg",
};

export const pillars: Pillar[] = [
  {
    id: "media",
    name: "Media",
    lead: "We tell the story.",
    summary:
      "Esports news and editorial, event coverage, creator content and the community stories behind the results.",
    items: ["Newsroom & editorial", "Event coverage", "Creator content", "Community stories"],
  },
  {
    id: "esports",
    name: "Esports",
    lead: "We build the competition.",
    summary:
      "Grassroots tournaments, competitive team programmes, event management and broadcast production — run end to end, on LAN or online.",
    items: ["Grassroots circuits", "Team programmes", "Event management", "Broadcast production"],
  },
  {
    id: "partnerships",
    name: "Partnerships",
    lead: "We connect talent with opportunity.",
    summary:
      "Bridging gamers, competitors, streamers and communities with the brands and businesses that want to reach them properly.",
    items: ["Creator & brand matchmaking", "Campaigns", "Sponsorship", "Community programmes"],
  },
  {
    id: "experiences",
    name: "Experiences",
    lead: "We make the game feel bigger.",
    summary:
      "Gaming events, watch parties, cosplay and culture showcases, and interactive brand experiences people turn up for.",
    items: ["Watch parties", "Gaming events", "Cosplay showcases", "Brand activations"],
  },
];

export const values: BrandValue[] = [
  {
    id: "culture",
    name: "Culture",
    summary: "Esports is a culture before it is a competition — the language, the ritual, the in-jokes.",
  },
  {
    id: "community",
    name: "Community",
    summary: "Grassroots first. The scene is built by the people who show up every week.",
  },
  {
    id: "creativity",
    name: "Creativity",
    summary: "Media, design and broadcast are craft, not content.",
  },
  {
    id: "opportunity",
    name: "Opportunity",
    summary: "Talent is everywhere in the Philippines; access is not. We build the bridge.",
  },
];

export const socials: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@avanteesports.gg",
    href: "https://www.instagram.com/avanteesports.gg",
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@avanteesports.gg",
    href: "https://www.threads.com/@avanteesports.gg",
  },
  // Facebook and TikTok are intentionally not listed yet. Both were checked
  // against the handle on 2026-11-22: TikTok answered "this account isn't
  // available", and Facebook served only a redirect shell that proves nothing.
  // Add them back with confirmed URLs rather than guessing the path.
];
