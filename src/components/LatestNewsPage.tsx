"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FOCUS_RING } from "@/lib/a11y";
import { cn } from "@/lib/utils";
import { getLatestNewsPage, PAGE_SIZE } from "@/lib/latest-news";
import { getParentCrumb, PageBackLink } from "./PageBackLink";
import { Breadcrumbs } from "./Breadcrumbs";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Latest news", href: "/news/latest-news" },
];

export function LatestNewsPage() {
  const [page, setPage] = useState(1);
  const { articles, currentPage, totalPages, totalArticles } = getLatestNewsPage(page);
  const parent = getParentCrumb(breadcrumbs);

  return (
    <div>
      <section className="relative overflow-hidden bg-afca-navy text-white">
        <div className="absolute inset-0 hero-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-afca-navy via-afca-navy to-afca-blue/80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
          {parent && <PageBackLink href={parent.href} label={parent.label} />}
          <Breadcrumbs items={breadcrumbs} className="mb-5 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance leading-tight">
            Latest news
          </h1>
          <p className="mt-4 text-base sm:text-lg text-afca-on-navy-muted max-w-2xl leading-relaxed text-pretty">
            Stay informed with the latest news from AFCA, including updates on dispute resolution,
            systemic issues, and new initiatives to support consumers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-sm text-afca-muted mb-8">
          {totalArticles} articles · Page {currentPage} of {totalPages}
        </p>

        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.href}>
              <article className="group relative surface-card rounded-2xl p-5 sm:p-6 transition-all duration-300">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="rounded-md bg-afca-cream px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-afca-blue">
                    {article.tag}
                  </span>
                  {article.date && (
                    <time className="text-xs text-afca-muted" dateTime={article.date}>
                      {article.date}
                    </time>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-afca-navy mb-2 leading-snug">
                  <Link
                    href={article.href}
                    className={cn(
                      "hover:text-afca-blue transition-colors rounded-sm after:absolute after:inset-0 after:rounded-2xl",
                      FOCUS_RING
                    )}
                  >
                    {article.title}
                  </Link>
                </h2>
                {article.excerpt && (
                  <p className="text-sm sm:text-base text-afca-gray leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-afca-blue pointer-events-none"
                  aria-hidden="true"
                >
                  Read article
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </article>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <nav
            aria-label="News pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
              className={cn(
                "inline-flex items-center gap-1 rounded-xl border border-afca-navy/10 bg-white px-4 py-2 text-sm font-medium text-afca-navy disabled:opacity-40 hover:border-afca-blue/30 transition-colors",
                FOCUS_RING
              )}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1" role="list">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-label={`Go to page ${n}`}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={cn(
                    "min-w-10 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    FOCUS_RING,
                    n === currentPage
                      ? "bg-afca-navy text-white"
                      : "border border-afca-navy/10 bg-white text-afca-navy hover:border-afca-blue/30"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
              className={cn(
                "inline-flex items-center gap-1 rounded-xl border border-afca-navy/10 bg-white px-4 py-2 text-sm font-medium text-afca-navy disabled:opacity-40 hover:border-afca-blue/30 transition-colors",
                FOCUS_RING
              )}
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        )}

        <p className="mt-6 text-center text-xs text-afca-muted">
          Showing {articles.length} of {totalArticles} articles ({PAGE_SIZE} per page)
        </p>
      </section>
    </div>
  );
}
