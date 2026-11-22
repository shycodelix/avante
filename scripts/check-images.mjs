#!/usr/bin/env node
/**
 * Story image check.
 *
 * Warns about every story that ships without a photograph of its own, because
 * those can only be shared and described with the neutral brand card. Warnings
 * only: a story without a photo still publishes, it just does so with the card.
 *
 * Runs before `npm run build` and on demand via `npm run check:images`.
 */

import fs from "node:fs";

const FILE = "src/data/articles.ts";
const source = fs.readFileSync(FILE, "utf8");

const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => ({
  slug: match[1],
  index: match.index ?? 0,
}));

const missing = [];
for (const [position, entry] of slugs.entries()) {
  const end = slugs[position + 1]?.index ?? source.length;
  const block = source.slice(entry.index, end);

  if (!/^\s+image:\s*"/m.test(block)) {
    const title = block.match(/title:\s*\n?\s*"([^"]+)"/)?.[1] ?? entry.slug;
    missing.push({ slug: entry.slug, title });
  }
}

if (missing.length === 0) {
  console.log(`check-images: all ${slugs.length} stories have their own photograph.`);
  process.exit(0);
}

console.warn(
  `check-images: ${missing.length} of ${slugs.length} stories have no photograph — they fall back to public/images/brand-card.jpg:`,
);
for (const { slug, title } of missing) {
  console.warn(`  warn  ${slug}  "${title}"`);
}
