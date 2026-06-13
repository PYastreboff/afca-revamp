import type { ContentSection } from "@/lib/types";
import { dedupeSectionLinks } from "@/lib/utils";
import {
  isEmbeddableVideoUrl,
  labelsMatch,
  normalizeLinkLabel,
  toVideoEmbed,
} from "@/lib/video-embed";
import { getHeadingVideoEmbed } from "@/lib/page-video-embeds";
import { ContentInlineLink } from "./ContentInlineLink";
import { ContentRichText } from "./ContentRichText";
import { ContentVideoEmbed } from "./ContentVideoEmbed";

type SectionLink = { label: string; href: string; external?: boolean };

type ContentSectionBodyProps = {
  section: ContentSection;
  pagePath: string;
  pageLinks: SectionLink[];
};

const TABLE_NOISE = /^(week|episode focus|description|pre|\d+)$/i;

function findMatchingLink(text: string, links: SectionLink[]): SectionLink | undefined {
  return links.find((link) => labelsMatch(text, link.label));
}

function isTableNoiseParagraph(text: string, videoLinks: SectionLink[]): boolean {
  const trimmed = text.trim();
  if (TABLE_NOISE.test(trimmed)) return true;
  return videoLinks.some((link) => labelsMatch(trimmed, link.label));
}

export function ContentSectionBody({ section, pagePath, pageLinks }: ContentSectionBodyProps) {
  const sectionLinks = dedupeSectionLinks(section.links || []);
  const videoLinks = sectionLinks.filter((link) => isEmbeddableVideoUrl(link.href));
  const documentLinks = sectionLinks.filter((link) => !isEmbeddableVideoUrl(link.href));
  const consumedHrefs = new Set<string>();
  const headingVideo = getHeadingVideoEmbed(pagePath, section.heading);
  const videoHeavySection = videoLinks.length >= 2 && documentLinks.length <= 1;
  const sectionEmbeds = (section.embeds || [])
    .map((embed) => ({
      src: embed.src,
      title: embed.title,
    }))
    .filter((embed) => embed.src);

  const proseParagraphs: string[] = [];
  const linkedItems: SectionLink[] = [];

  for (const paragraph of section.paragraphs || []) {
    const matched = findMatchingLink(paragraph, pageLinks);
    if (matched) {
      linkedItems.push(matched);
      consumedHrefs.add(matched.href);
      continue;
    }

    if (videoHeavySection && isTableNoiseParagraph(paragraph, videoLinks)) {
      continue;
    }

    proseParagraphs.push(paragraph);
  }

  const listEntries = (section.list || []).map((item) => {
    const matched = findMatchingLink(item, pageLinks);
    if (matched) consumedHrefs.add(matched.href);
    return { text: item, link: matched };
  });

  const remainingDocumentLinks = documentLinks.filter((link) => !consumedHrefs.has(link.href));

  const seenVideoSrc = new Set<string>();
  const videoEmbeds = videoLinks
    .map((link) => toVideoEmbed(link.href, link.label))
    .filter((embed): embed is NonNullable<typeof embed> => {
      if (!embed) return false;
      if (seenVideoSrc.has(embed.src)) return false;
      seenVideoSrc.add(embed.src);
      return true;
    });

  const seenLinkedHref = new Set<string>();
  const uniqueLinkedItems = linkedItems.filter((link) => {
    if (seenLinkedHref.has(link.href)) return false;
    seenLinkedHref.add(link.href);
    return true;
  });

  return (
    <>
      {headingVideo && <ContentVideoEmbed embed={headingVideo} />}

      {sectionEmbeds.map((embed) => (
        <ContentVideoEmbed key={embed.src} embed={embed} />
      ))}

      {proseParagraphs.map((paragraph, index) => (
        <p key={index} className="text-sm sm:text-base text-afca-gray leading-[1.7] mb-4 last:mb-0">
          <ContentRichText text={paragraph} knownLinks={pageLinks} />
        </p>
      ))}

      {uniqueLinkedItems.length > 0 && (
        <ul className="space-y-2.5 text-sm sm:text-base text-afca-gray mb-4">
          {uniqueLinkedItems.map((link) => (
            <li key={link.href} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-afca-sky" />
              <ContentInlineLink label={link.label} href={link.href} external={link.external} />
            </li>
          ))}
        </ul>
      )}

      {listEntries.length > 0 && (
        <ul className="space-y-2.5 text-sm sm:text-base text-afca-gray mb-4">
          {listEntries.map((entry, index) => (
            <li key={`${index}-${entry.text}`} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-afca-sky" />
              {entry.link ? (
                <ContentInlineLink
                  label={entry.text}
                  href={entry.link.href}
                  external={entry.link.external}
                />
              ) : (
                <span>{entry.text}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {videoEmbeds.map((embed) => (
        <ContentVideoEmbed key={embed.src} embed={embed} />
      ))}

      {remainingDocumentLinks.length > 0 && (
        <ul className="space-y-2.5 text-sm sm:text-base text-afca-gray mt-2">
          {remainingDocumentLinks.map((link) => (
            <li key={link.href} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-afca-sky" />
              <ContentInlineLink label={link.label} href={link.href} external={link.external} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function collectPageLinks(sections: ContentSection[]): SectionLink[] {
  const byHref = new Map<string, SectionLink>();

  for (const section of sections) {
    for (const link of section.links || []) {
      const existing = byHref.get(link.href);
      if (!existing || link.label.trim().length > existing.label.trim().length) {
        byHref.set(link.href, link);
      }
    }
  }

  return [...byHref.values()];
}

export function buildPageLinkIndex(links: SectionLink[]): Map<string, SectionLink> {
  const index = new Map<string, SectionLink>();
  for (const link of links) {
    index.set(normalizeLinkLabel(link.label), link);
  }
  return index;
}
