import { ContentInlineLink } from "./ContentInlineLink";
import { resolveContentHref } from "@/lib/resolve-content-href";

type LinkTarget = { label: string; href: string; external?: boolean };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findEmbeddedLink(
  text: string,
  knownLinks: LinkTarget[]
): { before: string; link: LinkTarget; after: string } | null {
  const sorted = [...knownLinks].sort((a, b) => b.label.length - a.label.length);
  for (const link of sorted) {
    const label = link.label.trim();
    if (label.length < 4) continue;
    const match = text.match(new RegExp(escapeRegExp(label), "i"));
    if (!match || match.index === undefined) continue;
    return {
      before: text.slice(0, match.index),
      link,
      after: text.slice(match.index + match[0].length),
    };
  }
  return null;
}

const TOKEN_RE =
  /(https?:\/\/[^\s]+|www\.afca\.org\.au[^\s]*|afca\.org\.au[^\s]*|[\w.+-]+@[\w.-]+\.\w+|tel:\+?[\d\s()-]+)/gi;

function splitTextWithLinks(text: string, knownLinks: LinkTarget[]) {
  const parts: Array<{ type: "text" | "link"; value: string; link?: LinkTarget }> = [];

  let lastIndex = 0;
  for (const match of text.matchAll(TOKEN_RE)) {
    const token = match[0];
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, index) });
    }

    const known = knownLinks.find((link) => link.label.trim() === token.trim());
    if (known) {
      parts.push({ type: "link", value: token, link: known });
    } else if (/^[\w.+-]+@[\w.-]+\.\w+$/.test(token)) {
      parts.push({
        type: "link",
        value: token,
        link: { label: token, href: `mailto:${token}` },
      });
    } else if (token.startsWith("tel:")) {
      parts.push({ type: "link", value: token.replace(/^tel:/i, ""), link: { label: token, href: token } });
    } else {
      const href = token.startsWith("http")
        ? token
        : token.startsWith("www.") || token.startsWith("afca.org.au")
          ? `https://${token.replace(/^\/\//, "")}`
          : token;
      const resolved = resolveContentHref(href);
      parts.push({
        type: "link",
        value: token,
        link: { label: token, href: resolved.href, external: resolved.external },
      });
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts.length ? parts : [{ type: "text" as const, value: text }];
}

export function ContentRichText({
  text,
  knownLinks = [],
}: {
  text: string;
  knownLinks?: LinkTarget[];
}) {
  const embedded = findEmbeddedLink(text, knownLinks);
  if (embedded) {
    return (
      <>
        {embedded.before && (
          <ContentRichText text={embedded.before} knownLinks={knownLinks} />
        )}
        <ContentInlineLink
          label={embedded.link.label}
          href={embedded.link.href}
          external={embedded.link.external}
        />
        {embedded.after && <ContentRichText text={embedded.after} knownLinks={knownLinks} />}
      </>
    );
  }

  const parts = splitTextWithLinks(text, knownLinks);

  return (
    <>
      {parts.map((part, index) =>
        part.type === "link" && part.link ? (
          <ContentInlineLink
            key={`${index}-${part.link.href}`}
            label={part.link.label}
            href={part.link.href}
            external={part.link.external}
          />
        ) : (
          <span key={index}>{part.value}</span>
        )
      )}
    </>
  );
}
