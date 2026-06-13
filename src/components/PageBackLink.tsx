import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FOCUS_RING } from "@/lib/a11y";
import { cn } from "@/lib/utils";

type PageBackLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function PageBackLink({ href, label, className }: PageBackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-afca-on-navy-muted hover:text-white transition-colors mb-4 max-w-full rounded-sm",
        FOCUS_RING,
        className
      )}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function getParentCrumb(breadcrumbs: { label: string; href: string }[]) {
  return breadcrumbs.length >= 3 ? breadcrumbs[breadcrumbs.length - 2] : null;
}
