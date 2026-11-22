/**
 * Canonical origin used by metadata, robots and the sitemap.
 *
 * Set `NEXT_PUBLIC_SITE_URL` (for example `https://avante.gg`) once a custom
 * domain is attached; until then the deployed production alias is used so
 * absolute URLs in OG tags, robots and sitemap stay resolvable.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://avanteesports.vercel.app"
).replace(/\/+$/, "");

/**
 * Canonical path for a route, carrying its filter state.
 *
 * A filtered view canonicalises to itself (`/leagues?league=lcp`) instead of
 * collapsing into the hub root, so the filtered page is the one search engines
 * index. `all` and empty values are dropped, which keeps `/matches?title=all`
 * and `/matches` on a single canonical. Free-text search (`q`) is excluded on
 * purpose: a query string is a lookup, not a version of the page.
 */
export function canonicalPath(
  path: string,
  filters: Record<string, string | undefined> = {},
): string {
  const search = new URLSearchParams();
  for (const key of Object.keys(filters).sort()) {
    const value = filters[key];
    if (!value || value === "all") continue;
    search.set(key, value);
  }
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}
