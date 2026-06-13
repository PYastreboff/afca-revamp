import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function flattenPageText(page) {
  return (page.sections ?? [])
    .flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.list ?? [])])
    .filter(Boolean)
    .join(" ");
}

function main() {
  const pagesPath = path.join(root, "src/lib/pages-data.json");
  const scrapedPath = path.join(__dirname, "scraped-content.json");
  const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
  const scraped = fs.existsSync(scrapedPath)
    ? JSON.parse(fs.readFileSync(scrapedPath, "utf8"))
    : {};

  const navSource = fs.readFileSync(path.join(root, "src/lib/navigation.ts"), "utf8");
  const navItems = [...navSource.matchAll(/\{\s*label:\s*"([^"]+)"\s*,\s*href:\s*"(\/[^"]+)"/g)].map(
    (match) => ({ label: match[1], href: match[2] })
  );

  const byHref = new Map();

  byHref.set("/", {
    slug: "home",
    title: "Home",
    description: "Australian Financial Complaints Authority — fair, free and independent dispute resolution.",
    body:
      "Lodge a complaint track your complaint financial hardship insurance banking superannuation news about AFCA members",
    href: "/",
  });

  for (const [slug, page] of Object.entries(pages)) {
    const scrapedPage = scraped[slug];
    byHref.set(`/${slug}`, {
      slug,
      title: page.title,
      description: page.description || scrapedPage?.desc || "",
      body: flattenPageText(page) || flattenPageText({ sections: scrapedPage?.sections ?? [] }),
      href: `/${slug}`,
    });
  }

  for (const item of navItems) {
    if (byHref.has(item.href)) continue;
    const slug = item.href.replace(/^\//, "");
    byHref.set(item.href, {
      slug,
      title: item.label,
      description: "",
      body: item.label,
      href: item.href,
    });
  }

  const index = [...byHref.values()]
    .map((entry) => ({ ...entry, body: entry.body.slice(0, 3000) }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const outPath = path.join(root, "public/search-index.json");
  fs.writeFileSync(outPath, JSON.stringify(index));
  console.log(`Generated ${index.length} search entries → ${outPath}`);
}

main();
