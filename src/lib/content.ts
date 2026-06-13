import type { PageContent } from "./types";
import pagesData from "./pages-data.json";

export const pages: Record<string, PageContent> = pagesData as Record<string, PageContent>;

export function getPageContent(slug: string): PageContent | null {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  return pages[normalized] ?? null;
}

export function getAllPageSlugs(): string[] {
  return Object.keys(pages);
}
