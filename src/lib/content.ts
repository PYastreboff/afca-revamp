import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { PageContent } from "./types";

let pagesCache: Record<string, PageContent> | null = null;

function getPages(): Record<string, PageContent> {
  if (!pagesCache) {
    const filePath = join(process.cwd(), "src/lib/pages-data.json");
    pagesCache = JSON.parse(readFileSync(filePath, "utf8")) as Record<string, PageContent>;
  }
  return pagesCache;
}

export function getPageContent(slug: string): PageContent | null {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  return getPages()[normalized] ?? null;
}

export function getAllPageSlugs(): string[] {
  return Object.keys(getPages());
}
