import type { PageContent } from "./types";

const MIN_SUBTITLE_LENGTH = 40;
const DISPLAY_MAX = 220;
const META_MAX = 160;

const NOISE = new Set([
  "next",
  "previous",
  "menu",
  "share",
  "print",
  "download",
  "related links",
]);

function normalizeHeading(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

export function isSameHeading(a?: string, b?: string): boolean {
  if (!a || !b) return false;
  return normalizeHeading(a) === normalizeHeading(b);
}

export function getPageHeroTitle(content: PageContent): string {
  return content.hero?.trim() || content.title;
}

function truncate(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;

  const cut = cleaned.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = lastSpace > max * 0.45 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.trim()}…`;
}

function isUsableSource(text: string, content: PageContent): boolean {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const hero = getPageHeroTitle(content);

  if (cleaned.length < MIN_SUBTITLE_LENGTH) return false;
  if (NOISE.has(normalizeHeading(cleaned))) return false;
  if (isSameHeading(cleaned, content.title)) return false;
  if (isSameHeading(cleaned, hero)) return false;
  if (content.hero && isSameHeading(cleaned, content.hero)) return false;

  return true;
}

function extractFromContent(content: PageContent): string | null {
  for (const section of content.sections) {
    for (const paragraph of section.paragraphs ?? []) {
      if (isUsableSource(paragraph, content)) {
        return paragraph.replace(/\s+/g, " ").trim();
      }
    }

    for (const item of section.list ?? []) {
      if (isUsableSource(item, content)) {
        return item.replace(/\s+/g, " ").trim();
      }
    }
  }

  return null;
}

function buildFallbackSubtitle(content: PageContent): string {
  const hero = getPageHeroTitle(content);
  return `Guidance and information from AFCA to help you with ${hero.charAt(0).toLowerCase()}${hero.slice(1)}.`;
}

export function getPageSubtitle(content: PageContent): string {
  const hero = getPageHeroTitle(content);
  const description = content.description?.replace(/\s+/g, " ").trim();

  if (description && !isSameHeading(description, content.title) && !isSameHeading(description, hero)) {
    return truncate(description, DISPLAY_MAX);
  }

  const extracted = extractFromContent(content);
  if (extracted) {
    return truncate(extracted, DISPLAY_MAX);
  }

  return buildFallbackSubtitle(content);
}

export function getPageMetaDescription(content: PageContent): string {
  return truncate(getPageSubtitle(content), META_MAX);
}
