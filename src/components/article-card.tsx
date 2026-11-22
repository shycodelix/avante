import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/cn";
import { formatDate, formatDuration } from "@/lib/format";
import type { Article, ArticleCategory } from "@/lib/types";

export const CATEGORY_LABEL: Record<ArticleCategory, string> = {
  news: "News",
  leaks: "Leak",
  interviews: "Interview",
  features: "Feature",
  guides: "Guide",
  "gaming-tech": "Gaming & tech",
};

function Meta({ article, className }: { article: Article; className?: string }) {
  return (
    <p className={cn("text-[11px] text-bone/40", className)}>
      {article.author.name} · {formatDate(article.publishedAt)} ·{" "}
      {formatDuration(article.readMinutes)}
    </p>
  );
}

function TagRow({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px]">
      <span className="text-cobalt">{CATEGORY_LABEL[article.category]}</span>
      {article.sourcing && (
        <StatusBadge status={article.sourcing === "sources" ? "sources" : article.sourcing} />
      )}
      <span className="text-bone/20" aria-hidden>
        /
      </span>
      <span className="text-bone/35">{article.tags.slice(0, 2).join(" · ")}</span>
    </div>
  );
}

export function ArticleCard({
  article,
  variant = "standard",
}: {
  article: Article;
  variant?: "lead" | "standard" | "compact";
}) {
  if (variant === "compact") {
    return (
      <article className="group border-t border-bone/10 py-4">
        <Link href={`/news/${article.slug}`} className="grid gap-2">
          <div className="flex items-center gap-2 text-[11px] text-bone/40">
            <span className="text-cobalt">{CATEGORY_LABEL[article.category]}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <h3 className="text-[15px] leading-snug text-bone transition-colors group-hover:text-cobalt-2">
            <span className="decoration-cobalt/60 decoration-1 underline-offset-4 group-hover:underline">
              {article.title}
            </span>
          </h3>
        </Link>
      </article>
    );
  }

  if (variant === "lead") {
    return (
      <article className="group grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
        <Link
          href={`/news/${article.slug}`}
          className="relative block aspect-[4/3] overflow-hidden bg-ink-3 md:aspect-[16/11]"
        >
          {article.image ? (
            <Image
              src={article.image}
              alt={article.imageAlt ?? ""}
              fill
              sizes="(min-width: 768px) 46vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="relative flex h-full flex-col justify-between overflow-hidden bg-ink-3 p-6 md:p-8">
              <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <span className="relative flex items-center gap-2 text-[11px] text-cobalt">
                <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden />
                {CATEGORY_LABEL[article.category]}
              </span>
              <div className="relative">
                <span className="block font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.92] tracking-[-0.045em] text-bone/25">
                  {article.tags[0] ?? "Avante"}
                </span>
                <span className="mt-5 block h-1 w-16 bg-cobalt" aria-hidden />
              </div>
            </div>
          )}
          <span className="absolute left-0 top-0 h-1 w-16 bg-cobalt" aria-hidden />
        </Link>

        <div>
          <TagRow article={article} />
          <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.03] tracking-[-0.035em]">
            <Link href={`/news/${article.slug}`} className="decoration-cobalt/50 decoration-2 underline-offset-[6px] group-hover:underline">
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-bone/60">
            {article.dek}
          </p>
          <Meta article={article} className="mt-6" />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col">
      <Link
        href={`/news/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-ink-3"
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative flex h-full flex-col justify-end overflow-hidden bg-ink-3 p-4">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <span className="relative text-[11px] text-cobalt">
              {CATEGORY_LABEL[article.category]}
            </span>
            <span className="relative mt-1 font-display text-2xl leading-none tracking-tight text-bone/25">
              {article.tags[0] ?? "Avante"}
            </span>
            <span className="relative mt-3 block h-0.5 w-8 bg-cobalt" aria-hidden />
          </div>
        )}
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <TagRow article={article} />
        <h3 className="mt-2 text-[1.15rem] leading-snug tracking-[-0.02em]">
          <Link
            href={`/news/${article.slug}`}
            className="decoration-cobalt/50 decoration-1 underline-offset-4 group-hover:underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-bone/50">
          {article.dek}
        </p>
        <Meta article={article} className="mt-auto pt-4" />
      </div>
    </article>
  );
}
