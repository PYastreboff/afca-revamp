export type LanguageOption = {
  slug: string;
  native: string;
  english: string;
  href: string;
};

const BASE = "/make-a-complaint/do-you-speak-another-language";

export const languageOptions: LanguageOption[] = [
  { slug: "arabic", native: "العربية", english: "Arabic", href: `${BASE}/arabic` },
  { slug: "auslan", native: "Auslan", english: "Australian Sign Language", href: `${BASE}/auslan` },
  {
    slug: "chinese-simplified",
    native: "简体中文",
    english: "Chinese (Simplified)",
    href: `${BASE}/chinese-simplified`,
  },
  {
    slug: "chinese-traditional",
    native: "中文繁體",
    english: "Chinese (Traditional)",
    href: `${BASE}/chinese-traditional`,
  },
  {
    slug: "english",
    native: "English",
    english: "How to make a complaint to AFCA",
    href: `${BASE}/english`,
  },
  { slug: "farsi", native: "فارسی", english: "Farsi", href: `${BASE}/farsi` },
  { slug: "filipino", native: "Filipino", english: "Tagalog", href: `${BASE}/filipino` },
  { slug: "french", native: "Français", english: "French", href: `${BASE}/french` },
  { slug: "german", native: "Deutsch", english: "German", href: `${BASE}/german` },
  { slug: "greek", native: "Ελληνικά", english: "Greek", href: `${BASE}/greek` },
  { slug: "hindi", native: "हिन्दी", english: "Hindi", href: `${BASE}/hindi` },
  { slug: "hungarian", native: "Magyar", english: "Hungarian", href: `${BASE}/hungarian` },
  { slug: "italian", native: "Italiano", english: "Italian", href: `${BASE}/italian` },
  { slug: "korean", native: "한국어", english: "Korean", href: `${BASE}/korean` },
  { slug: "portuguese", native: "Português", english: "Portuguese", href: `${BASE}/portuguese` },
  { slug: "punjabi", native: "ਪੰਜਾਬੀ", english: "Punjabi", href: `${BASE}/punjabi` },
  { slug: "sinhalese", native: "සිංහල", english: "Sinhalese", href: `${BASE}/sinhalese` },
  { slug: "spanish", native: "Español", english: "Spanish", href: `${BASE}/spanish` },
  { slug: "tamil", native: "தமிழ்", english: "Tamil", href: `${BASE}/tamil` },
  { slug: "turkish", native: "Türkçe", english: "Turkish", href: `${BASE}/turkish` },
  { slug: "vietnamese", native: "Tiếng Việt", english: "Vietnamese", href: `${BASE}/vietnamese` },
];

export const languagesFeaturedLink = {
  title: "AFCA videos for diverse communities",
  description: "Watch our videos explaining how to make a complaint to AFCA.",
  href: `${BASE}/afca-launches-new-videos-for-diverse-communities`,
};

export const interpreterContacts = [
  { label: "Interpreter Service", value: "131 450" },
  { label: "TTY / Voice Calls", value: "133 677 (local)" },
  { label: "Speak & Listen", value: "1300 555 727 (local)" },
  {
    label: "Internet Relay Call",
    value: "Open internet relay service",
    href: "https://nrschat.nrscall.gov.au/nrs/internetrelay",
  },
  {
    label: "National Relay Service",
    value: "Visit relay service website",
    href: "https://www.relayservice.gov.au",
  },
];
