export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const GENERIC_LINK_LABELS = /^(find out more|learn more|read more|here|click here)$/i;

/** Collapse duplicate hrefs in a link group (common in scraped content). */
export function dedupeSectionLinks<
  T extends { label: string; href: string; external?: boolean },
>(links: T[]): T[] {
  const byHref = new Map<string, T>();

  for (const link of links) {
    const existing = byHref.get(link.href);
    if (!existing) {
      byHref.set(link.href, link);
      continue;
    }

    const existingGeneric = GENERIC_LINK_LABELS.test(existing.label.trim());
    const linkGeneric = GENERIC_LINK_LABELS.test(link.label.trim());

    if (existingGeneric && !linkGeneric) {
      byHref.set(link.href, link);
    } else if (
      !existingGeneric &&
      !linkGeneric &&
      link.label.trim().length > existing.label.trim().length
    ) {
      byHref.set(link.href, link);
    }
  }

  return [...byHref.values()];
}
