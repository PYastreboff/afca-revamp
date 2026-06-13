import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsPath = path.join(__dirname, "scraped-content.json");

export function loadResults() {
  if (fs.existsSync(resultsPath)) {
    return JSON.parse(fs.readFileSync(resultsPath, "utf8"));
  }
  return {};
}

export function saveResults(results) {
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
}

export function mergeResult(slug, data) {
  const results = loadResults();
  results[slug] = data;
  saveResults(results);
  return results;
}

export function isCloudflareBlocked(data) {
  return (
    data?.title === "www.afca.org.au" ||
    data?.sections?.some((s) => s.heading === "Performing security verification")
  );
}

export function getPendingUrls() {
  const urls = JSON.parse(fs.readFileSync(path.join(__dirname, "urls-to-scrape.json"), "utf8"));
  const results = loadResults();
  return urls
    .map((u) => u.replace(/^\/+|\/+$/g, ""))
    .filter((slug) => {
      const data = results[slug];
      return !data || isCloudflareBlocked(data);
    });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const pending = getPendingUrls();
  console.log(`Pending: ${pending.length}`);
  pending.forEach((u) => console.log(u));
}
