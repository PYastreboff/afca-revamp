import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scrapedPath = path.join(__dirname, "scraped-content.json");
const outPath = path.join(__dirname, "..", "src", "lib", "pages-data.json");

const NOISE_PARAGRAPHS = new Set([
  "Next",
  "Previous",
  "Menu",
  "Share",
  "Print",
  "Download",
  "Related Links",
  "Related links",
]);

function normalizeHref(href) {
  if (!href) return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  try {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const url = new URL(href);
      if (url.hostname === "www.afca.org.au" || url.hostname === "afca.org.au") {
        return url.pathname.replace(/\/$/, "") || "/";
      }
      return href;
    }
  } catch {
    return href;
  }
  if (href.startsWith("/")) return href.replace(/\/$/, "") || "/";
  return href;
}

function isExternal(href) {
  if (!href) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("http://") || href.startsWith("https://")) {
    try {
      const host = new URL(href).hostname;
      return host !== "www.afca.org.au" && host !== "afca.org.au";
    } catch {
      return true;
    }
  }
  return false;
}

function dedupeLinks(links) {
  const seen = new Set();
  return links.filter((link) => {
    const key = `${link.label}::${link.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function transformLink(link) {
  const href = normalizeHref(link.href);
  const external = isExternal(link.href);
  const result = { label: link.label, href };
  if (external) result.external = true;
  return result;
}

function isEmptySection(section) {
  const hasHeading = section.heading && section.heading.trim();
  const hasParagraphs = section.paragraphs?.some((p) => p.trim());
  const hasList = section.list?.some((item) => item.trim());
  const hasLinks = section.links?.length;
  return !hasHeading && !hasParagraphs && !hasList && !hasLinks;
}

function cleanParagraph(text) {
  return text.replace(/\s+/g, " ").trim();
}

function transformPage(scraped) {
  const sections = (scraped.sections || [])
    .map((section) => {
      const result = {};
      if (section.heading?.trim()) result.heading = cleanParagraph(section.heading);
      if (section.paragraphs?.length) {
        const paragraphs = section.paragraphs
          .map(cleanParagraph)
          .filter((p) => p && !NOISE_PARAGRAPHS.has(p));
        if (paragraphs.length) result.paragraphs = paragraphs;
      }
      if (section.list?.length) {
        const list = section.list.map(cleanParagraph).filter(Boolean);
        if (list.length) result.list = list;
      }
      if (section.links?.length) {
        const links = dedupeLinks(section.links.map(transformLink)).filter(
          (link) => link.label && link.href
        );
        if (links.length) result.links = links;
      }
      return result;
    })
    .filter((section) => !isEmptySection(section));

  const page = {
    title: cleanParagraph(scraped.title || "Untitled"),
    sections,
  };
  if (scraped.desc?.trim()) page.description = cleanParagraph(scraped.desc);
  return page;
}

function main() {
  const scraped = JSON.parse(fs.readFileSync(scrapedPath, "utf8"));
  const pages = {};
  let skipped = 0;

  for (const [slug, data] of Object.entries(scraped)) {
    if (data.error) {
      skipped++;
      continue;
    }
    const page = transformPage(data);
    if (page.sections.length === 0 && !page.description) {
      page.sections = [{ paragraphs: [page.title] }];
    }
    pages[slug] = page;
  }

  fs.writeFileSync(outPath, JSON.stringify(pages, null, 0));
  console.log(`Generated ${Object.keys(pages).length} pages → ${outPath}`);
  if (skipped) console.log(`Skipped ${skipped} pages with scrape errors`);
}

main();
