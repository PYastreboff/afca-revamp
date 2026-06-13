import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/types";
import { FOCUS_RING } from "@/lib/a11y";
import { formatLinkLabel } from "@/lib/format-link-label";
import { resolveContentHref } from "@/lib/resolve-content-href";
import { dedupeSectionLinks, cn } from "@/lib/utils";
import { Breadcrumbs } from "./Breadcrumbs";
import { collectPageLinks, ContentSectionBody } from "./ContentSectionBody";
import { ComplaintJourneyNav, ComplaintJourneySteps } from "./ComplaintJourneySteps";
import { getParentCrumb, PageBackLink } from "./PageBackLink";
import { getComplaintJourneyStep } from "@/lib/complaint-journey";
import { getPageHeroTitle, getPageSubtitle } from "@/lib/page-subtitle";

type ContentPageProps = {
  content: PageContent;
  breadcrumbs: { label: string; href: string }[];
  path: string;
};

export function ContentPage({ content, breadcrumbs, path }: ContentPageProps) {
  const parent = getParentCrumb(breadcrumbs);
  const journeyStep = getComplaintJourneyStep(path);
  const heroTitle = getPageHeroTitle(content);
  const subtitle = getPageSubtitle(content);
  const pageLinks = collectPageLinks(content.sections);

  return (
    <div>
      <section className="relative overflow-hidden bg-afca-navy text-white">
        <div className="absolute inset-0 hero-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-afca-navy via-afca-navy to-afca-blue/80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
          {parent && <PageBackLink href={parent.href} label={parent.label} />}
          <Breadcrumbs items={breadcrumbs} className="mb-5 sm:mb-6" />
          {journeyStep && <ComplaintJourneySteps currentStep={journeyStep} />}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-balance leading-tight">
            {heroTitle}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-afca-on-navy-muted max-w-2xl leading-relaxed text-pretty">
            {subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="max-w-none">
          {content.sections.map((section, i) => (
            <div
              key={i}
              className="mb-10 sm:mb-12 last:mb-0 pb-10 sm:pb-12 last:pb-0 border-b border-afca-navy/8 last:border-0"
            >
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
                  {section.heading}
                </h2>
              )}
              <ContentSectionBody section={section} pagePath={path} pageLinks={pageLinks} />
            </div>
          ))}
        </div>

        {journeyStep && <ComplaintJourneyNav currentStep={journeyStep} />}

        {content.relatedLinks && content.relatedLinks.length > 0 && (
          <aside className="mt-12 sm:mt-16 surface-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-afca-blue mb-5">
              Related topics
            </h2>
            <ul className="space-y-3">
              {dedupeSectionLinks(content.relatedLinks).map((link, linkIndex) => {
                const resolved = resolveContentHref(link.href);
                const className =
                  cn(
                    "group inline-flex items-center gap-2 text-afca-navy hover:text-afca-blue font-medium transition-colors rounded-sm",
                    FOCUS_RING
                  );
                return (
                  <li key={`${linkIndex}-${link.href}`}>
                    {resolved.external ? (
                      <a
                        href={resolved.href}
                        className={className}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {formatLinkLabel(link.label, link.href)}
                        <ArrowRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={resolved.href} className={className}>
                        {formatLinkLabel(link.label, link.href)}
                        <ArrowRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
      </section>
    </div>
  );
}
