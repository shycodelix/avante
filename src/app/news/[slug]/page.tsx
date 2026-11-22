import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard, CATEGORY_LABEL } from "@/components/article-card";
import { StatusBadge } from "@/components/status-badge";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
  getTitle,
} from "@/lib/content";
import { formatDate } from "@/lib/format";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: "Story not found" };

  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      publishedTime: article.publishedAt,
      images: article.image ? [{ url: article.image }] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const related = await getRelatedArticles(article, 3);
  const titles = article.titleIds
    .map((id) => getTitle(id))
    .filter((title): title is NonNullable<typeof title> => Boolean(title));

  return (
    <article>
      <header className="relative overflow-hidden border-b border-bone/10">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="wrap relative py-10 md:py-14">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[11px] text-bone/40 transition-colors hover:text-bone"
          >
            <span aria-hidden>←</span> Newsroom
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-cobalt">{CATEGORY_LABEL[article.category]}</span>
            {article.sourcing && (
              <StatusBadge
                status={article.sourcing === "sources" ? "sources" : article.sourcing}
              />
            )}
            {titles.map((title) => (
              <span
                key={title.id}
                className="border border-bone/15 px-2 py-0.5 text-[10px] text-bone/45"
              >
                {title.short}
              </span>
            ))}
          </div>

          <h1 className="display-xl mt-4 max-w-4xl">{article.title}</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-bone/60">
            {article.dek}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-bone/10 pt-4 text-[11px] text-bone/40">
            <span>
              {article.author.name} · {article.author.role}
            </span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span>{article.readMinutes} min read</span>
          </div>
        </div>
      </header>

      {article.image && (
        <div className="wrap mt-8">
          <div className="relative aspect-[16/9] overflow-hidden border border-bone/10 bg-ink-3">
            <Image
              src={article.image}
              alt={article.imageAlt ?? ""}
              fill
              priority
              sizes="(min-width: 1280px) 1184px, 100vw"
              className="object-cover"
            />
          </div>
          {article.imageAlt && (
            <p className="mt-2 text-[10px] text-bone/30">{article.imageAlt}</p>
          )}
        </div>
      )}

      <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="space-y-8">
            {article.blocks.map((block, index) => (
              <section key={index}>
                {block.heading && (
                  <h2 className="mb-3 font-display text-2xl leading-tight tracking-[-0.03em] text-bone">
                    {block.heading}
                  </h2>
                )}
                <div className="space-y-4">
                  {block.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-[15px] leading-[1.75] text-bone/75"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {block.quote && (
                  <blockquote className="mt-6 border-l border-cobalt pl-5">
                    <p className="font-display text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.3] tracking-[-0.02em] text-bone">
                      “{block.quote.text}”
                    </p>
                    <footer className="mt-3 text-[11px] text-bone/40">
                      {block.quote.attribution}
                    </footer>
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-1.5 border-t border-bone/10 pt-6">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/news?q=${encodeURIComponent(tag)}`}
                className="border border-bone/15 px-2 py-1 text-[10px] text-bone/50 transition-colors hover:border-bone/40 hover:text-bone"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-3 lg:col-start-10">
          <div className="border-t border-bone/15 pt-4 lg:sticky lg:top-24">
            <h2 className="text-[10px] text-bone/35">Filed under</h2>
            <p className="mt-2 text-[12px] text-bone/60">
              {CATEGORY_LABEL[article.category]}
            </p>
            <h2 className="mt-6 text-[10px] text-bone/35">Titles</h2>
            <ul className="mt-2 space-y-1 text-[12px] text-bone/60">
              {titles.map((title) => (
                <li key={title.id}>
                  <Link
                    href={`/news?title=${title.id}`}
                    className="transition-colors hover:text-bone"
                  >
                    {title.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-6 text-[10px] text-bone/35">Author</h2>
            <p className="mt-2 text-[12px] leading-relaxed text-bone/60">
              {article.author.name}
              <span className="mt-1 block text-bone/35">{article.author.role}</span>
            </p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-bone/10 bg-ink-2">
          <div className="wrap py-14 md:py-20">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="display-lg">Keep reading</h2>
              <Link
                href="/news"
                className="text-[11px] text-bone/40 transition-colors hover:text-bone"
              >
                All stories →
              </Link>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => (
                <ArticleCard key={entry.id} article={entry} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
