import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
        "inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors mb-4 max-w-full",
        className
      )}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function getParentCrumb(breadcrumbs: { label: string; href: string }[]) {
  return breadcrumbs.length >= 3 ? breadcrumbs[breadcrumbs.length - 2] : null;
}
