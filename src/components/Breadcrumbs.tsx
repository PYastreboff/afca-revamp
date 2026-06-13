import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FOCUS_RING } from "@/lib/a11y";
import { cn } from "@/lib/utils";

type Breadcrumb = { label: string; href: string };

type BreadcrumbsProps = {
  items: Breadcrumb[];
  className?: string;
  linkClassName?: string;
  currentClassName?: string;
};

export function Breadcrumbs({
  items,
  className,
  linkClassName = "hover:text-white transition-colors",
  currentClassName = "text-white/90 font-medium",
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs sm:text-sm text-white/70">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />
              )}
              {isLast ? (
                <span className={currentClassName} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className={cn(FOCUS_RING, "rounded-sm", linkClassName)}>
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
