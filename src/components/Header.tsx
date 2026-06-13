"use client";

import { useCallback, useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Search } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { SearchDialog, useSearchShortcut } from "./SearchDialog";
import { mainNavigation, phoneNumbers, quickActions, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const DROPDOWN_WIDTH = 352; // 22rem
const VIEWPORT_PADDING = 16;

function DesktopNavItem({
  item,
  isActive,
  onActivate,
  onDeactivate,
}: {
  item: NavItem;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelLeft, setPanelLeft] = useState(0);

  useLayoutEffect(() => {
    if (!isActive || !triggerRef.current || !panelRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      const rect = trigger.getBoundingClientRect();
      const panelWidth = panel.offsetWidth || DROPDOWN_WIDTH;
      let left = 0;

      if (rect.left + panelWidth > window.innerWidth - VIEWPORT_PADDING) {
        left = rect.width - panelWidth;
      }

      let leftEdge = rect.left + left;
      if (leftEdge < VIEWPORT_PADDING) {
        left += VIEWPORT_PADDING - leftEdge;
      }

      leftEdge = rect.left + left;
      const rightEdge = leftEdge + panelWidth;
      if (rightEdge > window.innerWidth - VIEWPORT_PADDING) {
        left -= rightEdge - (window.innerWidth - VIEWPORT_PADDING);
      }

      setPanelLeft(left);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isActive]);

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-afca-navy rounded-xl transition-colors hover:bg-afca-cream hover:text-afca-blue",
          isActive && "bg-afca-cream text-afca-blue"
        )}
      >
        {item.label}
        {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
      </Link>

      {item.children && isActive && (
        <div
          ref={panelRef}
          className="absolute top-full z-50 pt-2 w-[22rem] max-w-[calc(100vw-2rem)]"
          style={{ left: panelLeft }}
        >
          <div className="rounded-2xl border border-afca-navy/8 bg-white p-2 shadow-xl shadow-afca-navy/8 max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-xl px-3.5 py-2.5 text-sm text-afca-gray hover:bg-afca-cream hover:text-afca-navy transition-colors"
                {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const openSearch = useCallback(() => {
    setMobileOpen(false);
    setSearchOpen(true);
  }, []);

  useSearchShortcut(openSearch);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setExpandedSection(null);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 relative overflow-visible",
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm shadow-afca-navy/5 border-b border-afca-navy/8"
          : "bg-white border-b border-transparent"
      )}
    >
      {/* Desktop utility bar */}
      <div className="hidden md:block border-b border-afca-navy/6 bg-afca-surface/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 lg:px-6 py-2 text-sm">
          <div className="flex items-center gap-6">
            <a
              href={phoneNumbers.freeCall.href}
              className="flex items-center gap-2 text-afca-gray hover:text-afca-blue transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-afca-blue" />
              <span className="font-medium text-afca-navy">{phoneNumbers.freeCall.number}</span>
              <span className="text-afca-muted">free call</span>
            </a>
            <a
              href={phoneNumbers.members.href}
              className="text-afca-muted hover:text-afca-blue transition-colors"
            >
              Members: {phoneNumbers.members.number}
            </a>
          </div>
          <div className="flex items-center gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant}
                external={action.external}
                size="sm"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 lg:px-6 py-3 sm:py-3.5">
        <Logo />

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-afca-cream text-afca-navy hover:bg-afca-sky/15 transition-colors"
            onClick={openSearch}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href={phoneNumbers.freeCall.href}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-afca-cream text-afca-blue hover:bg-afca-sky/15 transition-colors"
            aria-label={phoneNumbers.freeCall.label}
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-afca-cream text-afca-navy hover:bg-afca-sky/15 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-0.5 overflow-visible" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              isActive={activeMenu === item.label}
              onActivate={() => setActiveMenu(item.label)}
              onDeactivate={() => setActiveMenu(null)}
            />
          ))}
          <button
            type="button"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl text-afca-gray hover:bg-afca-cream hover:text-afca-navy transition-colors"
            aria-label="Search"
            onClick={openSearch}
          >
            <Search className="h-4 w-4" />
          </button>
        </nav>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {mobileOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-full z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain bg-white border-t border-afca-navy/8 shadow-xl">
          <div className="px-4 py-5">
            <div className="flex flex-col gap-2.5 pb-5 mb-5 border-b border-afca-navy/8">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  href={action.href}
                  variant={action.variant}
                  external={action.external}
                  size="md"
                  className="w-full"
                  onClick={closeMobile}
                >
                  {action.label}
                </Button>
              ))}
            </div>

            <div className="space-y-1 pb-5 mb-5 border-b border-afca-navy/8">
              <a
                href={phoneNumbers.freeCall.href}
                className="flex items-center gap-2.5 py-2.5 text-sm font-semibold text-afca-navy"
              >
                <Phone className="h-4 w-4 text-afca-blue shrink-0" />
                {phoneNumbers.freeCall.label}
              </a>
              <a href={phoneNumbers.members.href} className="block py-2 text-sm text-afca-muted pl-6">
                {phoneNumbers.members.label}
              </a>
            </div>

            {mainNavigation.map((item) => (
              <div key={item.label} className="border-b border-afca-navy/5 last:border-0">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className="flex-1 py-3.5 text-[15px] font-semibold text-afca-navy"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-afca-gray hover:bg-afca-cream"
                      onClick={() =>
                        setExpandedSection(expandedSection === item.label ? null : item.label)
                      }
                      aria-expanded={expandedSection === item.label}
                      aria-label={`${expandedSection === item.label ? "Collapse" : "Expand"} ${item.label} menu`}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          expandedSection === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                {item.children && expandedSection === item.label && (
                  <div className="pb-3 pl-1 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 text-sm text-afca-gray hover:bg-afca-cream hover:text-afca-navy"
                        onClick={closeMobile}
                        {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
