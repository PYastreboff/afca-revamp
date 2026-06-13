import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "src/lib/latest-news-articles.json");

const SNAPSHOT = path.join(
  process.env.HOME || "",
  ".cursor/browser-logs/snapshot-2026-06-13T04-34-35-898Z-g485sy.log"
);

const ACRONYMS = new Set(["afca", "edr", "asic", "apra", "spf", "ato", "rg"]);

/** Articles pinned to the top with known metadata (newest first). */
const FEATURED = [
  {
    href: "/news/latest-news/how-afca-call-recording-impacts-you",
    title: "How AFCA call recording impacts you",
    excerpt:
      "AFCA has introduced call recording across case-handling teams to improve the quality, accuracy and efficiency of how we investigate and resolve complaints.",
    date: "10 Jun 2026",
    tag: "Service update",
  },
  {
    href: "/news/latest-news/afca-publishes-edr-response-guide-for-complaints-about-hail-damage-claims",
    title: "AFCA publishes EDR Response Guide for hail damage claims",
    excerpt:
      "AFCA has published a new External Dispute Resolution (EDR) Response Guide for hail damage claim complaints.",
    date: "03 Jun 2026",
    tag: "Guidance",
  },
  {
    href: "/news/consultation/rules-consultation-2025",
    title: "AFCA consults on Rules amendments",
    excerpt:
      "AFCA is consulting on amendments to its Rules from Monday 1 June to Friday 26 June 2026.",
    date: "01 Jun 2026",
    tag: "Consultation",
  },
  {
    href: "/news/latest-news/afca-publishes-details-of-expelled-members-march-26",
    title: "AFCA publishes details of expelled members",
    excerpt:
      "The Australian Financial Complaints Authority (AFCA) has published the details of 4 members that have been expelled from AFCA.",
    date: "May 2026",
    tag: "Members",
  },
  {
    href: "/news/latest-news/paul-woodburn-appointed-lead-ombudsman-superannuation",
    title: "Paul Woodburn appointed Lead Ombudsman Superannuation",
    excerpt:
      "AFCA is pleased to announce Paul Woodburn has been appointed as the new Lead Ombudsman Superannuation, commencing 25 May 2026 on a five-year term.",
    date: "May 2026",
    tag: "Appointment",
  },
  {
    href: "/news/latest-news/afca-publishes-latest-systemic-issues-insight-report",
    title: "AFCA publishes Edition 8 of Systemic Issues Insights Report",
    excerpt:
      "AFCA has published Edition 8 of their Systemic Issues Insights Report, outlining systemic issues identified and markers of excellence for the first half of 2025–26.",
    date: "May 2026",
    tag: "Report",
  },
];

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      if (/^\d+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function readSitemapArticles() {
  if (!fs.existsSync(SNAPSHOT)) {
    console.warn("Sitemap snapshot not found; using featured articles only.");
    return [];
  }

  const log = fs.readFileSync(SNAPSHOT, "utf8");
  const urls = [
    ...log.matchAll(/name: \"(https:\/\/www\.afca\.org\.au\/news\/latest-news\/[^\"]+)\"/g),
  ].map((m) => m[1].replace("https://www.afca.org.au", "").replace(/\/$/, ""));

  return [...new Set(urls)];
}

function main() {
  const sitemapHrefs = readSitemapArticles();
  const featuredByHref = new Map(FEATURED.map((a) => [a.href, a]));
  const seen = new Set();
  const articles = [];

  for (const item of FEATURED) {
    articles.push({ ...item });
    seen.add(item.href);
  }

  // Sitemap order is oldest-first; reverse so newer articles appear nearer the top.
  for (const href of [...sitemapHrefs].reverse()) {
    if (seen.has(href)) continue;
    const slug = href.split("/").pop() || "";
    articles.push({
      href,
      title: slugToTitle(slug),
      excerpt: "",
      date: "",
      tag: "News",
    });
    seen.add(href);
  }

  fs.writeFileSync(outPath, JSON.stringify(articles, null, 2));
  console.log(`Generated ${articles.length} latest news articles → ${outPath}`);
}

main();
