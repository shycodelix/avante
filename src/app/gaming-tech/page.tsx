import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { PageHeader } from "@/components/page-header";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gaming & tech",
  description:
    "Hardware, patches, agent design and the decisions that change how competitive games are played.",
  alternates: { canonical: "/gaming-tech" },
  openGraph: { url: "/gaming-tech" },
};

export const revalidate = 300;

export default async function GamingTechPage() {
  const articles = await getArticles({ category: "gaming-tech" });
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHeader
        label="Gaming & tech"
        title={
          <>
            The decisions
            <br />
            behind the game.
          </>
        }
        description="Hardware that changes a bootcamp, patches that change a draft, and agents that change a map pool. This desk covers the parts of the scene that are designed rather than played."
        meta={[
          { label: "Pieces", value: String(articles.length) },
          { label: "Updated", value: "Weekly" },
        ]}
      />

      <div className="wrap py-12 md:py-16">
        {articles.length === 0 ? (
          <p className="text-sm text-bone/45">
            Nothing filed on this desk yet.
          </p>
        ) : (
          <>
            {lead && <ArticleCard article={lead} variant="lead" />}

            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="mt-14 grid gap-6 border-t border-bone/10 pt-6 md:grid-cols-[1fr_auto] md:items-center">
              <p className="max-w-xl text-[11px] leading-relaxed text-bone/35">
                Reporting on hardware and game design sits alongside the
                competition desks. If a patch changes a draft, it gets a story —
                and a line on the transfers desk if it changes a roster.
              </p>
              <Link
                href="/news?category=news"
                className="inline-flex items-center gap-2 border-b border-bone/25 pb-1 text-[12px] text-bone/70 transition-colors hover:border-cobalt hover:text-bone"
              >
                Back to the newsroom <span aria-hidden>→</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
