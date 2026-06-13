const AFCA_ORIGIN = "https://www.afca.org.au";

function isExternalUrl(href: string): boolean {
  try {
    const url = new URL(href);
    if (url.hostname === "localhost" || url.hostname.endsWith("127.0.0.1")) {
      return false;
    }
    return !url.hostname.endsWith("afca.org.au") || url.hostname === "data.afca.org.au";
  } catch {
    return true;
  }
}

export function resolveContentHref(href: string): { href: string; external: boolean } {
  const trimmed = href.trim();
  if (!trimmed) return { href: "", external: false };

  if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) {
    return { href: trimmed, external: true };
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return { href: trimmed, external: isExternalUrl(trimmed) };
  }

  if (trimmed.startsWith("//")) {
    const resolved = `https:${trimmed}`;
    return { href: resolved, external: isExternalUrl(resolved) };
  }

  if (!trimmed.startsWith("/") && trimmed.includes(".")) {
    const resolved = `https://${trimmed}`;
    return { href: resolved, external: isExternalUrl(resolved) };
  }

  if (trimmed.startsWith("/media/") || trimmed.startsWith("/sites/default/files/")) {
    return { href: `${AFCA_ORIGIN}${trimmed}`, external: true };
  }

  return { href: trimmed, external: false };
}
