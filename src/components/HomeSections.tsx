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
} from "lucide-react";
import { Button } from "./Button";
import { IconBox } from "./IconBox";
import { SectionHeading } from "./SectionHeading";
import { complaintCategories } from "@/lib/navigation";

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

const featureCards = [
  {
    title: "AFCA Datacube",
    description: "Explore how financial firms across Australia are responding to complaints — transparent data, updated regularly.",
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
  {
    date: "10 Jun 2026",
    title: "How AFCA call recording impacts you",
    description: "We've introduced call recording across case-handling teams to improve the quality and efficiency of how we investigate complaints.",
    href: "/news/latest-news/how-afca-call-recording-impacts-you",
    tag: "Service update",
  },
  {
    date: "09 Jun 2026",
    title: "AFCA confirmed as EDR service for Scams Prevention Framework",
    description: "The Federal Government has confirmed AFCA as the centralised External Dispute Resolution scheme for scam complaints under the SPF.",
    href: "/news/media-releases/afca-authorised-external-dispute-resolution-service-for-scams-prevention-framework",
    tag: "Media release",
  },
  {
    date: "03 Jun 2026",
    title: "New EDR Response Guide for hail damage claims",
    description: "We've published a new response guide to help firms and consumers navigate hail damage claim complaints.",
    href: "/news/latest-news/afca-publishes-edr-response-guide-for-complaints-about-hail-damage-claims",
    tag: "Guidance",
  },
];

const trustPoints = [
  { icon: Scale, label: "Independent & impartial" },
  { icon: Users, label: "Free for consumers" },
  { icon: Clock, label: "Timely resolution" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-mesh">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-afca-navy/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-afca-blue mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-afca-sky animate-pulse" />
            Australia&apos;s financial dispute resolution scheme
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-afca-navy leading-[1.1] tracking-tight text-balance">
            Fair, free and independent resolution for financial complaints
          </h1>
          <p className="mt-5 text-base sm:text-lg text-afca-gray leading-relaxed max-w-2xl text-pretty">
            We help consumers and small businesses resolve disputes with financial firms — at no cost, with no bias, and with outcomes you can trust.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button href="/make-a-complaint" variant="yellow" size="lg">
              Lodge a complaint
            </Button>
            <Button href="https://my.afca.org.au/my-complaints" variant="orange" size="lg" external>
              Track your complaint
            </Button>
            <Button href="/members/apply-for-membership" variant="outline" size="lg">
              Apply for membership
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 sm:gap-6">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-afca-gray">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 border border-afca-navy/8">
                  <Icon className="h-4 w-4 text-afca-blue" strokeWidth={1.75} />
                </div>
                <span className="font-medium">{label}</span>
              </div>
            ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {complaintCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const accent = accentMap[category.icon as keyof typeof accentMap];
            return (
              <Link
                key={category.href}
                href={category.href}
                className="group surface-card rounded-2xl p-5 transition-all duration-300"
              >
                <IconBox icon={Icon} accent={accent} className="mb-4" />
                <h3 className="text-sm font-semibold text-afca-navy group-hover:text-afca-blue transition-colors leading-snug">
                  {category.label}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-afca-blue opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeatureCards() {
  return (
    <section className="py-16 sm:py-24 bg-afca-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Resources & support"
          title="Tools and guidance"
          description="Practical resources to help you navigate complaints, stay informed, and protect yourself."
          className="mb-10 sm:mb-14"
        />
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`group surface-card rounded-2xl p-6 sm:p-7 flex flex-col transition-all duration-300 ${
                  card.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""
                }`}
              >
                <IconBox icon={Icon} accent={card.accent} className="mb-5" />
                <h3 className="text-lg font-bold text-afca-navy mb-2">{card.title}</h3>
                <p className="text-sm text-afca-gray leading-relaxed flex-1 mb-5">{card.description}</p>
                <Button
                  href={card.href}
                  variant="ghost"
                  size="sm"
                  external={card.external}
                  showExternalIcon={card.external}
                  className="self-start -ml-2"
                >
                  {card.cta}
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
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
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((article) => (
            <article
              key={article.href}
              className="group surface-card rounded-2xl p-6 flex flex-col transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-md bg-afca-cream px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-afca-blue">
                  {article.tag}
                </span>
                <time className="text-xs text-afca-muted">{article.date}</time>
              </div>
              <h3 className="text-lg font-bold text-afca-navy mb-3 group-hover:text-afca-blue transition-colors leading-snug">
                <Link href={article.href}>{article.title}</Link>
              </h3>
              <p className="text-sm text-afca-gray leading-relaxed flex-1 mb-5 line-clamp-3">
                {article.description}
              </p>
              <Link
                href={article.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-afca-blue hover:text-afca-navy transition-colors"
              >
                Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
