"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Search, X } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { searchPages, type SearchIndexEntry } from "@/lib/search";
import { cn } from "@/lib/utils";

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!open || index.length > 0) return;

    setLoading(true);
    fetch(withBasePath("/search-index.json"))
      .then((res) => res.json())
      .then((data: SearchIndexEntry[]) => setIndex(data))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, [open, index.length]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => searchPages(query, index), [query, index]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const goToResult = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (results[activeIndex]) {
      goToResult(results[activeIndex].href);
      return;
    }
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      goToResult(results[activeIndex].href);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8">
      <button
        type="button"
        className="absolute inset-0 bg-afca-navy/50 backdrop-blur-sm"
        aria-label="Close search"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search AFCA"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-afca-navy/10 bg-white shadow-2xl shadow-afca-navy/20"
      >
        <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-afca-navy/8 px-4 sm:px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-afca-blue" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search pages, topics and guidance…"
            className="min-w-0 flex-1 bg-transparent text-base text-afca-navy placeholder:text-afca-muted outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-afca-gray hover:bg-afca-cream hover:text-afca-navy transition-colors"
            aria-label="Close search dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

        <div className="max-h-[min(60vh,28rem)] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center gap-2 px-5 py-10 text-sm text-afca-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading search index…
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-afca-navy">No results found</p>
              <p className="mt-1 text-sm text-afca-muted">
                Try different keywords, or{" "}
                <Link href="/search" onClick={onClose} className="text-afca-blue hover:underline">
                  view all matches
                </Link>
                .
              </p>
            </div>
          )}

          {!loading && !query.trim() && (
            <div className="px-5 py-8 text-center text-sm text-afca-muted">
              Search across complaints guidance, news, member information and more.
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="p-2">
              {results.map((result, index) => (
                <li key={result.href}>
                  <button
                    type="button"
                    onClick={() => goToResult(result.href)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      index === activeIndex ? "bg-afca-cream" : "hover:bg-afca-cream/70"
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-afca-navy">{result.title}</p>
                      {result.excerpt && (
                        <p className="mt-1 text-sm text-afca-muted line-clamp-2">{result.excerpt}</p>
                      )}
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-afca-blue opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hidden sm:flex items-center justify-between gap-4 border-t border-afca-navy/8 px-5 py-3 text-xs text-afca-muted">
          <span>Use ↑↓ to navigate, Enter to open, Esc to close</span>
          <span>⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}

export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}
