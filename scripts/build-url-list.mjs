import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function readSitemapPaths() {
  const snapshot = path.join(
    process.env.HOME || "",
    ".cursor/browser-logs/snapshot-2026-06-13T04-34-35-898Z-g485sy.log"
  );

  if (fs.existsSync(snapshot)) {
    const log = fs.readFileSync(snapshot, "utf8");
    return [...log.matchAll(/name: \"(https:\/\/www\.afca\.org\.au[^\"]+)\"/g)].map((m) =>
      m[1].replace("https://www.afca.org.au", "").replace(/\/$/, "")
    );
  }

  return [];
}

function collectInternalLinks() {
  const links = new Set();
  const pagesDataPath = path.join(root, "src/lib/pages-data.json");
  if (fs.existsSync(pagesDataPath)) {
    const pages = JSON.parse(fs.readFileSync(pagesDataPath, "utf8"));
    for (const page of Object.values(pages)) {
      for (const section of page.sections || []) {
        for (const link of section.links || []) {
          if (link.href?.startsWith("/")) {
            const href = link.href.replace(/\/$/, "");
            if (!href.startsWith("/media/") && !href.startsWith("/sites/")) links.add(href);
          }
        }
      }
    }
  }

  const scrapedPath = path.join(__dirname, "scraped-content.json");
  if (fs.existsSync(scrapedPath)) {
    const scraped = JSON.parse(fs.readFileSync(scrapedPath, "utf8"));
    for (const data of Object.values(scraped)) {
      for (const section of data.sections || []) {
        for (const link of section.links || []) {
          if (link.href?.startsWith("/")) {
            const href = link.href.replace(/\/$/, "");
            if (!href.startsWith("/media/") && !href.startsWith("/sites/")) links.add(href);
          }
        }
      }
    }
  }

  return [...links];
}

function shouldInclude(pathname) {
  if (!pathname || pathname === "/") return false;
  if (pathname.includes("/node/")) return false;
  if (pathname.includes("/taxonomy/")) return false;
  if (pathname.startsWith("/news/media-releases/")) return false;
  if (pathname === "/page-not-found") return false;
  if (pathname === "/quiz") return false;
  return true;
}

function main() {
  const seeds = [
    "/make-a-complaint",
    "/what-to-expect",
    "/about-afca",
    "/news",
    "/members",
    "/careers",
    "/cslr",
    "/mp-hub",
    "/scams-things-to-look-out-for-and-how-to-protect-your-information",
  ];

  const paths = new Set([
    ...seeds,
    ...readSitemapPaths().filter(shouldInclude),
    ...collectInternalLinks().filter(shouldInclude),
  ]);

  const urls = [...paths].sort();
  fs.writeFileSync(path.join(__dirname, "urls-to-scrape.json"), JSON.stringify(urls, null, 2));
  console.log(`URL list: ${urls.length} pages → scripts/urls-to-scrape.json`);
}

main();
