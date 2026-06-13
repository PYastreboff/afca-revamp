// Paste into browser CDP Runtime.evaluate to extract page content
(() => {
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
})();
