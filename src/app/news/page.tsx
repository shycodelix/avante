import type { Metadata } from "next";
import Link from "next/link";

import { allowedValue, canonicalPath, openGraphBase } from "@/lib/site";

import { ArticleCard } from "@/components/article-card";
import { FilterBar } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";
import {
  getArticleCategories,
  getArticles,
  getTitles,
} from "@/lib/content";
import type { ArticleCategory, TitleId } from "@/lib/types";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; title?: string; sort?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const canonical = canonicalPath("/news", {
    category: allowedValue(
      params.category,
      getArticleCategories().map((category) => category.value),
    ),
    title: allowedValue(params.title, getTitles().map((title) => title.id)),
    // Newest is the default ordering, so only the alternate one earns a URL.
    sort: allowedValue(params.sort, ["trending"] as const),
  });

  return {
    title: "Newsroom",
    description:
      "Every story from the Avante desk, newest first: league news, reports, interviews, features, guides and gaming & tech coverage.",
    alternates: { canonical },
    openGraph: openGraphBase(canonical),
  };
}

export const revalidate = 120;

interface NewsPageProps {
  searchParams: Promise<{
    category?: string;
    title?: string;
    sort?: string;
    q?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const category = (params.category ?? "all") as ArticleCategory | "all";
  const titleId = (params.title ?? "all") as TitleId | "all";
  const sort = params.sort === "trending" ? "trending" : "newest";
  const q = params.q ?? "";

  const [articles, titles] = await Promise.all([
    getArticles({ category, titleId, sort, q }),
    Promise.resolve(getTitles()),
  ]);

  const [lead, ...rest] = articles;

  const current = {
    category: params.category,
    title: params.title,
    sort: sort === "trending" ? "trending" : undefined,
    q: q || undefined,
  };

  return (
    <>
      <PageHeader
        label="Newsroom"
        title={
          <>
            Every story,
            <br />
            newest first.
          </>
        }
        description="League announcements, transfer reports, long-form features and the guides we wish existed. Filter by section or by the title you follow."
        meta={[
          { label: "Matching stories", value: String(articles.length) },
          { label: "Updated", value: "22 Nov · 18:40" },
        ]}
      />

      <FilterBar
        basePath="/news"
        groups={[
          { key: "category", label: "Section", options: getArticleCategories() },
          {
            key: "title",
            label: "Title",
            options: [
              { value: "all", label: "All titles" },
              ...titles.map((title) => ({ value: title.id, label: title.short })),
            ],
          },
          {
            key: "sort",
            label: "Order",
            options: [
              { value: "newest", label: "Newest" },
              { value: "trending", label: "Trending" },
            ],
          },
        ]}
        current={current}
        searchPlaceholder="Search the newsroom"
        resultLabel={
          q
            ? `${articles.length} results for “${q}”`
            : `${articles.length} stories · reporting from Cebu and across the Philippines`
        }
      />

      <div className="wrap py-12 md:py-16">
        {articles.length === 0 ? (
          <div className="border border-bone/15 bg-ink-2 p-8 md:p-12">
            <h2 className="display-lg">No stories match that filter.</h2>
            <p className="mt-3 max-w-md text-sm text-bone/55">
              Nothing has been filed under this combination yet. Clear the
              search or pick another title.
            </p>
            <Link
              href="/news"
              className="mt-6 inline-flex border-b border-bone/25 pb-1 text-[12px] text-bone/70 transition-colors hover:border-cobalt hover:text-bone"
            >
              Reset the newsroom
            </Link>
          </div>
        ) : (
          <>
            {lead && <ArticleCard article={lead} variant="lead" />}

            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-5 text-[11px] text-bone/35">
              <span>
                Showing {articles.length} of {articles.length} stories in this view
              </span>
              <span>Pagination is wired for the CMS adapter — see README</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
