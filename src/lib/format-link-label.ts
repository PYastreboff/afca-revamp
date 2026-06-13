const EMAIL_LABELS: Record<string, string> = {
  "info@afca.org.au": "Email us",
  "membership@afca.org.au": "Email membership team",
  "accounts@afca.org.au": "Email accounts team",
  "media@afca.org.au": "Email media team",
  "privacy@afca.org.au": "Email privacy team",
  "independentassessor@afca.org.au": "Email Independent Assessor",
  "systemicissues@afca.org.au": "Email systemic issues team",
  "afcaservicecomplaints@afca.org.au": "Email service complaints team",
  "approaches@afca.org.au": "Email approaches team",
  "consultation@afca.org.au": "Email consultation team",
  "comparativereporting@afca.org.au": "Email comparative reporting team",
  "careers@afca.org.au": "Email careers team",
  "community@afca.org.au": "Email community team",
};

const HREF_LABELS: Record<string, string> = {
  "https://data.afca.org.au": "View comparative reporting data",
  "https://data.afca.org.au/": "View comparative reporting data",
  "https://my.afca.org.au": "Go to AFCA portal",
  "https://my.afca.org.au/": "Go to AFCA portal",
  "https://my.afca.org.au/my-complaints": "Track your complaint",
  "https://my.afca.org.au/ff-search/": "Search for a financial firm",
  "https://my.afca.org.au/enquiries-and-feedback/": "Submit feedback online",
  "https://nrschat.nrscall.gov.au/nrs/internetrelay": "Open internet relay service",
  "https://www.relayservice.gov.au": "Visit National Relay Service",
  "https://www.accesshub.gov.au/about-the-nrs": "About the National Relay Service",
  "https://www.accesshub.gov.au/about-the-nrs/nrs-call-numbers-and-links": "NRS call numbers and links",
  "https://asicconnect.asic.gov.au/": "Go to ASIC Connect",
  "https://asicconnect.asic.gov.au": "Go to ASIC Connect",
  "https://clcs.org.au/": "Community legal centres",
  "https://clcs.org.au": "Community legal centres",
  "https://get.adobe.com/reader/": "Download Adobe Reader",
  "https://www.facebook.com/AustralianFinancialComplaintsAuthority/": "AFCA on Facebook",
  "https://x.com/afca_org_au": "AFCA on X",
  "https://twitter.com/afca_org_au": "AFCA on X",
  "https://www.linkedin.com/company/australian-financial-complaints-authority/": "AFCA on LinkedIn",
  "https://www.youtube.com/channel/UCe5liv0ZvcelpvuVQa6YALw": "AFCA on YouTube",
};

const HOST_LABELS: Record<string, string> = {
  "data.afca.org.au": "View comparative reporting data",
  "my.afca.org.au": "Go to AFCA portal",
  "asicconnect.asic.gov.au": "Go to ASIC Connect",
  "clcs.org.au": "Community legal centres",
  "relayservice.gov.au": "National Relay Service",
  "nrschat.nrscall.gov.au": "Open internet relay service",
  "accesshub.gov.au": "National Relay Service hub",
  "get.adobe.com": "Download Adobe Reader",
  "cyber.gov.au": "Australian Cyber Security Centre",
  "bankingcode.org.au": "Banking Code of Practice",
  "asic.gov.au": "ASIC website",
};

const GENERIC_LABELS: Record<string, string> = {
  "find out more": "Learn more",
  "click here": "Learn more",
  "read more": "Read more",
  "here": "Learn more",
  "download": "Download",
  "contact us": "Contact us",
};

function humanizeSlug(path: string): string {
  const segment = path.split("/").filter(Boolean).pop() || path;
  return segment
    .replace(/\.(pdf|docx?|xlsx?)$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function looksLikeUrlLabel(label: string): boolean {
  const text = label.trim();
  if (!text) return true;
  if (/^https?:\/\//i.test(text)) return true;
  if (/^mailto:/i.test(text)) return true;
  if (/^tel:/i.test(text)) return true;
  if (/^www\./i.test(text)) return true;
  if (/^[\w.+-]+@[\w.-]+\.\w+$/.test(text)) return true;
  if (/^afca\.org\.au(\/|$)/i.test(text)) return true;
  if (/^[\w.-]+\.(com|org|gov|au|net|io)\b/i.test(text)) return true;
  return false;
}

function formatPhone(href: string): string {
  const digits = href.replace(/^tel:/i, "");
  if (digits.length === 10) {
    return `Call ${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 6) {
    return `Call ${digits.slice(0, 3)} ${digits.slice(3)}`;
  }
  return `Call ${digits}`;
}

function formatEmail(label: string, href: string): string {
  const email = (href.startsWith("mailto:") ? href.slice(7) : label).toLowerCase().trim();
  if (EMAIL_LABELS[email]) return EMAIL_LABELS[email];
  const local = email.split("@")[0]?.replace(/[._]/g, " ");
  return local ? `Email ${local}` : "Send an email";
}

function normalizeHrefKey(href: string): string {
  return href.trim().replace(/\/$/, "");
}

export function formatLinkLabel(label: string, href: string): string {
  const trimmed = label.trim();
  const hrefKey = normalizeHrefKey(href);
  const hrefWithSlash = `${hrefKey}/`;

  if (HREF_LABELS[hrefKey] || HREF_LABELS[hrefWithSlash]) {
    return HREF_LABELS[hrefKey] || HREF_LABELS[hrefWithSlash]!;
  }

  const generic = GENERIC_LABELS[trimmed.toLowerCase()];
  if (generic && !looksLikeUrlLabel(trimmed)) return generic;

  if (href.startsWith("mailto:") || /^[\w.+-]+@[\w.-]+\.\w+$/.test(trimmed)) {
    return formatEmail(trimmed, href);
  }

  if (href.startsWith("tel:")) {
    return formatPhone(href);
  }

  if (/\.(pdf|docx?|xlsx?)(\?|#|$)/i.test(href)) {
    if (!looksLikeUrlLabel(trimmed)) return trimmed;
    return "Download document";
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    if (!looksLikeUrlLabel(trimmed)) return trimmed;
    return humanizeSlug(href);
  }

  if (/^afca\.org\.au(\/|$)/i.test(trimmed)) {
    const path = trimmed.replace(/^afca\.org\.au\/?/i, "/");
    return path === "/" ? "Visit AFCA website" : humanizeSlug(path);
  }

  if (!looksLikeUrlLabel(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(
      href.startsWith("http") ? href : `https://${trimmed.replace(/^\/\//, "")}`
    );
    const host = url.hostname.replace(/^www\./, "");

    if (HOST_LABELS[host]) return HOST_LABELS[host];

    if (host.endsWith("afca.org.au") && url.pathname && url.pathname !== "/") {
      return humanizeSlug(url.pathname);
    }

    const site = host.split(".")[0];
    if (site) {
      return `Visit ${site.charAt(0).toUpperCase()}${site.slice(1)}`;
    }
  } catch {
    // fall through
  }

  return trimmed
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
}
