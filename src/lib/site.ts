/**
 * Canonical origin used by metadata, robots and the sitemap.
 *
 * Set `NEXT_PUBLIC_SITE_URL` (for example `https://avante.gg`) once a custom
 * domain is attached; until then the deployed production alias is used so
 * absolute URLs in OG tags, robots and sitemap stay resolvable.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://avante-inky-ten.vercel.app"
).replace(/\/+$/, "");
