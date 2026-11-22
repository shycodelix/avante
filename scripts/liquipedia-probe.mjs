#!/usr/bin/env node
/**
 * Liquipedia probe.
 *
 * Checks what the public API will give us for the circuits Avante tracks.
 * Liquipedia's terms require a descriptive User-Agent, gzip, and no more than
 * one request every two seconds; this script enforces the spacing.
 *
 * Usage: node scripts/liquipedia-probe.mjs [search term]
 */

const UA =
  "AvanteEsportsSite/1.0 (https://avante-inky-ten.vercel.app; studio@avante.gg)";
const WIKI = "leagueoflegends";
const BASE = `https://liquipedia.net/${WIKI}/api.php`;

let lastCall = 0;

async function lp(params) {
  const wait = Math.max(0, 2000 - (Date.now() - lastCall));
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  lastCall = Date.now();

  const url = `${BASE}?${new URLSearchParams({ format: "json", ...params })}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "Accept-Encoding": "gzip",
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}

async function main() {
  const term = process.argv[2] ?? "LoL Championship Pacific";

  console.log(`search: ${term}`);
  const search = await lp({ action: "query", list: "search", srsearch: term, srlimit: 5 });
  for (const hit of search.query?.search ?? []) {
    console.log(`  ${hit.title} (pageid ${hit.pageid})`);
  }

  const top = search.query?.search?.[0];
  if (!top) return;

  console.log(`\nwikitext head: ${top.title}`);
  const page = await lp({
    action: "parse",
    page: top.title,
    prop: "wikitext",
    section: 0,
  });

  const text = page.parse?.wikitext?.["*"] ?? "";
  console.log(
    text
      ? text.split("\n").slice(0, 18).join("\n")
      : `no wikitext (${JSON.stringify(page.error ?? page).slice(0, 200)})`,
  );
}

main().catch((error) => {
  console.error("probe failed:", error.message);
  process.exitCode = 1;
});
