import type { Article } from "@/lib/types";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * NewsArticle JSON-LD for a story.
 *
 * Every field is taken from the same source the canonical link and Open Graph
 * tags use, so the schema can never drift from the page metadata: `url` is the
 * canonical path, `headline`/`description` are the OG title/description, and
 * `datePublished` is the OG published time.
 */
export function newsArticleJsonLd(article: Article) {
  const canonical = `/news/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    url: absoluteUrl(canonical),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "en-PH",
    articleSection: article.category,
    ...(article.tags.length > 0 ? { keywords: article.tags.join(", ") } : {}),
    ...(article.image
      ? { image: [absoluteUrl(article.image)], thumbnailUrl: absoluteUrl(article.image) }
      : {}),
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
