export type VideoEmbed = {
  src: string;
  title?: string;
};

const YOUTUBE_ID = /^[a-zA-Z0-9_-]{11}$/;

export function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return YOUTUBE_ID.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        const id = parsed.pathname.split("/")[2];
        return id && YOUTUBE_ID.test(id) ? id : null;
      }
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id && YOUTUBE_ID.test(id) ? id : null;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/")[2];
        return id && YOUTUBE_ID.test(id) ? id : null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function getVimeoId(url: string): string | null {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;

    const parts = parsed.pathname.split("/").filter(Boolean);
    if (host === "player.vimeo.com" && parts[0] === "video") {
      return /^\d+$/.test(parts[1]) ? parts[1] : null;
    }

    if (parts[0] === "privacy" || parts[0] === "about" || parts[0] === "terms") {
      return null;
    }

    return /^\d+$/.test(parts[0]) ? parts[0] : null;
  } catch {
    return null;
  }
}

export function isEmbeddableVideoUrl(href: string): boolean {
  return Boolean(getYouTubeId(href) || getVimeoId(href));
}

export function toVideoEmbed(href: string, title?: string): VideoEmbed | null {
  const youtubeId = getYouTubeId(href);
  if (youtubeId) {
    return {
      src: `https://www.youtube.com/embed/${youtubeId}`,
      title,
    };
  }

  const vimeoId = getVimeoId(href);
  if (vimeoId) {
    return {
      src: `https://player.vimeo.com/video/${vimeoId}`,
      title,
    };
  }

  return null;
}

export function normalizeLinkLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/['']/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "")
    .trim();
}

function softenLabel(label: string): string {
  return normalizeLinkLabel(label)
    .replace(/\bdel\b/g, "di")
    .replace(/\bdella\b/g, "di")
    .replace(/\bdello\b/g, "di")
    .replace(/\s*-\s*/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
}

export function labelsMatch(a: string, b: string): boolean {
  const left = softenLabel(a);
  const right = softenLabel(b);
  if (!left || !right) return false;
  if (left === right) return true;
  if (left.length >= 8 && right.length >= 8 && (left.includes(right) || right.includes(left))) {
    return true;
  }
  return false;
}
