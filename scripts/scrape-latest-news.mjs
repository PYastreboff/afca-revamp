import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesPath = path.join(__dirname, "..", "src/lib/latest-news-articles.json");
const resultsPath = path.join(__dirname, "scraped-content.json");
const base = "https://www.afca.org.au";

const results = fs.existsSync(resultsPath)
  ? JSON.parse(fs.readFileSync(resultsPath, "utf8"))
  : {};

function extractPageContent() {
  const main =
    document.querySelector("main") ||
    document.querySelector('[role="main"]') ||
    document.querySelector(".layout-content");
  if (!main) return { error: "no main", title: document.title, url: location.pathname };

  const title = document.querySelector("h1")?.innerText?.trim() || document.title;
  const desc = document.querySelector('meta[name="description"]')?.content || "";
  const sections = [];
  let current = { paragraphs: [], list: [], links: [] };

  const push = () => {
    if (current.heading || current.paragraphs.length || current.list.length) {
      sections.push({ ...current });
    }
    current = { paragraphs: [], list: [], links: [] };
  };

  const content = main.querySelector(".node__content, .field--name-body, article") || main;
  const els = content.querySelectorAll("h2, h3, h4, p, ul, ol");

  els.forEach((el) => {
    const tag = el.tagName;
    if (tag === "H2" || tag === "H3" || tag === "H4") {
      push();
      current.heading = el.innerText.trim();
    } else if (tag === "P") {
      const t = el.innerText.trim();
      if (t) current.paragraphs.push(t);
      el.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        if (href && !href.startsWith("#")) {
          current.links.push({ label: a.innerText.trim() || href, href });
        }
      });
    } else if (tag === "UL" || tag === "OL") {
      el.querySelectorAll(":scope > li").forEach((li) => {
        const t = li.innerText.trim();
        if (t) current.list.push(t);
      });
    }
  });
  push();

  return { title, desc, sections, url: location.pathname };
}

async function scrapePage(page, urlPath) {
  const fullUrl = `${base}${urlPath}`;
  const slug = urlPath.replace(/^\/+|\/+$/g, "");

  await page.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(
    () => {
      const h1 = document.querySelector("h1")?.innerText?.trim();
      const blocked =
        document.body?.innerText?.includes("Performing security verification") ||
        h1 === "www.afca.org.au";
      const hasMain = document.querySelector("main, [role='main'], .layout-content");
      return hasMain && h1 && !blocked;
    },
    { timeout: 45000 }
  );

  const data = await page.evaluate(extractPageContent);
  if (data.title === "www.afca.org.au") throw new Error("Cloudflare blocked");
  results[slug] = data;
  console.log(`✓ ${slug}`);
  return data;
}

async function main() {
  const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));
  const toScrape = articles
    .map((a) => a.href)
    .filter((href) => href.startsWith("/news/latest-news/"))
    .filter((href) => {
      const slug = href.replace(/^\/+|\/+$/g, "");
      return !results[slug] || results[slug].error;
    });

  if (!toScrape.length) {
    console.log("All latest-news articles already scraped.");
    return;
  }

  console.log(`Scraping ${toScrape.length} latest-news articles…`);

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
  );

  let ok = 0;
  let fail = 0;

  for (const href of toScrape) {
    try {
      await scrapePage(page, href);
      ok++;
      fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      fail++;
      console.warn(`✗ ${href}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`Done: ${ok} scraped, ${fail} failed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
