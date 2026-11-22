import type { Article } from "@/lib/types";

/**
 * Neutral brand card for stories that ship without a photograph.
 *
 * Composed from the approved key visual: the Avante wordmark (`Avante-v2.2WHITE.svg`)
 * over the brand's ink-flow background, with the broadcast-cobalt accent rule. It is
 * a brand asset, not reportage, so it never pretends to show the story.
 */
export const BRAND_CARD = {
  src: "/images/brand-card.jpg",
  alt: "Avante Esports wordmark on the brand's ink-black key visual",
  width: 1200,
  height: 630,
} as const;

/**
 * The image a story is shared and described with.
 *
 * Falls back to {@link BRAND_CARD} instead of borrowing an unrelated event photo,
 * so every story carries an `og:image` and a schema `image`.
 */
export function articleImage(article: Pick<Article, "image" | "imageAlt">): {
  src: string;
  alt: string;
} {
  return article.image
    ? { src: article.image, alt: article.imageAlt ?? "" }
    : { src: BRAND_CARD.src, alt: BRAND_CARD.alt };
}
