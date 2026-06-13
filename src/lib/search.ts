export type SearchIndexEntry = {
  slug: string;
  title: string;
  description: string;
  body: string;
  href: string;
};

export type SearchResult = SearchIndexEntry & {
  score: number;
  excerpt: string;
};

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function tokenize(query: string) {
  return normalize(query)
    .split(" ")
    .filter((token) => token.length > 1);
}

function excerpt(text: string, tokens: string[], maxLength = 140) {
  const normalized = normalize(text);
  if (!normalized) return "";

  let start = 0;
  for (const token of tokens) {
    const index = normalized.indexOf(token);
    if (index >= 0) {
      start = Math.max(0, index - 40);
      break;
    }
  }

  const slice = text.slice(start, start + maxLength).trim();
  return `${start > 0 ? "…" : ""}${slice}${text.length > start + maxLength ? "…" : ""}`;
}

export function searchPages(query: string, index: SearchIndexEntry[], limit = 12): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const entry of index) {
    const title = normalize(entry.title);
    const description = normalize(entry.description);
    const body = normalize(entry.body);
    const href = normalize(entry.href.replace(/^\//, "").replace(/-/g, " "));

    let score = 0;

    for (const token of tokens) {
      if (title === token) score += 120;
      else if (title.startsWith(token)) score += 80;
      else if (title.includes(token)) score += 50;

      if (description.includes(token)) score += 20;
      if (body.includes(token)) score += 8;
      if (href.includes(token)) score += 15;
    }

    if (score === 0) continue;

    results.push({
      ...entry,
      score,
      excerpt: excerpt(entry.description || entry.body, tokens),
    });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
