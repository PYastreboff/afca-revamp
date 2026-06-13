import type { VideoEmbed } from "./video-embed";

/** Curated embeds for pages where iframes were not captured during scraping. */
export const pageVideoEmbedsByHeading: Record<string, Record<string, VideoEmbed>> = {
  "make-a-complaint/do-you-speak-another-language/auslan": {
    "About AFCA": {
      src: "https://www.youtube.com/embed/pSKoXFVouEo",
      title: "About AFCA — Auslan",
    },
    "Lodging a complaint with AFCA": {
      src: "https://www.youtube.com/embed/gD9_neGPYkA",
      title: "Lodging a complaint with AFCA — Auslan",
    },
    "What happens when I make a complaint?": {
      src: "https://www.youtube.com/embed/-tTuNvxZUhY",
      title: "What happens when I make a complaint? — Auslan",
    },
    "Support when making a complaint": {
      src: "https://www.youtube.com/embed/gD9_neGPYkA",
      title: "Support when making a complaint — Auslan",
    },
    "Case Study": {
      src: "https://www.youtube.com/embed/UCn9By3Kr5E",
      title: "Case Study — Auslan",
    },
  },
};

export function getHeadingVideoEmbed(
  pagePath: string,
  heading?: string
): VideoEmbed | undefined {
  if (!heading) return undefined;
  const pageEmbeds = pageVideoEmbedsByHeading[pagePath];
  if (!pageEmbeds) return undefined;
  return pageEmbeds[heading] ?? pageEmbeds[heading.trim()];
}
