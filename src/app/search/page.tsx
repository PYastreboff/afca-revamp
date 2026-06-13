"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { searchPages, type SearchIndexEntry } from "@/lib/search";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);

  useEffect(() => {
    fetch(withBasePath("/search-index.json"))
      .then((res) => res.json())
      .then((data: SearchIndexEntry[]) => setIndex(data))
      .catch(() => setIndex([]));
  }, []);

  const results = useMemo(() => searchPages(query, index, 50), [query, index]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-afca-blue mb-2">Search</p>
        <h1 className="text-3xl font-bold text-afca-navy tracking-tight">
          {query ? `Results for “${query}”` : "Search AFCA"}
        </h1>
        {query && (
          <p className="mt-2 text-afca-muted">
            {results.length} {results.length === 1 ? "result" : "results"} found
          </p>
        )}
      </div>

      <form action={withBasePath("/search")} method="get" className="mb-10">
        <label htmlFor="search-page-input" className="sr-only">
          Search
        </label>
        <div className="flex items-center gap-3 rounded-2xl border border-afca-navy/10 bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-afca-blue" />
          <input
            id="search-page-input"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search pages, topics and guidance…"
            className="min-w-0 flex-1 bg-transparent text-base text-afca-navy placeholder:text-afca-muted outline-none"
          />
        </div>
      </form>

      {!query && (
        <p className="text-afca-muted">Enter a search term to find pages across the AFCA website.</p>
      )}

      {query && results.length === 0 && (
        <p className="text-afca-muted">No results matched your search. Try different keywords.</p>
      )}

      {results.length > 0 && (
        <ul className="space-y-3">
          {results.map((result) => (
            <li key={result.href}>
              <Link
                href={result.href}
                className="group block rounded-2xl border border-afca-navy/8 bg-white p-5 shadow-sm hover:border-afca-blue/20 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-afca-navy group-hover:text-afca-blue transition-colors">
                      {result.title}
                    </h2>
                    {result.excerpt && (
                      <p className="mt-2 text-sm text-afca-muted leading-relaxed">{result.excerpt}</p>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-afca-blue opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-afca-muted">Loading search…</div>}>
      <SearchResults />
    </Suspense>
  );
}
