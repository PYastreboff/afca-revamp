import Link from "next/link";
import {
  Wallet,
  ShieldCheck,
  Building2,
  LineChart,
  Vault,
  Database,
  AlertCircle,
  CloudLightning,
  HeartHandshake,
  ShieldOff,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Scale,
  Users,
  Clock,
  Phone,
} from "lucide-react";
import { Button } from "./Button";
import { IconBox } from "./IconBox";
import { SectionHeading } from "./SectionHeading";
import { complaintCategories, phoneNumbers } from "@/lib/navigation";
import { featuredNews } from "@/lib/latest-news";

const iconMap = {
  credit: Wallet,
  insurance: ShieldCheck,
  banking: Building2,
  investments: LineChart,
  superannuation: Vault,
};

const accentMap = {
  credit: "yellow",
  insurance: "sky",
  banking: "navy",
  investments: "orange",
  superannuation: "teal",
} as const;

const borderAccentMap = {
  credit: "border-t-afca-yellow",
  insurance: "border-t-afca-sky",
  banking: "border-t-afca-blue",
  investments: "border-t-afca-orange",
  superannuation: "border-t-afca-teal",
} as const;

const categoryDescriptions: Record<string, string> = {
  credit: "Loans, credit cards and buy-now-pay-later disputes",
  insurance: "Claims, policies, premiums and coverage issues",
  banking: "Accounts, payments, transfers and card problems",
  investments: "Managed funds, advice and investment products",
  superannuation: "Retirement savings, fees and fund decisions",
};

const featureCards = [
  {
    title: "AFCA Datacube",
    description:
      "Explore how financial firms across Australia are responding to complaints — transparent data, updated regularly.",
    href: "https://data.afca.org.au/",
    icon: Database,
    accent: "navy" as const,
    external: true,
    cta: "Explore the Datacube",
    featured: true,
  },
  {
    title: "Shield & First Guardian",
    description: "Guidance and support if you've been affected by the collapse of Shield or First Guardian.",
    href: "/news/shield-and-first-guardian-collapse-how-afca-can-help",
    icon: AlertCircle,
    accent: "orange" as const,
    cta: "Learn more",
  },
  {
    title: "Disaster & significant events",
    description: "Dedicated resources for customers impacted by natural disasters and other significant events.",
    href: "/news/significant-events",
    icon: CloudLightning,
    accent: "sky" as const,
    cta: "Learn more",
  },
  {
    title: "Financial hardship",
    description: "Struggling to meet repayments? We can help if your financial firm hasn't provided adequate support.",
    href: "/make-a-complaint/financial-hardship-complaints",
    icon: HeartHandshake,
    accent: "teal" as const,
    cta: "Learn more",
  },
  {
    title: "Protect yourself from scams",
    description: "Practical advice on spotting scams, safeguarding your information, and what to do if you think you've been targeted.",
    href: "/scams-things-to-look-out-for-and-how-to-protect-your-information",
    icon: ShieldOff,
    accent: "yellow" as const,
    cta: "Learn more",
  },
  {
    title: "Diversity & inclusion",
    description: "Our strategy for building a workplace where different backgrounds and perspectives are valued.",
    href: "/about-afca/diversity-inclusion-and-belonging",
    icon: Sparkles,
    accent: "sky" as const,
    cta: "Learn more",
  },
  {
    title: "Feedback on our service",
    description: "Your compliments, suggestions and complaints help us deliver a better experience for everyone.",
    href: "/about-afca/feedback-and-complaints-about-our-service",
    icon: MessageCircle,
    accent: "navy" as const,
    cta: "Share feedback",
  },
];

const latestNews = [
  ...featuredNews.map((article) => ({
    date: article.date,
    title: article.title,
    description: article.excerpt,
    href: article.href,
    tag: article.tag,
  })),
  {
    date: "09 Jun 2026",
    title: "AFCA confirmed as EDR service for Scams Prevention Framework",
    description:
      "The Federal Government has confirmed AFCA as the centralised External Dispute Resolution scheme for scam complaints under the SPF.",
    href: "/news/media-releases/afca-authorised-external-dispute-resolution-service-for-scams-prevention-framework",
    tag: "Media release",
  },
];

const trustPoints = [
  { icon: Scale, label: "Independent & impartial" },
  { icon: Users, label: "Free for consumers" },
  { icon: Clock, label: "Timely resolution" },
];

const trustDetails: Record<string, string> = {
  "Independent & impartial":
    "We operate independently of government, regulators and the financial industry.",
  "Free for consumers": "There is no charge to lodge or pursue a complaint with us.",
  "Timely resolution":
    "We work with both parties to resolve complaints fairly and efficiently.",
};

export function Hero() {
  return (
    <section className="hero-home relative overflow-hidden text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-afca-sky mb-4">
            Australian Financial Complaints Authority
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-balance">
            Fair, free and independent resolution for financial complaints
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl text-pretty">
            We help consumers and small businesses resolve disputes with financial firms — at no
            cost, with no bias, and with outcomes you can trust.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button href="/make-a-complaint" variant="yellow" size="lg">
              Lodge a complaint
            </Button>
            <Button
              href="https://my.afca.org.au/my-complaints"
              variant="hero-secondary"
              size="lg"
              external
              showExternalIcon
            >
              Track your complaint
            </Button>
          </div>
          <p className="mt-4 text-sm text-afca-on-navy-muted">
            Financial firm?{" "}
            <Link
              href="/members/apply-for-membership"
              className="font-semibold text-white hover:text-afca-sky underline-offset-2 hover:underline"
            >
              Apply for AFCA membership
            </Link>
          </p>
        </div>

        <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-white/15">
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/20">
                  <Icon className="h-5 w-5 text-afca-sky" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-snug">{label}</p>
                  <p className="mt-1 text-sm text-afca-on-navy-muted leading-relaxed">
                    {trustDetails[label]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/15 bg-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                <Phone className="h-5 w-5 text-afca-sky" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-afca-sky">
                  Telephone enquiries
                </p>
                <a
                  href={phoneNumbers.freeCall.href}
                  className="mt-0.5 block text-lg font-semibold tracking-wide text-white hover:text-afca-sky transition-colors"
                >
                  {phoneNumbers.freeCall.number}
                </a>
              </div>
            </div>
            <p className="text-sm text-afca-on-navy-muted sm:text-right sm:max-w-xs leading-relaxed">
              Free call for consumers and small businesses across Australia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComplaintCategories() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we cover"
          title="Complaints we handle"
          description="From everyday banking to complex investments — if it's a financial product or service, we may be able to help."
          align="center"
          className="mb-10 sm:mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {complaintCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const accent = accentMap[category.icon as keyof typeof accentMap];
            const borderAccent = borderAccentMap[category.icon as keyof typeof borderAccentMap];
            const description = categoryDescriptions[category.icon];
            return (
              <Link
                key={category.href}
                href={category.href}
                className={`group relative flex flex-col rounded-2xl border border-afca-navy/8 bg-white p-5 sm:p-6 shadow-sm border-t-4 ${borderAccent} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-afca-navy/15`}
              >
                <IconBox icon={Icon} accent={accent} size="sm" className="mb-4" />
                <h3 className="text-sm font-bold text-afca-navy group-hover:text-afca-blue transition-colors leading-snug">
                  {category.label}
                </h3>
                <p className="mt-2 text-xs text-afca-gray leading-relaxed flex-1">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-afca-blue">
                  Explore
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-2xl bg-afca-navy px-6 py-6 sm:px-8 sm:py-7 text-white">
          <div>
            <h3 className="text-lg font-bold">Not sure where to start?</h3>
            <p className="mt-1 text-sm text-afca-on-navy-muted max-w-xl">
              Answer a few quick questions and we&apos;ll point you to the right complaint path.
            </p>
          </div>
          <Button href="/make-a-complaint" variant="yellow" size="md" className="shrink-0 w-full sm:w-auto">
            Start your complaint
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FeatureCards() {
  const featured = featureCards.find((card) => card.featured);
  const resources = featureCards.filter((card) => !card.featured);

  return (
    <section className="py-16 sm:py-24 bg-afca-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Resources & support"
          title="Tools and guidance"
          description="Practical resources to help you navigate complaints, stay informed, and protect yourself."
          className="mb-10 sm:mb-14"
        />

        {featured && (
          <article className="group relative mb-5 sm:mb-6 flex flex-col gap-6 overflow-hidden rounded-2xl bg-afca-navy p-6 text-white shadow-lg shadow-afca-navy/20 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-afca-sky/15 blur-2xl"
              aria-hidden
            />
            <div className="relative flex gap-5 sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <featured.icon className="h-7 w-7 text-afca-sky" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-afca-sky mb-1.5">
                  Featured resource
                </p>
                <h3 className="text-xl font-bold sm:text-2xl">{featured.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-white/75 leading-relaxed sm:text-base">
                  {featured.description}
                </p>
              </div>
            </div>
            <Button
              href={featured.href}
              variant="yellow"
              size="md"
              external={featured.external}
              showExternalIcon={featured.external}
              className="relative shrink-0 w-full sm:w-auto"
            >
              {featured.cta}
            </Button>
          </article>
        )}

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="group surface-card flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
              >
                <IconBox icon={Icon} accent={card.accent} size="sm" className="mb-4" />
                <h3 className="text-base font-bold text-afca-navy mb-2 leading-snug">{card.title}</h3>
                <p className="text-sm text-afca-gray leading-relaxed flex-1 mb-4 line-clamp-3">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-afca-blue hover:text-afca-navy transition-colors"
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {card.cta}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  const [featuredArticle, ...otherArticles] = latestNews;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="Stay informed"
            title="News & updates"
            description="The latest announcements, guidance and insights from AFCA."
          />
          <Button href="/news/latest-news" variant="outline" size="sm" className="shrink-0 w-full sm:w-auto">
            View all news
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
          <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-afca-navy via-afca-navy to-afca-blue text-white lg:col-span-7 p-5 sm:p-6 shadow-lg shadow-afca-navy/15 transition-all duration-300 hover:shadow-xl">
            <div
              className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-afca-yellow/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-3 mb-3">
              <span className="rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-afca-teal">
                {featuredArticle.tag}
              </span>
              <time className="text-xs text-afca-on-navy-muted">{featuredArticle.date}</time>
            </div>
            <h3 className="relative text-lg sm:text-xl font-bold mb-2 leading-snug">
              <Link
                href={featuredArticle.href}
                className="hover:text-afca-teal transition-colors rounded-sm after:absolute after:inset-0 after:rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-afca-yellow"
              >
                {featuredArticle.title}
              </Link>
            </h3>
            <p className="relative text-sm text-afca-on-navy-muted leading-relaxed mb-4 line-clamp-2">
              {featuredArticle.description}
            </p>
            <span
              className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-afca-yellow pointer-events-none"
              aria-hidden="true"
            >
              Read article
              <ArrowRight className="h-4 w-4" />
            </span>
          </article>

          <div className="flex flex-col gap-5 lg:col-span-5">
          {otherArticles.map((article) => (
            <article
              key={article.href}
              className="group relative surface-card rounded-2xl p-5 sm:p-6 flex flex-col transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-md bg-afca-cream px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-afca-blue">
                  {article.tag}
                </span>
                <time className="text-xs text-afca-muted">{article.date}</time>
              </div>
              <h3 className="text-base font-bold text-afca-navy mb-2 leading-snug line-clamp-2">
                <Link
                  href={article.href}
                  className="hover:text-afca-blue transition-colors rounded-sm after:absolute after:inset-0 after:rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-afca-blue"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="text-sm text-afca-gray leading-relaxed mb-4 line-clamp-2">
                {article.description}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-afca-blue pointer-events-none"
                aria-hidden="true"
              >
                Read article
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
