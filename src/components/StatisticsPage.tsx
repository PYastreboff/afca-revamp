import Link from "next/link";
import { ArrowRight, Database, ExternalLink } from "lucide-react";
import { Button } from "./Button";
import { Breadcrumbs } from "./Breadcrumbs";
import { getParentCrumb, PageBackLink } from "./PageBackLink";
import { statisticsSections } from "@/lib/statistics";
import { resolveContentHref } from "@/lib/resolve-content-href";
import { FOCUS_RING, SR_NEW_WINDOW } from "@/lib/a11y";
import { cn } from "@/lib/utils";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Statistics", href: "/news/statistics" },
];

function DocumentLink({ label, href }: { label: string; href: string }) {
  const resolved = resolveContentHref(href);
  const className = cn(
    "group inline-flex items-start gap-2 text-afca-navy hover:text-afca-blue font-medium transition-colors leading-relaxed rounded-sm",
    FOCUS_RING
  );

  if (resolved.external) {
    return (
      <a
        href={resolved.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{label}</span>
        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
        <span className="sr-only">{SR_NEW_WINDOW}</span>
      </a>
    );
  }

  return (
    <Link href={resolved.href} className={className}>
      <span>{label}</span>
      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
    </Link>
  );
}

export function StatisticsPage() {
  const parent = getParentCrumb(breadcrumbs);

  return (
    <div>
      <section className="relative overflow-hidden bg-afca-navy text-white">
        <div className="absolute inset-0 hero-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-afca-navy via-afca-navy to-afca-blue/80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
          {parent && <PageBackLink href={parent.href} label={parent.label} />}
          <Breadcrumbs items={breadcrumbs} className="mb-5 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-balance leading-tight">
            Statistics
          </h1>
          <p className="mt-4 text-base sm:text-lg text-afca-on-navy-muted max-w-2xl leading-relaxed text-pretty">
            Complaint data, annual reviews, and snapshots published by AFCA — updated as new
            statistical information becomes available.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <article className="group relative mb-10 sm:mb-12 flex flex-col gap-6 overflow-hidden rounded-2xl bg-afca-navy p-6 text-white shadow-lg shadow-afca-navy/20 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-afca-sky/15 blur-2xl"
            aria-hidden
          />
          <div className="relative flex gap-5 sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <Database className="h-7 w-7 text-afca-sky" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-afca-sky mb-1.5">
                Comparative reporting
              </p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">AFCA Datacube</h2>
              <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
                Explore how financial firms across Australia respond to complaints — transparent
                complaint data, updated regularly.
              </p>
            </div>
          </div>
          <div className="relative flex flex-col gap-2.5 sm:items-end shrink-0">
            <Button
              href="https://data.afca.org.au/"
              variant="yellow"
              size="md"
              external
              showExternalIcon
              className="w-full sm:w-auto"
            >
              Launch Datacube
            </Button>
            <Button
              href="/news/statistics/comparative-reports"
              variant="hero-secondary"
              size="sm"
              className="w-full sm:w-auto"
            >
              About comparative reporting
            </Button>
          </div>
        </article>

        <p className="text-sm sm:text-base text-afca-gray leading-[1.7] mb-10 sm:mb-12">
          This page is regularly updated as we publish new statistical information.
        </p>

        {statisticsSections.map((section) => (
          <div
            key={section.heading}
            className="mb-10 sm:mb-12 last:mb-0 pb-10 sm:pb-12 last:pb-0 border-b border-afca-navy/8 last:border-0"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
              {section.heading}
            </h2>
            <ul className="space-y-3">
              {section.documents.map((doc) => (
                <li key={doc.href} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-afca-sky" />
                  <DocumentLink label={doc.label} href={doc.href} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
