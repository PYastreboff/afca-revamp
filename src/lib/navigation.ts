export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
};

export const phoneNumbers = {
  freeCall: { number: "1800 931 678", label: "1800 931 678 (free call)", href: "tel:1800931678" },
  members: { number: "1300 56 55 62", label: "1300 56 55 62 (Members)", href: "tel:1300565562" },
};

export type QuickActionVariant = "yellow" | "orange" | "sky";

export const quickActions: {
  label: string;
  href: string;
  variant: QuickActionVariant;
  external?: boolean;
}[] = [
  { label: "Lodge a complaint", href: "/make-a-complaint", variant: "yellow" },
  {
    label: "Track your complaint",
    href: "https://my.afca.org.au/my-complaints",
    variant: "orange",
    external: true,
  },
  { label: "For member firms", href: "/members", variant: "sky" },
];

export const mainNavigation: NavItem[] = [
  {
    label: "Lodging a complaint",
    href: "/make-a-complaint",
    children: [
      { label: "Financial hardship complaints", href: "/make-a-complaint/financial-hardship-complaints" },
      { label: "Find a financial firm or superannuation fund", href: "https://my.afca.org.au/ff-search/", external: true },
      { label: "Before you complain to us", href: "/make-a-complaint/complain" },
      { label: "Accessibility and support", href: "/make-a-complaint/accessibility-and-support" },
      { label: "Languages", href: "/make-a-complaint/do-you-speak-another-language" },
      { label: "Credit, finance and loan complaints", href: "/make-a-complaint/credit-finance-and-loan-complaints" },
      { label: "Insurance complaints", href: "/make-a-complaint/insurance" },
      { label: "Banking deposits and payments complaints", href: "/make-a-complaint/banking" },
      { label: "Investments and financial advice complaints", href: "/make-a-complaint/investments-and-financial-advice" },
      { label: "Superannuation complaints", href: "/make-a-complaint/superannuation" },
      { label: "Legacy complaints", href: "/make-a-complaint/legacy-complaints" },
    ],
  },
  {
    label: "Your complaint journey",
    href: "/what-to-expect",
    children: [
      { label: "Current complaints with FOS, CIO or SCT", href: "/what-expect/current-complaints-with-fos-cio-or-sct" },
      { label: "Complaints we consider", href: "/what-to-expect/complaints-we-consider" },
      {
        label: "The process we follow",
        href: "/what-to-expect/the-process-we-follow",
        children: [
          { label: "Process map", href: "/what-to-expect/the-process-we-follow/process-map" },
          {
            label: "Confidentiality and information sharing",
            href: "/what-to-expect/the-process-we-follow/confidentiality-and-information-sharing",
          },
          { label: "Delays", href: "/what-to-expect/the-process-we-follow/delays" },
          { label: "Further issues", href: "/what-to-expect/the-process-we-follow/further-issues" },
        ],
      },
      {
        label: "How we make decisions",
        href: "/what-to-expect/how-we-make-decisions",
        children: [
          { label: "AFCA approaches", href: "/what-to-expect/how-we-make-decisions/afca-approaches" },
        ],
      },
      { label: "Search published decisions", href: "/what-to-expect/search-published-decisions" },
      { label: "Outcomes AFCA provides", href: "/what-to-expect/outcomes-afca-provides" },
      { label: "Other places to get help", href: "/what-to-expect/other-places-to-get-help" },
      { label: "Information for consumers", href: "/what-to-expect/consumers" },
      { label: "Information for small business", href: "/what-to-expect/small-business" },
      { label: "Scam alert", href: "/what-to-expect/scam-alert" },
    ],
  },
  {
    label: "News & outreach",
    href: "/news",
    children: [
      { label: "Consultation", href: "/news/consultation" },
      { label: "Media centre", href: "/news/media-centre" },
      { label: "AFCA Independent Review", href: "/news/afca-independent-review" },
      { label: "Significant events", href: "/news/significant-events" },
      { label: "Statistics", href: "/news/statistics" },
      { label: "Comparative reporting", href: "https://data.afca.org.au/", external: true },
      { label: "Latest news", href: "/news/latest-news" },
      { label: "Current matters", href: "/news/current-matters" },
      { label: "Social media", href: "/news/social-media" },
      { label: "Events and speaking engagements", href: "/news/events-and-speaking-engagements" },
      { label: "Webcasts", href: "/news/webcasts" },
      { label: "Information for consumer advocates", href: "/news/information-for-consumer-advocates" },
      { label: "Information for MPs and Senators", href: "/mp-hub" },
    ],
  },
  {
    label: "About AFCA",
    href: "/about-afca",
    children: [
      {
        label: "Corporate information",
        href: "/about-afca/corporate-information",
        children: [
          { label: "Constitution", href: "/about-afca/corporate-information/constitution" },
          { label: "Funding", href: "/about-afca/corporate-information/funding" },
          { label: "Organisational chart", href: "/about-afca/corporate-information/organisational-chart" },
          { label: "Strategic plan", href: "/about-afca/corporate-information/strategic-plan" },
          { label: "What is an ombudsman", href: "/about-afca/corporate-information/what-is-an-ombudsman" },
        ],
      },
      { label: "Annual Review", href: "/about-afca/annual-review" },
      { label: "Rules and guidelines", href: "/about-afca/rules-and-guidelines" },
      { label: "Code compliance and monitoring", href: "/about-afca/codes-of-practice" },
      { label: "Accessibility", href: "/about-afca/accessibility" },
      {
        label: "Independence",
        href: "/about-afca/independence",
        children: [
          { label: "The AFCA Board", href: "/about-afca/independence/the-afca-board" },
          { label: "CEO and Chief Ombudsman", href: "/about-afca/independence/ceo-and-chief-ombudsman" },
          { label: "Decision makers", href: "/about-afca/independence/decision-makers" },
        ],
      },
      { label: "Fairness", href: "/about-afca/fairness" },
      {
        label: "Accountability",
        href: "/about-afca/accountability",
        children: [
          { label: "Independent Assessor", href: "/about-afca/accountability/independent-assessor" },
        ],
      },
      { label: "Efficiency and effectiveness", href: "/about-afca/efficiency-and-effectiveness" },
      { label: "Systemic issues", href: "/about-afca/systemic-issues" },
      { label: "Publications", href: "/about-afca/publications" },
      { label: "Submissions", href: "/about-afca/submissions" },
      { label: "Compensation Scheme of Last Resort", href: "/cslr" },
      { label: "Forward-Looking Review Mechanism", href: "/about-afca/forward-looking-review" },
      { label: "Scams Prevention Framework", href: "/about-afca/scams-prevention-framework" },
      { label: "Engagement Charter", href: "/about-afca/engagement-charter" },
      { label: "Feedback and complaints about our service", href: "/about-afca/feedback-and-complaints-about-our-service" },
      { label: "Policies and MoUs", href: "/about-afca/policies" },
      { label: "Privacy", href: "/about-afca/policies/privacy-policy" },
      { label: "Careers", href: "/careers" },
      { label: "Website information", href: "/about-afca/website-information" },
      { label: "Contact us", href: "/about-afca/contact-us" },
      { label: "Reconciliation", href: "/about-afca/reconciliation" },
      { label: "Forms", href: "/about-afca/forms" },
      { label: "Diversity, Inclusion and Belonging", href: "/about-afca/diversity-inclusion-and-belonging" },
    ],
  },
];

export const complaintCategories = [
  { label: "Credit, finance and loans", href: "/make-a-complaint/credit-finance-and-loan-complaints", icon: "credit" },
  { label: "Insurance", href: "/make-a-complaint/insurance", icon: "insurance" },
  { label: "Banking deposits and payments", href: "/make-a-complaint/banking", icon: "banking" },
  { label: "Investments and financial advice", href: "/make-a-complaint/investments-and-financial-advice", icon: "investments" },
  { label: "Superannuation", href: "/make-a-complaint/superannuation", icon: "superannuation" },
];

export type SocialNetwork = "facebook" | "x" | "linkedin" | "youtube";

export const socialLinks: { label: string; href: string; network: SocialNetwork }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/AustralianFinancialComplaintsAuthority/",
    network: "facebook",
  },
  {
    label: "X",
    href: "https://x.com/afca_org_au",
    network: "x",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/australian-financial-complaints-authority/",
    network: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCe5liv0ZvcelpvuVQa6YALw",
    network: "youtube",
  },
];

export const footerUtilityLinks: NavItem[] = [
  { label: "Privacy", href: "/about-afca/policies/privacy-policy" },
  { label: "Accessibility", href: "/about-afca/accessibility" },
  { label: "Website information", href: "/about-afca/website-information" },
  { label: "Contact us", href: "/about-afca/contact-us" },
  { label: "Social media", href: "/news/social-media" },
  { label: "Feedback", href: "/about-afca/feedback-and-complaints-about-our-service" },
];

export const footerColumns: NavItem[] = [
  {
    label: "Lodging a complaint",
    href: "/make-a-complaint",
    children: [
      { label: "Before you complain to us", href: "/make-a-complaint/complain" },
      { label: "Languages", href: "/make-a-complaint/do-you-speak-another-language" },
      { label: "Accessibility and support", href: "/make-a-complaint/accessibility-and-support" },
      { label: "Find a financial firm", href: "https://my.afca.org.au/ff-search/", external: true },
      { label: "Financial hardship complaints", href: "/make-a-complaint/financial-hardship-complaints" },
    ],
  },
  {
    label: "Your complaint journey",
    href: "/what-to-expect",
    children: [
      { label: "Complaints we consider", href: "/what-to-expect/complaints-we-consider" },
      { label: "The process we follow", href: "/what-to-expect/the-process-we-follow" },
      { label: "How we make decisions", href: "/what-to-expect/how-we-make-decisions" },
      { label: "Outcomes AFCA provides", href: "/what-to-expect/outcomes-afca-provides" },
      { label: "Other places to get help", href: "/what-to-expect/other-places-to-get-help" },
    ],
  },
  {
    label: "News & outreach",
    href: "/news",
    children: [
      { label: "Latest news", href: "/news/latest-news" },
      { label: "Current matters", href: "/news/current-matters" },
      { label: "Media centre", href: "/news/media-centre" },
      { label: "Consultation", href: "/news/consultation" },
      { label: "Statistics", href: "/news/statistics" },
    ],
  },
  {
    label: "About AFCA",
    href: "/about-afca",
    children: [
      { label: "Contact us", href: "/about-afca/contact-us" },
      { label: "Rules and guidelines", href: "/about-afca/rules-and-guidelines" },
      { label: "Annual Review", href: "/about-afca/annual-review" },
      { label: "Careers", href: "/careers" },
      { label: "For member firms", href: "/members" },
    ],
  },
];
