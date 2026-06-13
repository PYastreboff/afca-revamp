import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const urls = JSON.parse(fs.readFileSync(path.join(__dirname, "urls-to-scrape.json"), "utf8"));

const resultsPath = path.join(__dirname, "scraped-content.json");
const results = fs.existsSync(resultsPath)
  ? JSON.parse(fs.readFileSync(resultsPath, "utf8"))
  : {};
const base = "https://www.afca.org.au";

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

async function scrapePage(page, urlPath, retries = 2) {
  const fullUrl = `${base}${urlPath}`;
  const slug = urlPath.replace(/^\/+|\/+$/g, "");

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
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
      if (data.title === "www.afca.org.au" || data.sections?.some((s) => s.heading === "Performing security verification")) {
        throw new Error("Cloudflare blocked");
      }
      results[slug] = data;
      console.log(`✓ ${slug} (${data.sections?.length ?? 0} sections)`);
      return data;
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`  retry ${slug} (${attempt + 1}): ${err.message}`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
  );
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });

  // Warm up session to pass Cloudflare
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(
    () => !document.body?.innerText?.includes("Performing security verification"),
    { timeout: 60000 }
  ).catch(() => {});
  await new Promise((r) => setTimeout(r, 2000));

  const pending = urls
    .map((u) => u.replace(/^\/+|\/+$/g, ""))
    .filter((slug) => {
      const data = results[slug];
      return !data || data.error || data.title === "www.afca.org.au";
    });

  console.log(`Scraping ${pending.length} pending of ${urls.length} URLs (${Object.keys(results).length} already cached)`);

  for (const slug of pending) {
    const urlPath = `/${slug}`;
    try {
      await scrapePage(page, urlPath);
      fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`);
      results[slug] = { error: err.message, title: slug, desc: "", sections: [], url: urlPath };
      fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    }
  }

  await browser.close();
  const outPath = resultsPath;
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  const ok = Object.values(results).filter((r) => !r.error).length;
  console.log(`\nScraped ${ok}/${Object.keys(results).length} pages → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
